import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(req, res) {
    try {

        const password = req.body.password;
        const passwordHash = bcrypt.hashSync(password, 10);

        const user = new User(
            {
                email: req.body.email,
                FristName: req.body.FristName,
                lastName: req.body.lastName,
                //password: req.body.password,
                password: passwordHash,
            }
        );
        await user.save();
        res.json({ message: "User created successfully" });


    }catch (error) {
        console.error(error);
        return res.json({ message: "Internal server error" });
    }
}    

export async function loginUser(req, res){
     try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });

        if(user == null){
            return res.status(404).json({ message: "User not found" });
            return;
        }
        const isPasswordMatching = bcrypt.compareSync(password, user.password);

        if(isPasswordMatching){
            //res.json({ message: "Login successful" });
            
            const userInfo = {
                email: user.email,
                FristName: user.FristName,
                lastName: user.lastName,
                emailVerified: user.isEmailVerified,
                isAdmin: user.isAdmin,
                isBlocked: user.isBlocked
            };
            
            const token = jwt.sign(userInfo, "secret")

            res.json({token: token });
                
        }else{
            res.status(401).json({ message: "Invalid password" });
        }
        

     }catch (error) {
        console.error("Error occurred while logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
      }


}
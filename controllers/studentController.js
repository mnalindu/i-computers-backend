import Student from "../models/student.js"

//export function getAllStudents(req ,res){
//        Student.find().then(
//            (students) => {
//                    console.log(students);
//                    res.json(students);
//            }
//        );    
//    };

export async function getAllStudents(req, res) {
    try {
        const student = await Student.find()
        //res.json(student);
        res.json(
            {
                message: "Students fetched successfully"
            }
        );
    } catch (error) {
        console.error(error);
        return res.json({ message: "Internal server error" });    

    }
}

export function createStudent(req, res) {
        if(req.user == null){
            return res.status(401).json({ message: "you need to login first before creating a student" });

        }

        if(!req.user.isAdmin){
            res.status(403).json({ message: "You are not authorized to create students" });
            return;
        }
        
        const student = new Student(req.body);
    
        student.save().then(()=> {
        res.json(
                    {
                        message: "Student added successfully"
                    }
                );
        });  
    };


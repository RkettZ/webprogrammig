const users = require("../../models/mongo/users");
const bcrypt = require("bcryptjs");

// CRUD
// R-Read อ่านข้อมูล
exports.index = async (req, res, next) => {
    let data = await users.find();
    res.status(200).json(data);
 
};

//C-Create เพิ่มข้อมูล
exports.insert = async (req,res,next) => { 
    let data = new users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password

    });
    data.save();
    res.status(201).json({
        message:"บันทึกข้อมูลเรียบร้อยแล้ว"
    })


};
//update แก้ไขข้อมูล
exports.update = async (req, res , next) => {
    const id = "60ebbd3d72ef2178351e9a39";
    const data = {
        username: "Nostria",
        email: "ugjhgia@gmail.com"
    };
   
    let update = await users.updateOne(
{_id: id},
{
    username: data.username,
    email: data.email
}
    );
    
    if(update.nModified === 0){
        res.status(400).json({
            error: "ไม่สามารถแก้ไขข้อมูลได้"
        });
    } else {
        res.status(200).json({
            data: "แก้ไขข้อมูลเรียบร้อยแล้ว"
        });
    }    

};
// Delete ลบข้อมูล
exports.delete = async (req, res, next) => {
    const id = "60ebbd0572ef2178351e9a37"
    const data = await users.deleteOne(
        {_id: id }
    );
    if(data.deletedCount === 0){
        res.status(400).json({
            error:"ไม่สามารถลบข้อมูลได้"
        })
    }else{
        res.status(200).json({
            message:"ลบข้อมูลเรียบร้อยแล้ว"
        })
    }
};

// Login การตรวจสอบเข้าสู่ระบบ
exports.login = async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.username);
    // console.log(req.password);

    //select * from users where username = "kkk" and password = "123456789"
    //let data = await users.find({ $and: [ 
           // { username: req.body.username },
   //         { password: req.body.password } 
  //  ]});
        
        //select *from users where username = "??????"
        let data = await users.find({ username: req.body.username });
        if(data.length > 0){
            bcrypt
                .compare(req.body.password, data[0] .password)
                .then(async function (check){
                    if(check){
                        res.status(200).json({
                            username: data[0].username,
                            email: data[0].email,
                            token: "dsafghjocmmisiohoghikjpdg",
                            status: 1,
                            message: "เข้าสู่ระบบเรียบร้อย"
            });
                    } else {
                        res.status(200).json({
                            status: 0,
                            message: "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง"
                        })
                    }
                });
        } else {
            res.status(200).json({
                status: 0,
                message: "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง"
            })
        }

};

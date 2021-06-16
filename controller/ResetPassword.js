const User = require("../model/user");
const { hash } = require("bcryptjs");
module.exports = {
	resetPasswrod: async (req, res) => {
	
        if(req.body.newpassword === req.body.confirmpassword){
            const hashed_password= await hash(req.body.newpassword, 10)
            User.updateOne(

                { email:req.body.email },
                {
                    $set: { password: hashed_password },
                },
            ).then(()=>{
                res.json({message:"Password resetted succesfully"})
            })
        }else{
            res.json({message:"Password and confirm password does not match"})
        }

		
	},
};

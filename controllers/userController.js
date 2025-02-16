const userModel = require ('../model/userModel')
const fs = require ('fs')

exports.createUser= async(req,res)=>{
    try {
        const {fullName, email}= req.body
        const files = req.files.map((element)=>element.filename)
    
        const user = new userModel({
            fullName,
            email,
            familyPictures:files
        })
        
        await user.save();

        res.status(200).json({
            message: 'User created successfully',
            data: user
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'+ error.message 
        })
    }
};
exports.updateUser = async(req,res)=>{
    try {
        const {id} =req.params;
        const {fullName,email} =req.body
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({
                message: 'user not found'
            })
        }
        const data ={
            fullName,
            email,
            familyPictures: user.familyPictures
        }
        const oldFilePaths= user.familyPictures.map((e)=>{ return `./uploads/${e}`})
        if (req.files && req.files[0]){
            oldFilePaths.forEach((path)=>{
                if (fs.existsSync(path)){
                    fs.unlinkSync(path)
                    const files = req.files.map((e)=>e.filename)
                    data.familyPictures =files
                }
            })
        }
        const updated = await userModel.findByIdAndUpdate(id,data,{new:true})
        res.status(201).json({
            message: 'User updated successfully',
            data: updated
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'+ error.message
        })
    }
};

exports.getAllUsers = async (req,res)=>{
    try {
        const files = req.files
        const allUser = await userModel.find()
        res.status(200).json({
            message: 'all the users below',
            data: allUser
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'+ error.message
        })
    }
};

exports.getOneUser = async(req,res)=>{
    try {
        const {id} = req.params
        const oneUser = await userModel.findById(id)
        if (!oneUser) {
            return res.status(404).json({
                message: 'user not found',
                data: oneUser
            })
        }
        res.status(200).json({
            message: 'user found',
            data: oneUser
        })
        
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'+ error.message
        })
    }
};

exports.deleteUser = async(req,res)=>{
        try {
            const {id} =req.params;
            const user= await userModel.findById(id)
            if (!user){
                return res.status(404).json({
                    message: 'user not found'
                })
            }
            const deleted= await userModel.findByIdAndDelete(id)
            const oldFilePaths = user.familyPictures.map((e)=>{ return `./uploads/${e}`})

         if (deleted){
            oldFilePaths.forEach((path)=>{
                if (fs.existsSync(path)){
                    fs.unlinkSync
                    console.log('Deleted file:',path);
                }
            })
         }
         res.status(200).json({
            message: 'User deleted successfully',
            data: deleted
        })
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error'+ error.message
            })
        }
}

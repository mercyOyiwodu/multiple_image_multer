const { createUser, updateUser, getAllUsers, getOneUser, deleteUser } = require('../controllers/userController')

const router = require('express').Router()
const upload = require('../utils/multer')

router.post('/user',upload.array('familyPictures', 5),createUser)
router.patch('/user/:id',upload.array('familyPictures', 5),updateUser)
router.get('/user',upload.array('familyPictures', 5),getAllUsers)
router.get('/user/:id',upload.array('familyPictures', 5),getOneUser)
router.delete('/user/:id',upload.array('familyPictures', 5),deleteUser)


module.exports=router;
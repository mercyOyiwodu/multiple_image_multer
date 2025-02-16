const express = require ('express')
const UserRouter = require('./routes/userRouter')
require('dotenv').config()
const port = process.env.PORT

require('./config/database')
const app = express()

app.use(express.json())
app.use(UserRouter)

app.listen(port,()=>{
    console.log(`my server is up and running on port ${port}`);
    
})


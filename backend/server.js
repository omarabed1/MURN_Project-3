require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const tripRouter = require('./routes/trip')
const followRouter = require('./routes/follow')

const app = express()
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/user',userRouter)
app.use('/api/trip',tripRouter)
app.use('/api/follow',followRouter)

mongoose.connect(process.env.URI)
.then(() => {
    app.listen(process.env.PORT,console.log("we are listening on port "+process.env.PORT))
})
.catch(err => console.error(err))



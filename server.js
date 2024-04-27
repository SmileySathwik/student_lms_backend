const express = require('express')                                                                                              
const { adminRoutes } = require('./routes/adminroutes')
const cors = require('cors')
const { studentRoutes } = require('./routes/studentroutes')
const { default: mongoose } = require('mongoose')
const bodyParser = require('body-parser')
const { facultyRoutes } = require('./routes/facultyroutes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
const PORT = 8000 || 8001

dburl = "mongodb+srv://sathwikmamillapalli:sathwikmamillapalli@cluster0.x8sdecb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dburl).then((result) => {
    console.log("Connected to DataBase Successfully of",result.connection.host)
}).catch((err) => {
    
});



app.use('/api/v1/faculty',facultyRoutes)
app.use('/api/v1/admin',adminRoutes)
app.use('/api/v1/student',studentRoutes)

app.get('/api/health',(req,res)=>{
    res.status(200).json({
        status:"ok",
    })
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

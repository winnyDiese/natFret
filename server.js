


const express = require('express')
const app = express()

// .env
require('dotenv').config()


const route = require('./routes/route')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')

// Static
app.use(express.static(__dirname +'/public'))

app.use('/', route)
app.use((req,res)=>{
    res.status(404).send('Sorry this page is not exist')
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=> console.log(`Listening at port ${PORT}`))


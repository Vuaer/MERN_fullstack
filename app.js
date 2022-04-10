const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express();

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 4000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        app.listen(5000, () => console.log(`app has been started on port ${PORT}`))
    }catch(e){
        console.log('Serrver error', e.message)
        process.exit(1)
    }
}

start()


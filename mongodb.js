const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gdsc')
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log("failed")
})

const gdscSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
    },
    password:{
        type:String,
        required :true,
    }
})

const gdscuser = new mongoose.Schema({
    name:{
        type:String,
        required :true,
    },
    role:{
        type:String,
        required :true,
    },
    email:{
        type:String,
        required :true,
    },
    phone_num:{
        type:Number,
        required :true,
    }
})

const collection1 = new mongoose.model('collection1',gdscSchema)
const collection2 = new mongoose.model('collection2',gdscuser)


module.exports = {
    collection1,
    collection2
  };
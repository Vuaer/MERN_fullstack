const {Schema,model,Types} = require('mongoos')

const schema = new Schema({
    email: {type: String, required:true, unique:true},
    password:{type: String, required:true},
    links:[{type:Types.ObjectId, ref:'Link'}] //Link
})
model.exports =model('User', schema)
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientsSchema = new Schema({
firstName:{type:String,required:true},
lastName: {type:String,required: true},
email: {type:String,required: true},
number: {type:String,required:false},
user: {type:String,required:true},
userId: {type:Number,required:true},
clientFullName: {type: String,required:true}
}, {
    timestamps: true,
});

const Clients = mongoose.model("Clients", clientsSchema)

module.exports = Clients;
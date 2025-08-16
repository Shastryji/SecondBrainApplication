import mongoose, { mongo } from "mongoose"
import dotenv from "dotenv"
dotenv.config()

if (!process.env.MONGO_URL) {
	throw new Error("MONGO_URL environment variable is not defined.");
}
mongoose.connect(process.env.MONGO_URL)


const userSchema = new mongoose.Schema({
    username: {
        type : String,
        require : true,
        unique : true,
        min : 3
    },
    password: {
        type : String,
        require: true,
        min : 6,
        max: 12
    }
})

const contentSchema = new mongoose.Schema({
    link: {
        type: String,
        require: true,
    },
    type: {
        type : String,
        enum : {
            values: ['image', 'video', 'article', 'audio'],
            message : '{VALUE} is not supported'
        },
        require :true
    },
    title : {
        type: String,
        require: true
    },
    tags : [{type: mongoose.Schema.Types.ObjectId, ref: "Tag"}],
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User", require : true} 
})

const tagSchema = new mongoose.Schema({
    title : {
        type:String,
        require: true,
        unique : true
    }
})

const linkSchema = new mongoose.Schema({
    hash : {
        type: String,
        require: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref : "User", 
        require: true
    }
})

const Tag = mongoose.model('Tag', tagSchema)
const User = mongoose.model('User',userSchema)
const Content = mongoose.model('Content', contentSchema)
const Link = mongoose.model('Link', linkSchema)

const content = await Content.find().populate({
    path: "userId",
    select: "username password"
})



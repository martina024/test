const express=require("express")
const { PostsModel } = require("../model/posts.model")


const postsRouter=express.Router()

postsRouter.get("/",async(req,res)=>{
//   console.log("ans",req.body.userID)
const userID = req.body.userID

    try{
        
        const posts=await PostsModel.find({userID})
        res.send(posts)
    }
    catch(err){
        console.log(err)
        console.log({"message":"Something went wrong"})
    }
})


postsRouter.post("/create",async(req,res)=>{
    console.log(req.body)
    const payload=req.body
    try{
        const new_post=new PostsModel(payload)
        await new_post.save()
        res.send({"message":"Created the post",payload})

    }catch(err){
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
    
})


postsRouter.patch("/update/:id",async(req,res)=>{
    const ID=req.params.id
    const payload=req.body
   
    const post=await PostsModel.findOne({"_id":ID})
   

    try{
    
       
       
            await PostsModel.findByIdAndUpdate({_id:ID},payload)
            res.send({"mesg":"Updated the post"})
        
       
 
    }catch(err){
        console.log(err)
        console.log({"message":"Something went wrong"})
    }
   
})



postsRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id
    const post=await PostsModel.findOne({"_id":ID})
   
    try{
    
      
            await PostsModel.findByIdAndDelete({_id:ID})
            res.send(`Deleted the post`)
        
        
       
 
    }catch(err){
        console.log(err)
        console.log({"message":"Something went wrong"})
    }
    
   
})


module.exports={postsRouter}
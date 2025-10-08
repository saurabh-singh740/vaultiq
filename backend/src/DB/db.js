const mongoose=require("mongoose")

function connectedtodb(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("connected to db");
       
        
    }).catch((err)=>{
        console.log(err);
        

    })
}

module.exports=connectedtodb;
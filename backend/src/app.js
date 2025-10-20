const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const promptRoutes = require('./routes/prompt.routes');
const communityRoutes=require('./routes/communityRoutes')
const exportRoutes=require('./routes/export.routes')
const aiRoutes=require("./routes/ai.routes")
const cors=require("cors")
const app = express();
const path=require('path')

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname,'../public')))

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/ai',aiRoutes);


app.get("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

module.exports = app;

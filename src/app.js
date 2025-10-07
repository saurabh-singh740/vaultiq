const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const promptRoutes = require('./routes/prompt.routes');
const communityRoutes=require('./routes/communityRoutes')
const exportRoutes=require('./routes/export.routes')
const aiRoutes=require("./routes/ai.routes")


const app = express();
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/ai',aiRoutes);

module.exports = app;

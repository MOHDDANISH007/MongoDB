import express from 'express';
import connectDB from './config/db.js'
import userRoutes from './routes/user.routes.js'


const app = express();
app.use(express.json())
connectDB();
app.use("/api/", userRoutes);


const PORT = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})
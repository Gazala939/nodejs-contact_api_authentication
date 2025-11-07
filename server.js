import express from 'express';
import mongoose from'mongoose';
import { config } from 'dotenv';
import bodyParser from 'express';
import userRouter from './Routes/user.js'
import contactRouter from './Routes/contact.js'

const app = express();
config({ path: '.env'});

app.use(bodyParser.json());

const url = 'mongodb://localhost:27017/';
mongoose.connect(url,{
    dbName:'Practice-FullStack',
})
.then(()=> console.log('MongoDB Connected.......'))
.catch((err) => console.log('Error :',err));

//register contact route
app.use('/api/user', userRouter)

//register contact route
app.use('/api/contact', contactRouter)

const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on port ${port}`));
 
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './src/routes/route';
import cors from 'cors';

const PORT = 3300;
const app = express();

app.set('views', './src/views/');
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use('', router);
app.use(express.static('./public/'));

// const DB_URL = "mongodb://localhost:27017/Product4_Management";
const DB_URL = "mongodb+srv://ProjectMD4:Jenj76EHqz8gfRnM@cluster0.pebdgeg.mongodb.net/CaseStudy-MD4?retryWrites=true&w=majority"

mongoose.connect(DB_URL)
.then(() => {console.log('DB Connected')})
.catch((err) => {console.log(err.message);
});


app.listen(PORT, () => {console.log(`App is running on http://localhost:${PORT}`)});
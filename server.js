import express from 'express';
import { config } from 'dotenv'

const app = express();
config({ path: '.env'});

const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on port ${port}`));

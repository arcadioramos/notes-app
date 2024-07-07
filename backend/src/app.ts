import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import notesRoutes from './routes/notesRoutes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', notesRoutes);

const PORT =  3010 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

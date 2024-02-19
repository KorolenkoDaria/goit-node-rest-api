import express from 'express';
import contactsRouter from './routes/contactsRouter.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/api', contactsRouter);
app.use((err, req, res, next) => {
    const {status = 500, message = "Server error"} = err;
    res.status(status).json({ message, })
  })

app.listen(8080, () => {
    console.log('Server has been started on port 8080...');
})
export default app;
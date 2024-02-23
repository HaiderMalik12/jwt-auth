import express from 'express';
import morgan from 'morgan';
import errorhandler from 'error-handler';
import router from './router';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler());
}

export default app;
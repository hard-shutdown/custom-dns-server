import express from 'express';

import router from './router.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.raw({ type: 'application/dns-message' }));

app.use(router)

app.listen(3000, () => {
    console.log('Server started on port 3000');
})
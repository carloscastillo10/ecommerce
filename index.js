const express = require('express');
const cors = require('cors'); // Para gestionar a quien se le da acceso a la aplicacion
const routerApi = require('./routes');
const { checkIpiKey } = require('./middlewares/auth.handler');
const {
    logErrors,
    errorHandler,
    boomErrorHandler,
    ormErrorHandler,
} = require('././middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3000;

// Middelware
app.use(express.json());

const whitelist = ['http://127.0.0.1:5500', 'https://myapp.com'];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        }
    },
};
app.use(cors(options)); // Resolver problemas

app.get('/', (req, res) => {
    res.send('Hello my server in express');
});

app.get('/new-route', checkIpiKey, (req, res) => {
    res.send("Hello, i'm new route");
});

routerApi(app);

// Los middlewares de tipo error se deben utilizar despues de definir el router
// Se ejecutan en el orden que se los coloque
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('My port ' + port);
});

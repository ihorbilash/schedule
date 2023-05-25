import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path from 'path'
import { engine, } from 'express-handlebars'
import { restRouter } from './api/routers';
import { myDataSource } from './config/app-data-source'


dotenv.config({ path: '.env' });

//seem like connect to db
myDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
})
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();

app.use(bodyParser.json())
app.engine('hbs', engine({
    defaultLayout: false,
    extname: "hbs"
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));

app.get("/", function (_, res) {
    res.redirect('/api/create-schedule/all')
});

app.use('/api', restRouter)


app.listen(process.env.LOCAL_PORT, () => {
    console.log(`Server has been started on port=${process.env.LOCAL_PORT}..`);
})

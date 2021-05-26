import {App} from './app';
import * as bodyParser from 'body-parser'
import {loggerMiddleWare} from './middlewares/loggerMiddleware'
import {HomeController,UserControoler} from './controllers/index'
const app =new App({
    port:5000,
    controllers:[
        new HomeController(),
        new UserControoler(),
    ],
    middleWares:[
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleWare
    ]
})
app.listen()


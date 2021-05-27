import {App} from './app';
import * as bodyParser from 'body-parser'
import {loggerMiddleWare} from './middlewares/loggerMiddleware'
import {HomeController,UserController} from './controllers/index'
export const app =new App({
    port:5000,
    controllers:[
        new HomeController(),
        new UserController(),
    ],
    middleWares:[
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleWare
    ]
})
app.listen()



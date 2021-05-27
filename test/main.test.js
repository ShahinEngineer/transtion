const request = require('supertest')
import {App} from '../src/app';
import * as bodyParser from 'body-parser'
import {loggerMiddleWare} from '../src/middlewares/loggerMiddleware'
import {HomeController,UserController} from '../src/controllers/index'

describe('Server test',()=>{
    let app;
    let homeController;
    let userController;
    let findUserMocking;
    let findUserByEmail;
    let allTransaction;
    let addTransaction;
    let addUser;
    beforeAll(async () => {
         homeController=new HomeController();
         userController=new UserController();
         app =new App({
            port:5000,
            controllers:[homeController,userController],
            middleWares:[
                bodyParser.json(),
                bodyParser.urlencoded({ extended: true }),
                loggerMiddleWare
            ] 
    })
        findUserByEmail = jest.spyOn(homeController.userDataManager,'findByEmail');
        findUserMocking = jest.spyOn(homeController.userDataManager,'findUser');
        addTransaction = jest.spyOn(homeController.dataManager,'addTransaction');
        allTransaction = jest.spyOn(homeController.dataManager,'getAllTransactionByUserId');
        addUser = jest.spyOn(userController.userDataManager,'addUser');
      });

    it('it shloud run POST(/transcation) and return validation error missing data',async()=>{
        const obj ={"currency":"EUR","value":40}
        const res = await request(app.app).post('/transcations').send({currency:2})
        expect(res.status).toBe(400)
    })

    it('it shloud run POST(/transcation) and add success transaction',async()=>{
        const obj ={"currency":"EUR","value":40,"countryCode":"FR","userId":"60ae36d942b6014a0800cda8"}
        findUserMocking.mockImplementation(async()=>{})
        addTransaction.mockImplementation(async()=>{})
        const res = await request(app.app).post('/transcations').send(obj)
        expect(res.status).toBe(200)
    })
    it('it shloud run POST(/transcation) and user not found',async()=>{
        const obj ={"currency":"EUR","value":40,"countryCode":"FR","userId":"60ae36d942b6014a0800cda8ss"}
        findUserMocking.mockImplementation(() => {throw new Error()});
        addTransaction.mockImplementation(async()=>{})
        const res = await request(app.app).post('/transcations').send(obj)
        expect(res.status).toBe(402)
    })
    it('it shloud run Get(/transcation) and should throw error user not found',async()=>{
        findUserByEmail.mockImplementation(() => {throw new Error()});
        const res = await request(app.app).get('/transcations').query({email:"moabo.shahin@gmail.com"})
        expect(res.status).toBe(402)
    })

    it('it shloud run post(/users) and return validation error ',async()=>{
        const userObject ={ "firstName":"mohammad","lastName":"shahin"}
        addUser.mockImplementation(() =>{});
        const res = await request(app.app).post('/users').send(userObject)
        expect(res.status).toBe(400)
    })

    it('it shloud run post(/users) and create a new user',async()=>{
        const userObject ={ "email":"moabo.shaheen@gmail.com","firstName":"mohammad","lastName":"shahin"}
        addUser.mockImplementation(() =>{});
        const res = await request(app.app).post('/users').send(userObject)
        expect(res.status).toBe(200)
    })
})

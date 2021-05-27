import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser"
import morgan from "morgan";
//intializtion

export class App{
  public app: Application;
  public port: number;

  constructor(appInit:{port:number,middleWares:any,controllers:any}){
    this.app=express();
    this.port=appInit.port;
    
    this.middlewares(appInit.middleWares)
    this.routes(appInit.controllers)
  }
  public getServer(){
    return this.app;
  }
  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }){
    middleWares.forEach(middleWares=>{
      this.app.use(middleWares)
    })
  }
  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
        this.app.use('/', controller.router)
    })
}
public listen() {
  this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`)
  })
}

}


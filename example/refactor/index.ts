import { Get, Post, Delete, useExpressServer } from  '../../src/';
import { Controller, Use } from '../../src/';
import express from 'express';
import { Module } from '../../src';

const authMid = (req:any, res:any, next:any) => {};
const userMid = (req:any, res:any, next:any) => {};
const roleMid = (req:any, res:any, next:any) => {};

@Use(authMid, userMid)
@Controller('/users')
class MyController{

    @Use(roleMid)
    @Post('/hey')
    fun1(){}

    @Get('/')
    fun2(){}

    @Delete('/del')
    fun3(){}
}

@Controller()
class YourController{

    @Use(roleMid)
    @Get()
    fun1(){}

    @Get('/')
    fun2(){}
}

@Module({
    controllers: [MyController],
    providers: []
})
class MyModule { }

console.log('Hey');

useExpressServer(express(), [MyModule]);



// console.log("middlewares");
// console.log(getMetadataArgsStore().middlewares);

// console.log("routes");
// console.log(getMetadataArgsStore().routes);
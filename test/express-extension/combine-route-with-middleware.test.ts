import { Get, Post, Delete, useExpressServer, Controller, Use, Module, RouteMetadataArgs, MiddlewareMetadataArgs } from '../../src/';
import express from 'express';
import { combineRouteWithMiddleware } from '../../src/express-extension/combine-route-with-middleware';
import { getMetadataArgsStore } from '../../src/decorators/metadata';
import { deepEqual } from '../helper';

const authMid = (req: any, res: any, next: any) => { };
const userMid = (req: any, res: any, next: any) => { };
const roleMid = (req: any, res: any, next: any) => { };

class MyController {}
class OtherController {}

test('Test method get & 1 method', () => {
    const app = express();

    const routes: RouteMetadataArgs[] = [
        { target: MyController, path: '/users', methodName: '' },
        { target: MyController, path: '/hey', methodName: 'func1', requestMethod: 'get' },
    ];

    const middlewares: MiddlewareMetadataArgs[] = [];

    const expected = [
        {
            target: MyController,
            path: '/users',
            methodName: '',
            isClass: true,
            middlewares: []
        },
        {
            target: MyController,
            path: '/hey',
            methodName: 'func1',
            requestMethod: 'get',
            isClass: false,
            middlewares: []
        }
    ];

    const result = combineRouteWithMiddleware(MyController, routes, middlewares);
    expect(deepEqual(result, expected)).toBe(true);
});


test('Test method post & 1 method', () => {
    const app = express();

    const routes: RouteMetadataArgs[] = [
        { target: MyController, path: '/users', methodName: '' },
        { target: MyController, path: '/hey', methodName: 'func1', requestMethod: 'post' },
    ];

    const middlewares: MiddlewareMetadataArgs[] = [];

    const expected = [
        {
            target: MyController,
            path: '/users',
            methodName: '',
            isClass: true,
            middlewares: []
        },
        {
            target: MyController,
            path: '/hey',
            methodName: 'func1',
            requestMethod: 'post',
            isClass: false,
            middlewares: []
        }
    ];

    const result = combineRouteWithMiddleware(MyController, routes, middlewares);
    expect(deepEqual(result, expected)).toBe(true);
});

test('Test middleware at method', () => {
    const app = express();

    const routes: RouteMetadataArgs[] = [
        { target: MyController, path: '/users', methodName: '' },
        { target: MyController, path: '/hey', methodName: 'func1', requestMethod: 'post' },
    ];

    const middlewares: MiddlewareMetadataArgs[] = [
        { target: MyController, methodName: 'func1', middleware: authMid}
    ];

    const expected = [
        {
            target: MyController,
            path: '/users',
            methodName: '',
            isClass: true,
            middlewares: []
        },
        {
            target: MyController,
            path: '/hey',
            methodName: 'func1',
            requestMethod: 'post',
            isClass: false,
            middlewares: [authMid]
        }
    ];

    const result = combineRouteWithMiddleware(MyController, routes, middlewares);
    expect(deepEqual(result, expected)).toBe(true);
});


test('Test middleware at class, it should be applied all methods', () => {
    const app = express();

    const routes: RouteMetadataArgs[] = [
        { target: MyController, path: '/users', methodName: '' },
        { target: MyController, path: '/hey', methodName: 'func1', requestMethod: 'post' },
    ];

    const middlewares: MiddlewareMetadataArgs[] = [
        { target: MyController, methodName: '', middleware: roleMid},
        { target: MyController, methodName: 'func1', middleware: userMid}
    ];

    const expected = [
        {
            target: MyController,
            path: '/users',
            methodName: '',
            isClass: true,
            middlewares: [roleMid]
        },
        {
            target: MyController,
            path: '/hey',
            methodName: 'func1',
            requestMethod: 'post',
            isClass: false,
            middlewares: [roleMid, userMid]
        }
    ];

    const result = combineRouteWithMiddleware(MyController, routes, middlewares);
    expect(deepEqual(result, expected)).toBe(true);
});

//  Test case with multiple controller 

test('Test method get & 1 method (multiple controllers)', () => {
    const app = express();

    const routes: RouteMetadataArgs[] = [
        { target: MyController, path: '/users', methodName: '' },
        { target: MyController, path: '/hey', methodName: 'func1', requestMethod: 'get' },
        { target: OtherController, path: '/other', methodName: '' },
        { target: OtherController, path: '/', methodName: 'hey' },
    ];

    const middlewares: MiddlewareMetadataArgs[] = [];

    const expected = [
        {
            target: MyController,
            path: '/users',
            methodName: '',
            isClass: true,
            middlewares: []
        },
        {
            target: MyController,
            path: '/hey',
            methodName: 'func1',
            requestMethod: 'get',
            isClass: false,
            middlewares: []
        }
    ];

    const result = combineRouteWithMiddleware(MyController, routes, middlewares);
    expect(deepEqual(result, expected)).toBe(true);
});
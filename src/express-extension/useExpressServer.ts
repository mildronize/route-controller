import express, { Request, Response, NextFunction } from 'express';
import { RouteDecorator } from '../decorators/decorator.interface';
import { IModule } from '..';

import { asyncHelper, injectDependencies, createProviders } from './utils';

export function useExpressServer(app: express.Application, modules: any[]) {
  modules.forEach((_module) => {
    const module = Reflect.getMetadata('module', _module);
    console.log('addExpressControllerWithProviders');
    addExpressControllerWithProviders(app, module);
  });

  return true;
}

function addExpressControllerWithProviders(app: express.Application, module: IModule) {

  const controllers = module.controllers;
  const providerInstances = createProviders(module.providers);

  controllers.forEach((controller) => {

    const instance = injectDependencies(controller, providerInstances);
    // console.log(instance.constructor);

    const prefix = Reflect.getMetadata('prefix', controller);
    const routes: RouteDecorator[] = Reflect.getMetadata('routes', controller);

    const callInstance = (route: RouteDecorator) =>
      asyncHelper(async (req: Request, res: Response, next: NextFunction) => {
        await instance[route.methodName](req, res, next);
      });

    routes.forEach((route: RouteDecorator) => {
      if (route.hasOwnProperty('middleware') && route.middleware !== undefined) {
        // Call the middleware
        app[route.requestMethod](prefix + route.path, route.middleware, callInstance(route));
      } else {
        app[route.requestMethod](prefix + route.path, callInstance(route));
      }
     
    });

  });


}
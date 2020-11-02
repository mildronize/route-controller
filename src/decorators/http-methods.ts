import { RouteMetadata } from './interfaces/route-metadata.interface';
import { getMetadataArgsStore } from './middleware';

export const Get = (path?: string): Function => httpMethodDecorator('get', path);
export const Post = (path?: string): Function => httpMethodDecorator('post', path);
export const Put = (path?: string): Function => httpMethodDecorator('put', path);
export const Delete = (path?: string): Function => httpMethodDecorator('delete', path);

export function httpMethodDecorator(requestMethod: RouteMetadata['requestMethod'], path?: string): Function {
  return (objectOrFunction: Object | Function, methodName?: string) => {
    getMetadataArgsStore().routes.push({
      target: methodName ? objectOrFunction.constructor : (objectOrFunction as Function),
      path: path ? path : '',
      methodName: methodName || '',
      requestMethod,
    });
  };
}

// export function GetNew(prefix?: string): Function {
//   return function (objectOrFunction: Object | Function, methodName?: string) {
//     getMetadataArgsStore().routes.push({
//       target: methodName ? objectOrFunction.constructor : (objectOrFunction as Function),
//       path: prefix ? prefix : '',
//       methodName: methodName || '',
//       requestMethod: 'get',
//     });
//   };
// }

// export function httpMethodDecorator(
//   requestMethod: RouteMetadata['requestMethod'],
//   data: HttpMethodDecorator,
// ): MethodDecorator {
//   // `target` equals our class, `propertyKey` equals our decorated method name
//   return (target, propertyKey: string): void => {
//     // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
//     // To prevent any further validation simply set it to an empty array here.
//     if (!Reflect.hasMetadata('routes', target.constructor)) {
//       Reflect.defineMetadata('routes', [], target.constructor);
//     }

//     // Get the routes stored so far, extend it by the new route and re-set the metadata.
//     let routes = Reflect.getMetadata('routes', target.constructor) as RouteMetadata[];

//     let isExisted = false;
//     routes.forEach((route: any) => {
//       if (route.methodName === propertyKey) isExisted = true;
//     });

//     // If the route is not exist, add it the new route
//     if (!isExisted) {
//       routes.push({
//         requestMethod,
//         path: data.path || '',
//         methodName: propertyKey,
//         middlewares: [],
//       });
//     }

//     // If the route is exist,
//     routes = routes.map((route: any) => {
//       // add middleware on existing method name in `routes`
//       if (route.methodName === propertyKey)
//         return {
//           requestMethod,
//           path: data.path || '',
//           methodName: route.methodName,
//           middlewares: route.middlewares,
//         };
//       return route;
//     });

//     // console.log(routes);

//     Reflect.defineMetadata('routes', routes, target.constructor);
//   };
// }

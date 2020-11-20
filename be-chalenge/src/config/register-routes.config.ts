import { Application } from "express";
import { RouteDefinition } from "../interfaces/route-definition.interface";
import { Request, Response } from 'express';

export class RegisterRoutes {

    static bootstrapRoutes(routes: any[], app: Application) {
        routes.forEach((Controller: any) => {

            const instance = new Controller();

            const prefix = Reflect.getMetadata('prefix', Controller);

            const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', Controller);

            routes.forEach(route => {
                app[route.requestMethod](prefix + route.path, (req: Request, res: Response) => {
                    return instance[route.methodName](req, res);
                });

            });
        });
    }
}
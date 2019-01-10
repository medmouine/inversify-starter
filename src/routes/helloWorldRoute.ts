import 'reflect-metadata';
import {
    controller,
    httpGet,
} from 'inversify-express-utils';

const BASE_ROUTE_URL: string = '';

@controller(BASE_ROUTE_URL)
export class HelloWorldRoute {
  @httpGet('/helloworld')
    public async getHelloWorld(): Promise<string> {
    return 'Hello World !';
  }
}

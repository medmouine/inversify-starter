/* tslint:disable:no-unused-expression */

import {HelloWorldRoute} from "@/routes/helloWorldRoute";
import 'reflect-metadata';

describe('Hello world route test', () => {

  const helloWorldRoute: HelloWorldRoute = new HelloWorldRoute();

    it('It should return Hello World !', async () => {
      const res:String = await helloWorldRoute.getHelloWorld();
      expect(res).toBe('Hello World !')
    });
  },
);

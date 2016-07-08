/** @plopInject[export] -- DO NOT REMOVE THIS COMMENT! */

import { GlobalConfig } from '../index.config';
/** @plopInject[import] -- DO NOT REMOVE THIS COMMENT! */

export class BcComponentLibrary {
  public static bootstrap() {
    const app = angular.module(GlobalConfig.moduleName); // tslint:disable-line

/** @plopInject[body] -- DO NOT REMOVE THIS COMMENT! */
  }
}

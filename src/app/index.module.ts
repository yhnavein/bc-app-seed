import { basicConfig, GlobalConfig } from './index.config';
import { routerConfig } from './index.route';
import { BcComponentLibrary } from './components';

/** @plopInject[import] -- DO NOT REMOVE THIS COMMENT! */

declare const moment: moment.MomentStatic;

module app {
  'use strict';

  angular.module('templates', []);

  angular.module(GlobalConfig.moduleName, GlobalConfig.dependencies)
    .constant('moment', moment)
    .config(basicConfig)
    .config(routerConfig)
    .run(runBlock);

  BcComponentLibrary.bootstrap();

/** @plopInject[body] -- DO NOT REMOVE THIS COMMENT! */
}


/** @ngInject */
export function runBlock($log: angular.ILogService) {
  $log.debug('runBlock end');
}

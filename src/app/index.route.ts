/** @plopInject[import] -- DO NOT REMOVE THIS COMMENT! */

/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
/** @plopInject[body] -- DO NOT REMOVE THIS COMMENT! */

  $urlRouterProvider.otherwise('/');
}

/** @ngInject */
export function basicConfig($logProvider: angular.ILogProvider, toastrConfig: any) {
  // enable log
  $logProvider.debugEnabled(true);
  // set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
}

export class GlobalConfig {
  public static moduleName: string = 'appName';
  public static dependencies: Array<string> = [
    'templates', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'pascalprecht.translate'
  ];


  public static jasmineDeps() {
    return this.dependencies
      .concat([ this.moduleName ])
      .map(d => beforeEach(angular.mock.module(d)));
  }
}
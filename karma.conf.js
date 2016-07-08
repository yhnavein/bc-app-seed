'use strict';

var useref = require('useref');
var fs = require('fs');
var path = require('path');

const reportersConfig = {
  'ci': ['progress'],
  'default': ['nyan', 'karma-remap-istanbul', 'coverage']
};

module.exports = function(config) {
  const singleRun = config.singleRun;
  const ci = config.ci || false;
  const baywatchMode = config.baywatch || false;

  const reporterMode = ci ? 'ci' : 'default';

  var jsFiles = getAssets("index.html");
  jsFiles.push('./node_modules/angular-mocks/angular-mocks.js');
  jsFiles.push('./.tmp/serve/app/index.module.js');
  //jsFiles.push('src/app/index.config.ts'); //because we want to have access to the Global Config
  jsFiles.push('src/**/*.spec.ts');

  var configuration = {
    files: jsFiles,
    exclude: [],

    port: 9876,
    colors: true,
    singleRun: singleRun,
    autoWatch: !singleRun,

    basePath: '',

    logLevel: (baywatchMode ? config.LOG_DEBUG : config.LOG_WARN),

    frameworks: ['jasmine'],

    browsers : ['PhantomJS', 'Chrome'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-remap-istanbul',
      'karma-coverage',
      'karma-jasmine',
      'karma-typescript-preprocessor',
      'karma-nyan-reporter'
    ],

    coverageReporter: {
      includeAllSources: true,
      dir: '.tmp',
      type: 'json',
      subdir: 'coverage',
      file: 'report.json'
    },

    remapIstanbulReporter: {
      src: '.tmp/coverage/report.json',
      reports: {
        lcovonly: '.tmp/coverage/lcov.info',
        html: '.tmp/coverage/html',
        text: undefined
      },
      timeoutNotCreated: 5000, // default value
      timeoutNoMoreFiles: 1000 // default value
    },

    reporters: reportersConfig[reporterMode],

    preprocessors: {
      '**/*.ts': ['typescript'],
      '.tmp/serve/app/*.js': ['coverage']
    },

    typescriptPreprocessor: {
      options: {
        sourceMap: true, // (optional) Generates corresponding .map file.
        target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
        module: 'commonjs', // (optional) Specify module code generation: 'commonjs' or 'amd'
        noResolve: true, // (optional) Skip resolution and preprocessing.
        removeComments: true, // (optional) Do not emit comments to output.
        concatenateOutput: false // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.ts$/, '.js');
      }
    }
  };

  config.set(configuration);
};


function getAssets(index) {
  const indexPath = path.resolve(__dirname + '/src/', index);
  const data = fs.readFileSync(indexPath, {encoding: 'utf8'});
  const result = useref(data);
  const files = result[1].js;

  const assets = files[Object.keys(files)[0]].assets;

  return assets.map(el => el.replace(/^\.\.\//, './'));
}

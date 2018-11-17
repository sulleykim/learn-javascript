# Karma + webpack + TypeScript

## 개발 환경

```
node -v
v8.11.4
```

## 설치

```
npm init -y
npm install --save-dev @types/jasmine jasmine-core karma karma-chrome-launcher karma-cli karma-jasmine karma-mocha-reporter karma-webpack ts-loader typescript webpack webpack-cli
```

## 설정

```
tsc --init
karma init
```

오류가 발생한다면 **전역 설치**

```
npm install -g typescript
npm install -g karam
tsc --init
karma init
```

```
Which testing framework do you want to use ?
> jasmine

Do you want to use Require.js ?
> no

Do you want to capture any browsers automatically ?
> Chrome
>

What is the location of your source and test files ?
> ./test.js
>

Should any of the files included by the previous patterns be excluded ?
>

Do you want Karma to watch all the files and run the tests on change ?
> yes
```

## Karma 설정

```javascript
// Karma configuration
// Generated on Sat Nov 17 2018 22:28:04 GMT+0900 (대한민국 표준시)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './test.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './test.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.ts', '.js']
      },
      module: {
        rules: [
          {test: /\.ts$/, use: [{loader: 'ts-loader'}]}
        ]
      }
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
```

## 테스트 진입점

```javascript
// test.js
const testsContext = require.context('./src', true, /\.spec\.ts$/)
testsContext.keys().forEach(testsContext)
```

## 테스트 코드

```javascript
// /src/example.spec.ts
it('should...', () => {
  expect(1).toBe(2)
})
```

## Script 설정

```json
{
  "name": "example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start:test": "karma start" // 설정
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/jasmine": "^3.0.0",
    "jasmine-core": "^3.3.0",
    "karma": "^3.1.1",
    "karma-chrome-launcher": "^2.2.0",
    "karma-cli": "^1.0.1",
    "karma-jasmine": "^2.0.1",
    "karma-mocha-reporter": "^2.2.5",
    "karma-webpack": "^3.0.5",
    "ts-loader": "^5.3.0",
    "typescript": "^3.1.6",
    "webpack": "^4.25.1",
    "webpack-cli": "^3.1.2"
  }
}
```

## Karma 테스트 개발 환경 시작하기

```
npm run start:test
```
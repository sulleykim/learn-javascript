# Webpack

**자바스크립트에서 모듈 시스템을 사용하기 위한 개념이다.** 자바스크립트는 공식적인 모듈 시스템을 제공하지 않고 있다. **Webpack**은 모듈 번들러로서 모듈 시스템과 동시에 여러가지 기능을 제공한다. (코드 압축, 코드 난독화등) 웹의 모든 자원의 의존관계를 통하여 하나의 자원으로 번들링해준다. 

## Webpack이란?

- 서로 연관 관계가 있는 웹 자원들을 js, css, img와 같은 스태틱한 자원으로 변환해주는 모듈 번들러
- 아래 사진은 직관적으로 webpack의 역할을 설명

![webpack 소개](https://user-images.githubusercontent.com/27342882/47601522-254c7d80-da0d-11e8-8301-97e8a16a4ef2.jpg)

## Webpack을 사용하는 이유 & 배경

1. 새로운 형태의 Web Task Manager
    - 기존 Web Task Manager (Gulp, Grunt) 의 기능 + 모듈 의존성 관리
    - 예) minification 을 webpack default cli로 실행 가능
    ```
    webpack -p
    ```

2. 자바스크립트 Code based Modules 관리
    - 자바스크립트 모듈화의 필요성
    - 기존 모듈 로더들과의 차이점 : 모듈 간의 관계를 청크(chunk) 단위로 나눠 필요할 때 로딩
    - 자바스크립트 코드가 많아지고 복잡해졌다
    - 복잡한 웹 앱을 관리하기 위해 모듈 단위로 관리하는 도구 등장
    - 가독성이나 다수 모듈 비병행 처리등의 약점을 보완하기 위해 Webpack이 등장

    자바스크립트 모듈화 문제란?

    아래 `script` 태그로 자바스크립트 모듈화를 시도하는 예제
    ```html
    <script src="module1.js"></script>
    <script src="module2.js"></script>
    <script src="module3.js"></script>
    ```

    파일 단위의 스코프가 아니기 때문에, 전역 변수 선언시 변수 충돌의 문제가 생긴다. 네트워크 지연에 따른 문제 발생

## Webpack 철학

1. Everything is Module

모든 웹 자원(js, html, css)이 모듈 형태로 로딩 가능

```javascript
require('base.css');
require('main.js');
```

2. 초기에 불필요한 것들을 모두 로딩하지 않고, 필요할 때 필요한 것만 로딩하여 사용

## Webpack 시작하기

### Webpack 사용하지 않으면

```html
<!-- index.html -->
<html>
  <head>
    <title>webpack 2 demo</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="app/index.js"></script>
  </body>
</html>
```

```javascript
// index.js
function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

네트워크(Network) 탭을 살펴보면 CDN을 통하여 `lodash`와 `index.js`를 각 각 요청하는 것을 확인할 수 있다.

### Webpack을 사용하면?

```html
<!-- index.html -->
<html>
  <head>
    <title>webpack 2 demo</title>
  </head>
  <body>
    <script src="dist/main.js"></script>
  </body>
</html>
```

```javascript
// index.js
import _ from 'lodash';

function component () {
    var element = document.createElement('div');
  
    /* lodash is required for the next line to work */
    element.innerHTML = _.join(['Hello','webpack'], ' ');
  
    return element;
}

document.body.appendChild(component());
```

`lodash`와 `index.js`가 번들링되어서 하나의 파일이 되어서 네트워크 요청을 한번만 한다.

## Webpack Entry

- webpack으로 묶은 라이브러리들을 로딩할 시작점 설정
- a,b,c 라이브러리를 모두 번들링한 bundle.js를 로딩한다.
- 1개 또는 2개 이상의 엔트리 포인트를 설정가능하다.

```javascript
var config = {
  // #1 - 간단한 entry 설정
  entry: './path/to/my/entry/file.js',
  // #2 - 앱 로직용, 외부 라이브러리용
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  },
  // #3 - 페이지당 불러오는 js 설정
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
  }
}
```

```javascript
module.exports = {
  entry: {
    Profile: './profile.js',
    Feed: './feed.js'
  },
  output: {
    path: 'build',
    filename: '[name].js' // 위에 지정한 entry 키의 이름에 맞춰서 결과 산출
  }
}
```

## Webpack Output

- entry 에서 설정하고 묶은 파일의 결과값을 설정

```javascript
const path = require('path');
module.exports = {
  entry: {
    // ...
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
    // filename: '[name].js'
  }
};
```

### Output Name Options

```javascript
output: {
  filename: '[name].js',
  filename: '[hash].js',
  filename: '[chunkhash].js'
}
```

1. [name]: 엔트리명에 따른 output 파일명 생성
2. [hash]: 특정 webpack build에 따른 output 파일명 생성
3. [chunkhash]: 특정 webpack chunk에 따른 output 파일명 생성

## Webpack Loader

- 웹팩은 자바스크립트 파일만 처리가 가능하도록 되어있다.
- loader를 이용하여 다른 형태의 웹 자원들을(img, css) js로 변환하여 로딩

```javascript
module.exports = {
  entry: {},
  output: {},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```

### Babel Loader

```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', 'react', { modules: false }] // 트리 쉐이킹
          ]
        }
      }]
    }
  ]
}
```

```javascript
// .babelrc
{
  presets: ['es2015', 'react']
}
```

## Code Splitting 실습

이것은 일반적인 webpack의 Code Splitting(파일을 chunk단위로 나눠서 필요할때마다 로딩하는 기법)를 의미하는게 아니다.

## Webpack Plugins

플러그인은 파일별 커스텀 기능을 사용하기 위해 사용한다.

- ex) JS minification, file extraction, alias(별칭)

```javascript
module.exports = {
  entry: {},
  output: {},
  module: {},
  plugins: [
    new webpack.optimize.UglifyJsPlugin() // 용량 줄이기
  ]
};
```

### Plugins 종류

#### ProvidePlugins

- 모든 모듈에서 사용할 수 있도록 해당 모듈을 변수로 변환한다.

```javascript
new webpack.ProvidePlugin({
  $: 'jquery'
});
/*
  일일이 자바스크립트 파일마다 import 할 필요없이 전역 변수로 설정
*/
```

#### DefinePlugin

- Webpack 번들링을 시작하는 시점에 사용 가능한 상수들을 정의
- 일반적으로 개발계 & 테스트계에 따라 다른 설정을 적용할 때 유용

```javascript
new webpack.DefinePlugin({
  TWO: "1+1"
})
```

#### ManifestPlugin

- 번들링시 생성되는 코드(라이브러리)에 대한 정보를 json 파일로 저장하여 관리

```javascript
new ManifestPlugin({
  fileName: 'manifest.json',
  basePath: './dist/'
})
```

## Webpack Resolve

- Webpack의 모듈 번들링 관점에서 봤을 때, 모듈 간의 의존성을 고려하여 모듈을 로딩해야 한다.
- 따라서, 모듈을 어떤 위치에서 어떻게 로딩할지에 관해 정의를 하는 것이 바로 Module Resolution

```javascript
// 일반적인 모듈 로딩 방식
import foo from 'path/to/module';
```

그렇다면 여기서 우리가 주목해야하는 부분은 "어떻게 로딩해오느냐?"라는 점

1. 절대 경로를 이용한 파일 로딩
- 파일의 경로를 모두 입력

```javascript
import "/home/me/file";
```

2. 상대 경로를 이용한 파일 로딩
- 해당 모듈이 로딩되는 시점에서의 위치기반으로

```javascript
import "../src/file1";
import "./file2";
```

### Resolve Option
config 파일에 `resolve`를 추가하여 모듈 로딩에 관련된 옵션 사용

alias
- 특정 모듈을 로딩할 때 `alias`옵션을 이용하면 별칭으로 더 쉽게 로딩이 가능하다.

```javascript
alias: {
  Utilities: path.resolve(__dirname, 'src/path/utilities/')
}

import Utility from '../../src/path/utilities/utility';
import Utility from 'Utilities/utility';
```

### modules

- `require()` `import ''`등의 모듈 로딩시에 어느 폴더를 기준할 것인지 정하는 옵션

```javascript
modules: ["node_modules"] // default
modules: [path.resolve(__dirname, "src"), "node_modules"] // src/node_modules
```

## Webpack Dev Server

- `webpack-dev-server`: webpack 자체에서 제공하는 개발 서버이고 빠른 리로딩 기능 제공
- `webpack-dev-middleware`: 서버가 이미 구성된 경우에는 webpack을 미들웨어로 구성하여 서버와 연결

> 개인 프로젝트에는 시작하기 쉬운 webpack-dev-server 를 활용!

### Webpack Dev Server

- 페이지 자동고침을 제공하는 webpack 개발용 node.js 서버

#### Options

- `publicPath`: Webpack 으로 번들한 파일들이 위치하는 곳. default 값은 `/`

```javascript
// 항상 `/`를 앞뒤에 붙여야 한다
publicPath: "/assets/"
```

- `contentBase`: 서버가 로딩할 static 파일 경로를 지정

```javascript
contentBase: path.join(__dirname, "public")
contentBase: false
```

- `compress`: gzip 압축 방식을 이용하여 웹 자원의 사이즈를 줄인다.

```javascript
compress: true
```

## 기존 실습과 Dev 서버의 차이점

기존 실습은 번들된 결과를 직접 로컬에서 확인하였지만, Webpack dev Server는 개발 서버 실행 이후에 `dist(번들링된 폴더)` 파일을 확인할 수 없다. 즉, 물리적인 결과 파일이 반환되지 않는다. 대신에 **결과물이 메모리에 들어가고 메모리에서 바로 브라우저에 올리게 된다.**

## [부록] Path vs Public Path 소개

- webpack dev server의 path, publicPath를 구분하기 위해 파악
- output path와 public path 속성의 차이점 이해 필요

```
# Webpack 컴파일 시에 뜨는 로그
Project is running at http://locahost:9000/
webpack output is served from /dist/
```

- `output.path`: 번들링한 결과가 위치할 번들링 파일의 **절대 경로**
- `output.publicPath`: 브라우저가 참고할 번들링 결과 **파일의 URL 주소를 지정**

## Webpack Dev Middleware

- 기존에 구성한 서버에 webpack 에서 컴파일한 파일을 전달하는 middleware wrapper
- webpack에 설정한 파일을 변경시, 파일에 직접 변경 내역을 저장하지 않고 메모리 공간을 활용한다.
- 따라서, 변경된 파일 내역을 파일 디렉토리 구조안에서는 확인이 불가능하다.

## 꿀팁

### 주요 명령어

- `webpack`: 웹팩 빌드 기본 명령어(주요 개발용)
- `webpack -p`: minification 기능이 들어간 빌드(주로 배포용)
- `webpack -watch`: 개발에서 빌드할 파일의 변화를 감지
- `webpack -d`: sourcemap 포함하여 빌드
- `webpack --display-error-details`: error 발생시 디버깅 정보를 출력
- `webpack --optimize-minimize --define process.env.NODE_ENV="'production'"`: 배포용

### Sourcemap 활용

- 브라우저에서 webpack으로 컴파일된 파일을 디버깅하기란 어려움
- 따라서, 아래와 같이 source-map 설정을 추가하여 원래의 파일 구조에서 디버깅이 가능

```javascript
module.exports = {
  // ...
  devtool: '#inline-source-map'
}
```

### Hot Module Replacement

- 웹 앱에서 사용하는 JS 모듈들을 갱신 할때, 화면에 새로고침없이 뒷단에서 변경 및 삭제 기능을 지원

### Vue Webpack.config.js 파일을 분석하는 것도 공부가 된다!

## 참고 자료

- [Webpack 4 Tutorial: from 0 Conf to Production Mode](https://www.valentinog.com/blog/webpack-tutorial/)
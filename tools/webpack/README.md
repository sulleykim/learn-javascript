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

## 참고 자료

- [Webpack 4 Tutorial: from 0 Conf to Production Mode](https://www.valentinog.com/blog/webpack-tutorial/)
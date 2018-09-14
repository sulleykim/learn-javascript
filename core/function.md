# 자바스크립트 함수

## 함수란?

수학에서의 함수는 주어진 입력 값에 따라 출력 값을 반환하는 것입니다.

![function](https://user-images.githubusercontent.com/27342882/45471578-7f022c80-b76c-11e8-9ae1-a0bcbdfc5497.JPG)

## 함수 선언 방법

- 함수 선언문

```javascript
/**
 * @param {Number}
 * @return {Number}
 */
function f(x) {
    return x + 2;
}
```
- 함수 표현식
```javascript
/**
 * @param {Number}
 * @return {Number}
 */
var f = function(x) {
    return x + 2;
}
```

자바스크립트의 함수는 일급객체(first-class citizens)이므로 변수에 함수를 대입 가능하다. 일급 객체의 특성으로 자바스크립트 함수는 아래와 같은 특징을 가진다.

- 함수를 리턴값으로 사용
- 함수를 변수로 사용
- 함수를 매개변수로 대입 가능

### 함수 선언문과 표현식의 차이점

```javascript
f1();
f2(); // Uncaught TypeError: f2 is not a function
function f1() {
    console.log("f1()");
}

var f2 = function() {
    console.log("f2()");
}
```

위의 예제를 통해 **선언문과 표현식의 차이**를 알 수 있다. 선언문으로 작성된 함수는 정의되기 전에도 호출하여 사용할 수 있다.
이런 문제는 순차적으로 소스코드를 읽어나가는데 문제가 생기게 되므로 함수 표현식을 통해서 함수 선언을 하는 것을 추천한다. 하지만, 늘 선언문 방식이 좋지 않은 것은 아니다. 오히려 함수 선언문으로 작성한 함수를 소스코드 아래에 모아두고 위에서 사용하면 코드의 가독성(?)이 좋아지는 경우도 있다. 상황에 따라 사용하면 되고 선언문과 표현식의 차이가 있다는 사실을 알고 있자.

### 중요한 차이점

> 함수 선언식은 호이스트에 영향을 받지만, 표현식은 호이스팅에 영향을 받지 않는다.

```javascript
f1();
f2(); // Uncaught TypeError: f2 is not a function
function f1() {
    console.log("f1()");
}

var f2 = function() {
    console.log("f2()");
}
```

예제를 다시 살펴보자. 해당 소스코드는 자바스크립트 해석기로 인해서 아래의 코드로 해석된다.

```javascript
function f1() {
    console.log("f1()");
}

var f2;

f1();
f2();

f2 = function() {
    console.log("f2()");
}
```

자바스크립트 해석기의 결과를 보니 위의 예제의 `f2()` 함수가 `Uncaught TypeError: f2 is not a function`라는 오류를 반환하는지 알 수 있게 되었다. 그리고 이를 통해서 **함수 선언문**도 변수와 동일하게 끌어올림(hosting)이 존재한다는 사실을 알 수 있다.

### 알아두면 쓸모 있을 지식

내가 지금까지 배운 지식으로는 변수 선언과 함수 선언이 되는 경우 초기화시점이 다른 것으로 알고 있다. 일단 변수는 선언 시점과 초기화 시점이 다르다. 선언이 먼저 일어나고 임의의 값인 `undefined`가 대입되고 실행 시점에서 초기화 작업이 이루어진다. 함수는 선언과 초기화가 동시에 일어나게 된다. 이것을 더 연구하면 여러가지에 대해 더 자세히 알 수 있을 것이다.

### 함수 표현식의 장점

- 클로져로 사용
- 콜백으로 사용

```javascript
function handler(index) {
    return function() {
        console.log(index);
    };
}

var tabs = document.querySelectorAll('.tab');
var i;

for (i = 0; i < tabs.length; i++) {
    tabs[i].onclick = handler(i);
}
```

처음에는 `handler()` 함수가 **함수 표현식**인가? 에 대해서 고민했다. 생긴건 **함수 선언문**인데 말이다. 하지만 여기서 중요하게 보아야하는 것은 새로운 함수를 리턴한다는 사실이다. 이 부분이 **함수 표현식**이다. 변수로 선언되었기 때문에, 리턴이 되는 것이기 때문이다. 아래 예제와 동일하다.

```javascript
function handler(index) {

    var returnFunc = function() {
        console.log(index);
    }
    return returnFunc
}

var tabs = document.querySelectorAll('.tab');
var i;

for (i = 0; i < tabs.length; i++) {
    tabs[i].onclick = handler(i);
}
```

이제는 왜 저게 **함수 표현식**인가에 대해서 확실하다. 해당 함수는 잘 작동한다. 그 이유는 클로저가 실행 환경의 `index` 값을 기억하고 있기 때문이다. 아래 예제는 정상적으로 작동하지 않는 예제다.

```javascript
var tabs = document.querySelectorAll('.tab');
var i;

for (i = 0; i < tabs.length; i++) {
    tabs[i].onclick = function() {
        console.log(i);
    };
}
```

예제를 실행해보면 요소 클릭마다 동일한 값이 출력되는 것을 확인할 수 있다. 그 이유는 반복문이 다 돌아가고 난 이후 `i` 값을 참조하기 때문이다. 이를 이해하기 위해서는 도표를 그려보면 이해가 쉽다. 해당 도표는 **함수 스코프**, **스코프 체인**, **활성 객체 생성**에 대한 전반적인 지식이 있어야 한다. 이해를 위해 그림을 그려보자. 상세한 생성 방법은 [여기](./variable.md)를 참고하자. 다소 생략된 부분이 많아서 정확하지 않을 수 있다.

- 활성 객체 생성
- arguments 객체 생성
- 스코프 체인
- 변수 선언
- this 바인딩
- 실행

![no_closure](https://user-images.githubusercontent.com/27342882/45475274-d0171e00-b776-11e8-91bf-44bc5ebd78f8.JPG)

```javascript
tabs[i].onclick = function() {
    console.log(i);
};
```

소스코드에서 `i` 값을 찾기 위해 **스코프 체인** 탐색이 일어난다. 체인에 연결되어 있는 것이 **전역 실행 컨텍스트**이기 때문에, 전역 실행 컨텍스트에서 `i`를 찾게 된다. 하지만 `i`는 반복문을 다 순회한 값을 가지므로 우리가 원하는 방식대로 작동하지 않을 것이다. 이를 어떻게 해결할 수 있을까?

```javascript
let tabs = document.querySelectorAll('.tab');

for (let i = 0; i < tabs.length; i++) {
    tabs[i].onclick = function() {
        console.log(i);
    };
}
```

제일 간단한 방법은 변수 선언시 **let** 키워드를 사용하는 것이다. **let** 키워드를 사용하면 기존의 언어처럼 **블록 스코프**를 사용할 수 있다. 알고 있겠지만, 자바스크립트는 **함수 수 스코프**를 가진다.

```javascript
function handler(index) {

    var returnFunc = function() {
        console.log(index);
    }
    return returnFunc
}

var tabs = document.querySelectorAll('.tab');
var i;

for (i = 0; i < tabs.length; i++) {
    tabs[i].onclick = handler(i);
}
```

제일 처음에 본 예제를 다시 살펴보자. 해당 소스코드를 도표로 그려보면 왜 정상적으로 `i`값을 출력하는지 알 수 있다.

![closure](https://user-images.githubusercontent.com/27342882/45475996-d3130e00-b778-11e8-9c69-e8bf31dfc058.JPG)

클로져를 적용한 예제 소스코드에서도 `index` 값을 찾기 위해 **스코프 체인** 탐색이 일어난다. 제일 처음 체인에 연결되어 있는 것이 **handler() 실행 컨텍스트**이다. 해당 실행 컨텍스트에서 찾고자하는 `index` 변수를 찾을 수 있기에 더 이상 스코프 체인을 수행하지 않는다. 이것을 구술로 표현하기가 참 애매하다. **클로져로 현재 실행 환경의 지역변수를 기억하고 있다** 라는 표현이 현재 내가 설명할 수 있는 가장 좋은 표현이다. 더 좋은 표현이 있다면 글을 수정하겠다.

### 값에 의한 호출과 참조에 의한 호출


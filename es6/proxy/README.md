# Proxy

## Proxy란?

> 컴퓨터 네트워크에서 다른 서버 상의 자원을 찾는 클라이언트로부터 요청을 받아 중계하는 서버를 말한다.

## 자바스크립트 Proxy 객체

> Proxy 객체는 기본 작업 (예 : 속성 조회, 할당, 열거, 함수 호출 등)에 대한 사용자 정의 동작을 정의하는 데 사용됩니다.

## 사용하기

```javascript
var p = new Proxy(target, handler);
```

### `target`

Proxy로 랩핑할 대상 객체를 지정한다. 기본 배열, 함수, 또 다른 Proxy객체 등이 들어올 수 있다.

### `handler`

프로퍼티들이 function 인 객체이다. 동작이 수행될 때, handler는 proxy의 행동을 정의한다. 정의 가능한 행동에는 **속성 조회, 할당, 열거, 함수 호출**이 있다. 정의 가능한 행동은 `get`, `set`, `has`등을 이용하여 정의 가능하다.

### `get` 

```javascript
var p = new Proxy({}, {
    get: function(target, prop, receiver) {
        console.log('called: ', prop);
        return 10;
    }
});

console.log(p.a);
```

### `set`
```javascript
var p = new Proxy({}, {
    set: function(target, prop, value, receiver) {
        console.log('called: ', prop, ' = ', value);
        return true;
    }
});

p.a = 20;
```

### `construct`

```javascript
var p = new Proxy(function() {}, {
    construct: function(target, argumentsList, newTarget) {
        console.log('called: ' + argumentsList.join(', '));
        return { value: argumentsList[0] * 10 };
    }
});

console.log(new p(1, 2, 3).value);
```
# 자바스크립트 비동기 처리와 콜백 함수

## 동기(Synchronized)와 비동기(Asynchronus)

### 동기

> 순차적으로 작동

```javascript
var i;

for(i = 0; i < 5; i++) {
    console.log(i);
}

console.log('finished');
```

```
0
1
2
3
4
finished
```

### 비동기

```javascript
console.log('1');
setTimeout(function() {
    console.log('2');
}, 0);  
console.log('3');
```

```
1
3
2
```

![콜 스택과 이벤트 큐](https://user-images.githubusercontent.com/27342882/48203541-1cfc2700-e3ab-11e8-9bf2-56ccdc3ca0b2.JPG)

## 왜 자바스크립트는 비동기로 작동해야할까?

![화면 예제](https://user-images.githubusercontent.com/27342882/48203525-12419200-e3ab-11e8-9844-d22a208313fe.JPG)

### 동기 방식으로 작동한다면?

위의 웹 애플리케이션은 **두 가지 기능**을 가진다.

1. 계산기 기능(매우 오래걸리는 작업)
2. 1초마다 날짜를 화면에서 지속적으로 갱신하여 표시

우리의 웹 애플리케이션은 **비동기로 작동하기에** 정상적으로 작동한다. 하지만, 만약에 **동기로 작동한다면** 어떤 문제가 발생할까? **첫번째 기능**을 사용하기 위해서 계산 버튼을 누른다고 가정하자 그러면 동기의 특성에 의해서 첫번째 기능이 모두 수행되는 시점에서 두번째 기능이 작동할 것이다. 하지만, 첫번째 기능은 **매우 복잡한 CPU 연산**을 하는 무시한 녀석이므로 계산이 매우 오랜 시간이 걸린다고 가정한다면 웹 애플리케이션을 이용하는 사용자 입장에서는 웹 애플리케이션이 멈추었다고 판단할 수 있다. 왜냐하면, 동기 특성에 의해서 두번째 기능(1초마다 날짜를 화면에서 지속적으로 갱신하여 표시)이 정상적으로 화면을 갱신하지 않기 때문이다.

### UI 기반의 웹 애플리케이션

그래서, **자바스크립트는 비동기의 특성**을 가지도록 설계되었다. 비동기 특성을 가지면 첫 번째 기능이 아무리 오래걸리더라도 두 번째 기능이 작동하는데 문제가 없다. 이는 **사용자 경험이 중요한 UI 기반의 자바스크립트**에서 중요하다.

## 참고 자료

- [동기 방식과 비동기 방식 차이점](http://itzone.tistory.com/360)
- [자바스크립트는 어떻게 작동하는가 이벤트 루프와 비동기 프로그래밍의 부상 async await을 이용한 코딩 팁 다섯가지](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-%EB%B6%80%EC%83%81-async-await%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BD%94%EB%94%A9-%ED%8C%81-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-df65ffb4e7e)
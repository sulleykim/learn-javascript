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

> 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성

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

- 단일 스레드

## 왜 자바스크립트는 비동기로 작동해야할까?

![화면 예제](https://user-images.githubusercontent.com/27342882/48203525-12419200-e3ab-11e8-9844-d22a208313fe.JPG)

### 동기 방식으로 작동한다면?

위의 웹 애플리케이션은 **두 가지 기능**을 가진다.

1. 계산기 기능(매우 오래걸리는 작업)
2. 1초마다 날짜를 화면에서 지속적으로 갱신하여 표시

우리의 웹 애플리케이션은 **비동기로 작동하기에** 정상적으로 작동한다. 하지만, 만약에 **동기로 작동한다면** 어떤 문제가 발생할까? **첫번째 기능**을 사용하기 위해서 계산 버튼을 누른다고 가정하자 그러면 동기의 특성에 의해서 첫번째 기능이 모두 수행되는 시점에서 두번째 기능이 작동할 것이다. 하지만, 첫번째 기능은 **매우 복잡한 CPU 연산**을 하는 무시한 녀석이므로 계산이 매우 오랜 시간이 걸린다고 가정한다면 웹 애플리케이션을 이용하는 사용자 입장에서는 웹 애플리케이션이 멈추었다고 판단할 수 있다. 왜냐하면, 동기 특성에 의해서 두번째 기능(1초마다 날짜를 화면에서 지속적으로 갱신하여 표시)이 정상적으로 화면을 갱신하지 않기 때문이다.

### UI 기반의 웹 애플리케이션

그래서, **자바스크립트는 비동기의 특성**을 가지도록 설계되었다. 비동기 특성을 가지면 첫 번째 기능이 아무리 오래걸리더라도 두 번째 기능이 작동하는데 문제가 없다. 이는 **사용자 경험이 중요한 UI 기반의 자바스크립트**에서 중요하다.

## 본격적으로 비동기에 대해 알아보자

### 비동기 사례

```javascript
function getData() {
	var tableData;
	$.get('https://domain.com/products/1', function (response) {
		tableData = response;
	});
	return tableData;
}

console.log(getData()); // undefined
```

### 비동기를 해결하자, 콜백 함수(Callback Hell)

- 일급 객체
    - 함수를 변수에 대입
    - 함수를 매개변수로 대입
    - 함수를 리턴 값으로 사용

```javascript
function getData(callback) {
	$.get('https://domain.com/products/1', function (response) {
        callback(response)
	});
}

getData(function(response) {
    console.log(response);
})
```

### 콜백 지옥(Callback Hell)

```javascript
$.get('url', function (response) {
	parseValue(response, function (id) {
		auth(id, function (result) {
			display(result, function (text) {
				console.log(text);
			});
		});
	});
});
```

웹 서비스를 개발하다 보면 서버에서 데이터를 받아와 화면에 표시하기까지 인코딩, 사용자 인증 등을 처리해야 하는 경우가 있습니다. 만약 이 모든 과정을 비동기로 처리해야 한다고 하면 위와 같이 콜백 안에 콜백을 계속 무는 형식으로 코딩을 하게 됩니다. 이러한 코드 구조는 가독성도 떨어지고 로직을 변경하기도 어렵습니다. 이와 같은 코드 구조를 **콜백 지옥**이라고 한다.

## 콜백 지옥에서 벗어나기

### Promise

> 프로미스는 자바스크립트 비동기 처리에 사용되는 객체입니다.

#### Promise 적용 전

```javascript
function getData(callbackFunc) {
    $.get('https://domain.com/products/1', function (response) {
        callbackFunc(response); 
    });
}

getData(function (tableData) {
    console.log(tableData);
});
```

#### Promise 도입

```javascript
function getData() {
    return new Promise(function (resolve, reject) {
        $.get('https://domain.com/products/1', function (response){
            resolve(response);
        }).fail(function(error) {
            reject(error)
        });
    });
}

getData().then(function (tableData) {
    console.log(tableData);
}).catch(function(error) {
    console.log(error);
});
```

#### 매우 유용한

```javascript
$.get('url', function (response) {
	parseValue(response, function (id) {
		auth(id, function (result) {
			display(result, function (text) {
				console.log(text);
			});
		});
	});
});
```

```javascript

getData()
.then(parseValue)
.then(auth)
.then(display)
.catch(function(error) {
    console.log(error);
})
```

#### 더 나은 비동기 코드 작성 `await async`

```javascript
function getData() {
    return new Promise(function (resolve, reject) {
        $.get('https://domain.com/products/1', function (response){
            resolve(response);
        }).fail(function(error) {
            reject(Error)
        });
    });
}
```

```javascript

async function productsApi() {
    try {
        const list = await getData();
        /*
        const auth = await getAuth();
        */
        console.log(list);
    } catch(error) {
        console.log(error);
    }
}
```
## 참고 자료

- [동기 방식과 비동기 방식 차이점](http://itzone.tistory.com/360)

- [자바스크립트는 어떻게 작동하는가 이벤트 루프와 비동기 프로그래밍의 부상 async await을 이용한 코딩 팁 다섯가지](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-%EB%B6%80%EC%83%81-async-await%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BD%94%EB%94%A9-%ED%8C%81-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-df65ffb4e7e)

- [자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/#%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC-%EA%B7%B8%EA%B2%8C-%EB%AD%94%EA%B0%80%EC%9A%94)

- [도대체 Promise는 어떻게 쓰는 거야?](https://programmingsummaries.tistory.com/325)
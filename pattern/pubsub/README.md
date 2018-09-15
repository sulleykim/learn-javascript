# 패턴

## Pub / Sub

일명 구독/발행 패턴이라고 불리는 자바스크립트 패턴이다. 개인적으로 해당 패턴이 왜 필요하고 어느 상황에 사용하면 좋은지 정리해본다. 만약에 공감하지 않는다면 글을 수정하여 **PR**을 남겨주시면 감사하다!

## 문제점

실제 자바스크립트 개발을 하다보면 요소(DOM)을 사용자 이벤트(키보드, 마우스)를 통해서 변경하는 경우가 많다. **버튼 클릭시 슬라이드되면서 모달창이 띄워지는 시나리오**가 대표적이다. 하지만, 현대 웹 애플리케이션은 복잡한 사용자 경험을 제공해야하므로 사용자 이벤트가 다양한 요소 변경으로 이루어진다. 상태에 따라서 사이드바나 헤더, 푸터등의 요소가 바뀌는게 대표적인 예이다. 이런 경우 어떻게 소스코드를 작성할 것인가? 사실 큰 문제가 없어보인다. 각 실행 함수마다 DOM 변경 로직을 추가하면 된다. 하지만, 이런 경우 로직이 함수에 강력하게 결합되어있게 된다. 이러면 재 사용의 문제가 발생하기도 한다. 이런 문제를 해결하기 위해서 고안된 패턴이 **Pub/Sub Pattern**이다.

## 문제의 해결 (TODO : 조금 더 가독성이 좋게 재 작성 요망)

자바스크립트는 배열에 함수를 삽입하고 실행도 가능하다. 이로 인해서 엄청난 응용이 가능하다. 해당 패턴의 핵심은 커스텀 이벤트에 동시에 실행될 함수를 정의하고 실행하는 것이다. 예를 들어보자, 매우 복잡한 UI를 가지는 **할 일 관리** 애플리케이션을 만들고 있다고 가정하자. 예를 들어서 **할 일 추가** 버튼을 누르는 경우 동시 다발적으로 6개의 DOM에서 변화가 일어난다고 가정하자. 일반적인 코드에서는 클릭시 모든 DOM 요소를 하나의 함수에서 처리하게 할 것이다. 하지만, **발행/구독**패턴은 커스텀 이벤트에 각 각의 DOM을 처리하는 함수를 구독해놓는다. 그리고 실행시는 커스텀 이벤트명으로 발행하면 해당되는 함수만 실행되게 할 수 있다.  

## 소스코드 

```javascript
var EventEmitter = (function() {
    var EventEmitter = function() {
        this.events = {};
    }
    /*
        events 객체에 모든 이벤트가 들어가므로 재사용하는 일이 없으므로
        꼭 생성자 함수 객체로 만들지 않아도 된다.
    */
    EventEmitter.prototype = {
        /**@description 이벤트 구독
        * @param {String} eventName 이벤트 이름
        * @param {Function} fn 함수
        * @return {void}
        */
        on: function(eventName, fn) {
            if(!this.events.hasOwnProperty(eventName)) {
                this.events[eventName] = [];
            } 
            this.events[eventName].push(fn);
        
            return this;
        },
        /**@description 이벤트 삭제
        * @param {String} eventName 이벤트 이름
        * @param {Function} fn 함수
        * @return {void}
        */
        off: function(eventName, fn) {
            var i;

            if(this.events.hasOwnProperty(eventName)) {
                for(i = 0; i < this.events[eventName].length; i++) {
                    if(this.events[eventName][i] === fn) {
                        this.events[eventName].splice(i, 1);
                        break;
                    }
                }
            }

            return this;
        },
        /**@description 이벤트 발행
        * @param {String} eventName 이벤트 이름
        * @param {Any} args 모든 데이터 타입(기본, 객체)
        * @return {void}
        */
        emit: function(eventName, args) {
            var args = Array.prototype.slice.call(arguments, 1); // 매개변수 전달
            if(this.events.hasOwnProperty(eventName)) {
                this.events[eventName].forEach(function(fn) {
                    fn.apply(this, args);
                });
            }

            return this;
        }
    }

    return EventEmitter;
}());

var event = new EventEmitter();

var ryu = {
    name: "hangyeong",
    age: 25
};

var print = function() {
    console.log(arguments);
    console.log(this);
    console.log("print");
};

var test = function() {
    console.log(arguments);
    console.log(this);
    console.log("test");
};

event.on("todo-app-insert", print).on("todo-app-insert", test).emit("todo-app-insert", 1, "string", ryu);
```

소스코드를 분석하면 이해하기 쉬울 것이다. 결국 `events` 객체는 아래와 동일하다.

```javascript
var events = {
    "todo-app-insert": [print(), test()]
};
```

**할일 목록 추가**시 `print()`와 `test()`함수가 실행된다. 그리고 추가적으로 할 일 목록 추가시 다른 작업을 해야하는 경우 함수를 추가해주면 된다! 얼마나 편리한가. 그리고 이렇게 함수를 저장하면 또 다른 장점으로는 역시 재사용성이다. `print()` 함수는 **할일 목록 추가**이외에 **할일 목록 삭제**에서도 사용될 수 있을 것이다! 해당 패턴은 `Javascript MVC Pattern`에서도 활용될 수 있다고 한다.
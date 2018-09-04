# 자바스크립트에 대하여

자바스크립트는 객체 기반의 스크립트 **프로그래밍 언어**이다. 이 언어는 웹 브라우저 내에서 주로 사용하며, 다른 응용 프로그램의 내장 객체에도 접근할 수 있는 기능을 가지고 있다. 또한 Node.js와 같은 런타임 환경과 같이 서버 사이드 네트워크 프로그래밍에도 사용되고 있다.

## 특징

- 인터프리터 언어

    컴퓨터는 기계어만 이해할 수 있습니다. 그러나 기계어는 사람이 이해하기 쉽지 않습니다. 프로그래밍 언어를 사용하면 사람이 이해할 수 있는 언어로 프로그램을 작성할 수 있으며, 프로그램은 기계어로 번역되어 컴퓨터에서 실행됩니다. 프로그래밍으로 작성한 소스코드를 컴퓨터가 이해할 수 있는 기계어로 번역하는 행위를 컴파일이라고 하며 번역하는 소프트웨어를 컴파일러라고 합니다. 대표적인 컴파일러 언어는 C, C++, Java 등이 있습니다. 컴파일 언어는 컴파일 과정은 시간이 걸리지만 실행되는 속도는 빠릅니다. 반면 프로그램을 한줄마다 기계어로 번역하여 실행하는 프로그래밍 언어를 인터프리터 언어라고 합니다. 자바스크립트는 인터프리터 언어입니다. 인터프리터 언어는 바로 실행할 수 있고 동작을 확인해가면서 프로그램을 개발할 수 있습니다. 하지만 상대적으로 컴파일어보다 처리 속도가 느리다는 단점이 있습니다.

![interpreter](https://user-images.githubusercontent.com/27342882/45023798-54c8b480-b072-11e8-84d1-2bda1daeb526.JPG)

- 동적 타입 언어

    자바스크립트는 클래스 기반이 아닌 프로토타입을 상속하는 프로토타입 기반 객체 지향 언어입니다. 그러면 기존 클래스 기반 언어와 차이는 무엇일까요? 자바스크립트는 객체 생성 이후에도 프로토타입 메서드에 프로퍼티와 메서드를 동적으로 추가하거나 삭제할 수 있습니다. 이것이 클래스 기반 객체 지향 언어의 객체와 다른 점입니다.

    ```javascript
    function Person() {
        this.name = "hangyeong";
    }

    var ryu = new Person();

    console.log(ryu.name); // hangyeong
    console.log(ryu.talk()); // Uncaught TypeError: ryu.talk is not a function

    Person.prototype.talk = function() {
        return "I'm Frontend Developer!";
    }

    console.log(ryu.talk()); // I'm Frontend Developer!
    ```

    자바스크립트에서 프로토타입은 중요한 개념입니다. 더 자세한 내용은 [여기]()에서 알아보세요.

- 동적 타입 언어

    동적 타입 언어는 변수의 자료형을 컴파일시 정하는 것이 아니고 실행시에 결정합니다. 반면에 정적 타입 언어는 컴파일 시에 자료형을 결정합니다.

- 함수는 일급 객체

    자바스크립트 함수는 변수, 리턴 값, 매개 변수로 사용가능한 **일급 객체**입니다.

    일급 객체

    - 변수나 데이터 구조안에 담을 수 있다.

    ```javascript
    var ryu = function() {
        return "hello world";
    };

    console.log(ryu()); // hello world;
    ```
    - 파라미터로 전달 할 수 있다.
    ```javascript

    function say() {
        console.log("hello world");
    }

    function callback(fn) {
        fn();
    }

    callback(say); // hello world
    ```
    - 리턴 값으로 사용할 수 있다.
    ```javascript
    function ryu() {
        return function() {
            console.log("hello world");
        }
    }

    var call = ryu();
    call(); // hello world
    ```

## 참고한 것

- 모던 자바스크립트 입문
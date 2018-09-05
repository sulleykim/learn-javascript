# 변수

변수는 값을 담기 위한 공간입니다. 변수는 컴퓨터의 메모리에 일정한 크기의 영역으로 생성된다.

![variable](https://user-images.githubusercontent.com/27342882/45028011-47b1c280-b07e-11e8-9a06-bfc8a73aae0b.JPG)

## 변수 선언

```javascript
var message = "Hello world";
```

자바스크립트에는 변수 타입이 없으므로 모든 데이터 타입의 값을 `var` 키워드로 저장할 수 있습니다.

```javascript
var number = 100; // number
var string = "Hello world"; // string
```

## 지역 변수와 전역 변수

변수는 프로그램 안에서 유효 범위를 가진다. **전역 변수**는 프로그램 전체에서 접근 가능하며 **지역 변수**는 정의된 함수 안에서만 참조 가능하다. 여기에서 의아한 것은 지역 변수가 **정의된 함수안에서만 참조 가능**하다는 점이다. 자바스크립트는 함수 단위 유효 범위를 가진다.

```javascript
for(var i = 0; i < 10; i++) {
    console.log(i);
}
console.log(i);
/*
    0
    1
    2
    3
    4
    5
    6
    7
    8
    9
    10
*/
```

이는 자바스크립트가 기존 언어처럼 블럭 스코프를 가지지 않는다는 것을 보여주는 예제이다. 만약 동일 예제를 `Java`로 작성한다면 마지막 출력 부분(`console`)에서 오류가 발생할 것이다. 하지만, 자바스크립트는 함수 단위 스코프를 가지므로 해당 예제는 문제가 없다.

```javascript
var global_variable = "global"; // 전역 변수

function FnA() {
    var local_variable_a = "a"; // 지역 변수
    
    console.log(global_variable); // 전역 변수 접근
    console.log(local_variable_a); // 지역 변수 접근

    function FnB() {
        var local_variable_b = "b"; // 지역 변수
        console.log(local_variable_b);
    }

    FnB();
}

console.log(global_variable); // 전역 변수 접근
console.log(local_variable_a); // 지역 변수 접근 - 오류
FnA();
```

해당 예제를 실행해보면 자바스크립트가 **함수 스코프**라는 사실을 알 수 있다. 함수 안에서는 지역변수가 접근 가능하지만 함수 밖에서는 함수 안의 지역변수가 접근할 수 없다.

```javascript
function call(){
    var name = "hangyeong";
    callName();
}

function callName(){
    return name;
}

call();
```

예제를 살펴보면서 생각해보자. `callName` 함수는 정상적인 값을 출력할까? 얼핏보면 해당 코드를 아래처럼 해석할 수도 있다.

```javascript
function call() {
    var name = "hangyeong";

    function callName() {
        /*
            해당 코드처럼 해석을 한다면
            당연히 name 변수에 접근할 수 있다.
        */
        return name;
    }
    callName();
}

call();
```

함수(`call`)의 지역변수는 내부함수(`callName`)에서 접근가능하므로 정상적으로 값을 출력할 것으로 예상하지만 실행되지 않는다. 그 이유는 함수 실행시 유효 범위를 함수 실행 환경이 아닌 함수 정의 환경으로 참조하는 렉시컬 특성 때문이다. 정의 단계에서 보면 각 각의 실행 환경이 생성되므로 접근이 안된다.

## 호이스팅(변수 끌어올림)

```javascript
console.log(x); // x is not defined ?
var x;
```

```javascript
/*
    호이스팅으로 인해 선언이 상단에 위치
*/
var x; // undefined
console.log(x);
// var x;
```

예제의 실행 결과를 예측해보자. 변수를 선언하기 전에 출력하므로 **x는 존재하지 않아요**라는 오류를 반환할 것으로 예상하지만 그렇지 않다! 실행 결과는 `undefined`이다. 이는 프로그램 중간에서 변수를 선언하더라도 변수가 프로그램 첫머리에 선언된 것처럼 다른 문장 앞에 생성되기 때문이다. 이를 **호이스팅**이라고 한다. **호이스팅**은 변수의 정의가 범위에 따라 선언과 할당으로 분리되는 것을 의미합니다.해당 특성으로 인해 자바스크립트 변수 선언시 반드시 프로그램의 시작 부분에 선언해야합니다.

```javascript
var myName;

function myName() {
    console.log("hangyeong");
}

console.log(typeof myName); // function
```

함수 선언은 변수선언을 덮어 씁니다.

```javascript
var myName = "hangyeong";

function myName() {
    console.log("hangyeong");
}

console.log(typeof myName); // string
```

하지만, 변수에 값이 할당될 경우에는 반대로 변수가 함수선언을 덮어 씁니다.

## 실행 컨텍스트

자바스크립트가 실행될 때 생성되는 하나의 실행 단위인 실행 컨텍스트에 대해서 알아보자. 실행 컨텍스트는 실행 가능한 코드가 실행되기 위해 필요한 환경이라고 말할 수 있다. 대부분 함수로 실행 컨텍스트를 만들 수 있다. 실행 컨텍스트는 스택 안에 하나씩 차곡차곡 쌓이고, 제일 위에 위치한 실행 컨텍스트가 실행되고 반환된다.

```javascript
console.log("This is global context");

function ExContext1() {
    console.log("This is ExContext1");
}

function ExContent2() {
    console.log("This is ExContext2");
}

ExContext2();
/*
    This is global context
    This is ExContext1
    This is ExContext2
*/
```

![variable_1](https://user-images.githubusercontent.com/27342882/45064626-d6aaf300-b0ef-11e8-8ee5-c9467d4d1b42.JPG)

### 실행 컨텍스트 생성 과정

- 활성 객체와 변수 객체
- 스코프 체인

#### 실행 문맥 생성 순서

1. 활성화 객체 생성
2. arguments 객체 생성
3. 유효 범위 정보 생성
4. 변수 생성
5. this 바인딩
6. 실행

```javascript
function execute(param1, param2) {
    var a = 1, b = 2;
    function func() {
        return a + b;
    }

    return param1 + param2 + func();
}

execute(3, 4);
```

- 활성 객체 생성

    ![variable_object](https://user-images.githubusercontent.com/27342882/45065222-f263c880-b0f2-11e8-9e06-734245d34fe0.JPG)

    실행 컨텍스트가 실행되면 자바스크립트 엔진은 해당 컨텍스트에 실행에 필요한 여러가지 정보를 담을 객체를 생성합니다. 이를 **활성 객체**라고 한다.

- arguments 객체 생성

    ![variable_arguments](https://user-images.githubusercontent.com/27342882/45065624-3bb51780-b0f5-11e8-8be4-800977c2a703.JPG)

    **arguments** 객체를 생성한다. 그림에서는 `execute()` 함수의 `param1`과 `param2`가 들어왔을 경우의 활성 객체의 상태를 표현한다.

- 스코프 정보 생성

    현재 변수의 유효 범위를 나타내는 스코프 정보를 생성한다. 스코프 정보는 연결 리스트와 유사한 형식으로 만들어진다. 현재 컨텍스트에서 특정 변수에 접근해야할 경우, 이 리스트를 활용한다. 현재 생성된 활성 객체가 스코프 체인의 제일 앞에 추가된다.

    ![variable_scope_chain](https://user-images.githubusercontent.com/27342882/45065896-ab77d200-b0f6-11e8-8899-208ca9538528.JPG)

- 변수 선언

    현재 컨텍스트에서 사용되는 지역변수이 만들어진다. 변수 객체 안에서 호출된 함수 인자는 각각의 프로퍼티가 만들어지고 그 값이 할당된다.**이 과정에서는 변수나 내부 함수를 단지 메모리에 생성하고, 초기화는 각 변수나 함수에 해당하는 표현식이 실행되기 전까지는 이루어지지 않는다는 점이다.**

    ![variable_maker](https://user-images.githubusercontent.com/27342882/45066386-26da8300-b0f9-11e8-8df1-06e4646a1c5d.JPG)

- this 바인딩 (TODO : javascript this bind)

    자바스크립트의 `this`는 호출되는 위치에 따라서 다르다. 자세한 내용은 
    [여기]()를 참고하자.

    ![variable_this](https://user-images.githubusercontent.com/27342882/45066555-e596a300-b0f9-11e8-97d5-97a7f4fc6c31.JPG)

- 코드 실행

    코드에 있는 여러가지 표현식 실행이 이루어진다. 이렇게 실행되면서 변수의 초기화 및 연산, 또 다른 함수 실행등이 이루어진다. 그림에서 `undefiend`가 할당된 변수에도 값이 할당된다. 참고로 전역 실행 컨텍스트는 일반적인 실행 컨텍스트와 다르다.

    ![variable_code_run](https://user-images.githubusercontent.com/27342882/45067517-9a32c380-b0fe-11e8-99f9-61730a04a506.JPG)

#### 스코프 체인

자바스크립트도 다른 언어와 마찬가지로 스코프, 즉 유효 범위가 있다. 이 유효 범위 안에서 변수와 함수가 존재한다. 자바스크립트는 오직 함수만이 유효 범위의 단위가 된다. 이 유효 범위를 나타내는 스코프가 **[[scope]]** 프로퍼티로 각 함수 객체내에서 연결 리스트 형식으로 관리되는데, 이를 스코프 체인이라고 한다.

![variable_scope_chain1](https://user-images.githubusercontent.com/27342882/45071289-7ed0b400-b110-11e8-844b-b2392ee5b387.JPG)

```javascript
var var1 = 1;
var var2 = 2;
function func() {
    var var1 = 10;
    var var2 = 20;
    console.log(var1); // 10
    console.log(var2); // 20
}
func();
console.log(var1);
console.log(var2);
```

![variable_scope_chain2](https://user-images.githubusercontent.com/27342882/45071678-7a0cff80-b112-11e8-8646-c50ebad14ff2.JPG)

```javascript
var value = "value1";

function printFunc() {
    var value = "value2";

    function printValue() {
        return value;
    }

    console.log(printValue());
}

printFunc();
```

![variable_scope_chain3](https://user-images.githubusercontent.com/27342882/45072053-34513680-b114-11e8-8e65-c9b071b9d676.JPG)

```javascript
var value = "value1";

function printValue() {
    return value;
}

function printFunc(func) {
    var value = "value2";
    console.log(func());
}

printFunc(printValue);
```

![variable_scope_chain4](https://user-images.githubusercontent.com/27342882/45072535-577ce580-b116-11e8-944f-174a326b07aa.JPG)

## 참고한 것

- 모던 자바스크립트 입문
- 인사이드 자바스크립트
    - 실행 컨텍스트 전체
- [자바스크립트의 변수 범위와 호이스팅](http://chanlee.github.io/2013/12/10/javascript-variable-scope-and-hoisting/)

- [실행 컨텍스트와 자바스크립트의 동작 원리](https://poiemaweb.com/js-execution-context)
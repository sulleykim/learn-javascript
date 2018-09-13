# JSHint

**JSHint**는보다 안정적이고 일관된 JavaScript 코드를 작성하는 데 도움이 되는 도구입니다. 

## 필요성

이 도구는 코드에서 일반적인 오류를 확인하여 작동합니다. JSHint는 코드의 오류를 잡을뿐만 아니라 코딩 규칙 및 스타일 가이드를 적용하는 데에도 사용할 수 있습니다 . 이것은 코드베이스를 일관성 있고 쉽게 읽을 수 있게 유지하는 데 도움이 되므로 팀에서 일할 때 매우 유용합니다.

## 설치

JSHint는 노드 패키지 관리자 (npm)를 통해 사용할 수 있습니다. nodejs를 다운로드하는 경우 npm도 함께 설치됩니다.

npm이 설치되면 터미널을 열고 명령어를 입력하세요.

```
npm install -g jshint
```

`-g`명령어를 사용하면 전역적으로 설치됩니다.

## 명령어를 이용한 JSHint 사용

작성한 자바스크립트(hello.js)로 테스트를 진행합니다. 터미널로 해당 자바스크립트 파일이 있는 위치로 이동한 다음에 다음 명령을 실행하세요.

### `hello.js`
```javascript
var global = "global";

function Fn() {
    var local = "local";
    return function() {
        console.log(local);
    }
}

Fn()();
```

```
jshint hello.js
```

```
C:\Users\front\Desktop>jshint hello.js
hello.js: line 8, col 6, Missing semicolon.

1 error
```

실행시 **JSHint**가 자바스크립트 파일을 검사합니다. 7번 라인에 세미콜론이 빠졌다는 에러를 반환하므로 추가하고 다시 실행해보면 아무런 에러메시지를 반환하지 않습니다.

### 구성

사실 앞서 실행한 자바스크립트 파일에서 원하는 검증은 사용하지 않은 변수를 **JSHint**가 미리 알려주기를 예상하였습니다. `global` 변수는 선언 이후에 사용되지 않았으므로 개발자의 실수이거나 필요하지 않는 변수일 것입니다. 이런 경우 
옵션을 주어서 검증사항을 변경하거나 추가할 수 있습니다.

#### `.jshintrc` 파일
```
{
  "unused": true
}
```

`.jshintrc` 파일을 추가하고 객체안에 여러가지 옵션을 정의하세요. 해당 옵션은 [여기](http://jshint.com/docs/options/)에서 자세히 살펴볼 수 있습니다. 이제 다시 명령어를 입력하면 **JSHint**가 사용되지 않은 변수가 있다는 사실을 알려주게 됩니다.

```
jshint hello.js
```

```
C:\Users\front\Desktop>jshint hello.js
hello.js: line 1, col 5, 'global' is defined but never used.

1 error
```

```javascript
var global = "global";

function Fn() {
    var local = "local";
    consoe.log(global);
    return function() {
        console.log(local);
    };
}

Fn()();
```

`global` 변수를 사용하고 명령을 실행하면 아무런 오류가 발생하지 않습니다.

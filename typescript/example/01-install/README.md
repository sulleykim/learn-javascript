# 설치와 설정

## 환경 설정

- Nodejs
- VSCode

## 기본 설치 및 사용

1. [Nodejs 설치](https://nodejs.org/ko/)
2. npm 설치 확인

    ```
    npm -v
    ```
3. `typescript` 전역 설치

    ```
    npm install -g typescript
    ```

4. 작업 디렉터리 설정
    ```
    mkdir tsc-tutorial
    ```
5. `App.ts` 작성하기
    ```javascript
    class User {
        private name: string;
        private age: number;
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        public about(): void {
            console.log(`User ${this.name} ${this.age}`)
        }
    }
    ```
6. 타입스크립트를 자바스크립트로 컴파일/변환

    ```
    tsc App.ts
    ```

7. 결과 확인

    ```javascript
    // App.ts
    class User {
        private name: string;
        private age: number;
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        public about(): void {
            console.log(`User ${this.name} ${this.age}`)
        }
    }
    ```

    ```javascript
    // App.js
    var User = /** @class */ (function () {
        function User(name, age) {
            this.name = name;
            this.age = age;
        }
        User.prototype.about = function () {
            console.log("User " + this.name + " " + this.age);
        };
        return User;
    }());
    ```

## 더 나은 개발 환경을 위하여

매번 타입스크립트를 자바스크립트로 명령어를 이용하여 변환하는 것은 좋은 방법이 아니다. 대신에 **VSCode**의 기능을 이용하거나 타입스크립트의 `watch` 모드나 webpack을 이용한 개발 서버(`webpack-dev-server`)를 이용하는 것도 방법이다.
# 자료구조

## 스택

스택은 데이터를 일시적으로 저장하기 위한 자료구조로, 가장 나중에 넣은 데이터를 가장 먼저 꺼냅니다.

## 예제

### 스택 만들기 (기본)

자바스크립트에서 해당 방법은 장점이 없을 것 같지만 연습삼아 작성해본다. 

```javascript
var Stack = (function() {
    // private 

    /**@description constructor
     * @param {Number} max 최대 용량
     * @return {void}
     */
    var Stack = function(max) {
        this.arr = [];
        this.max = max;
        this.ptr = 0;
    }

    // public
    Stack.prototype = {
        /**@description 스택에 데이터를 밀어넣는 메서드
         * @param {Number} data 데이터 값
         * @return {Number}
         */
        push: function(data) {
            try {
                if(this.ptr >= this.max) {
                    throw "용량이 가득 참";
                }
                return this.arr[this.ptr++] = data;
            } catch(e) {
                console.error(e);
            }
        },
        /**@description 스택에 데이터를 제거하는 메서드
         * @return {Number} 삭제된 값
         */
        pop: function() {
            try {
                if(this.ptr <= 0) {
                    throw "더 이상 삭제 할 수 없습니다.";
                }
                return this.arr[--this.ptr];
            } catch(e) {
                console.error(e);
            }
        },
        /**@description 스택에 꼭대기에 있는 데이터 반환
         * @return {Number}
         */
        peek: function() {
            try {
                if(this.ptr <= 0) {
                    throw "반환 데이터가 없습니다.";
                }
                return this.arr[this.ptr - 1];
            } catch(e) {
                console.error(e);
            }
        },
        /**@description 스택에서 data 찾아서 반환(없으면 -1)
         * @param {Number}
         * @return {Number}
         */
        indexOf: function(data) {
            var i;
            for(i = 0; i < this.ptr; i++) {
                if(this.arr[i] == data) {
                    return i;
                }
            }
            return -1;
        },
        /**@description 스택을 비움
         * @return {void}
         */
        clear: function() {
            this.ptr = 0;
            this.arr = [];
        },
        /**@description 스택의 용량 반환
         * @return {Number} max
         */
        capacity: function() {
            return this.max;
        },
        /**@description 스택을 비어있는가?
         * @return {Boolean} 
         */
        isEmpty: function() {
            return this.ptr <= 0;
        },
        /**@description 스택이 가득 찼는가?
         * @return {Boolean}
         */
        isFull: function() {
            return this.ptr >= max;
        },
        /**@description 스택에 쌓여있는 수를 반환
         * @return {Number}
         */
        size: function() {
            return this.ptr;
        }
    };

    return Stack;
}());
```

### 스택 만들기 (자바스크립트 배열 메서드 활용)

```javascript
var Stack = (function() {
    // private 

    // public
    var Stack = function() {
        this.arr = [];
    }

    // public
    Stack.prototype = {
        /**@description 스택에 데이터를 밀어넣는 메서드
            * @param {Number}
            * @return {Number}
            */
        push: function(data) {
            /*
                자바스크립트 배열은 push() 메서드 활용시 유동적으로 크기가 증가하므로 
                overFlow 처리하지 않아도 되지만 try ~ catch 구문 사용
            */
            try {
                return this.arr.push(data);
            } catch(e) {}
        },
        /**@description 스택에 데이터를 제거하는 메서드
            * @return {Number}
            */
        pop: function() {
            try {
                if(this.size() <= 0) {
                    throw "더 이상 삭제 할 수 없습니다.";
                }
                return this.arr.pop();
            } catch(e) {
                console.error(e);
            }
        },
        /**@description 스택에 꼭대기에 있는 데이터 반환
            * @return {Number}
            */
        peek: function() {
            try {
                if(this.size() <= 0) {
                    throw "반환 데이터가 없습니다.";
                }
                return this.arr[this.size() - 1];
            } catch(e) {
                console.error(e);
            }
        },
        /**@description 스택에서 data 찾아서 반환(없으면 -1)
            * @param {Number}
            * @return {Number}
            */
        indexOf: function(data) {
            var i;
            for(i = 0; i < this.size(); i++) {
                if(this.arr[i] == data) {
                    return i;
                }
            }
            return -1;
        },
        /**@description 스택을 비움
            * @return {void}
            */
        clear: function() {
            this.arr = [];
        },
        /**@description 스택 용량
            * @return {Number}
            */
        size: function() {
            return this.arr.length;
        }
    };

    return Stack;
}());

// Test Case

var stack = new Stack();

stack.push(1);
stack.push(2);

// console.log(stack.peek());
// console.log(stack.indexOf(2));

console.log(stack.arr);
```

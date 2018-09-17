# 자료구조

## 큐

스택과 마찬가지로 데이터를 일시적으로 쌓아놓은 자료구조입니다. 가장 먼저 넣은 데이터가 가장 먼저 꺼내집니다.

## 예제

### 기본

```javascript
var Queue = (function() {

    /**@description constructor
     * @param {Number} max 최대 용량
     * @return {void}
     */
    var Queue = function(max) {
        this.arr = [];
        this.max = max;
        this.ptr = 0;
    };

    Queue.prototype = {
        /**@description 데이터를 넣는 작업
         * @param {Number} data 
         * @return {void}
         */
        enqueue: function(data) {
            try {
                if(this.ptr >= this.max) {
                    throw "용량이 가득참";
                }
                this.arr[this.ptr++] = data;
            } catch(e) {
                console.error(e);
            }
        },
        /**@description 데이터를 삭제하는 작업 
         * @return {Number} data 반환 데이터
         */
        dequeue: function() {
            var data = this.arr[0], i;

            try {
                if(this.ptr <= 0) {
                    throw "더 이상 삭제 할 수 없습니다.";
                }

                for(i = 0; i < this.ptr - 1; i++) {
                    this.arr[i] = this.arr[i + 1];
                }

                this.arr[i] = undefined;
                --this.ptr;

                return data;
            } catch(e) {
                console.error(e);
            }
        }
    }

    return Queue;
}());

var queue = new Queue(5);

for(var i = 1;i <= 5; i++) {
    queue.enqueue(i);
}

queue.dequeue();
```

해당 알고리즘의 문제점은 `dequeue()` 메소드 사용시 배열을 앞으로 밀어줘야한다는 것이다. 배열의 크기가 방대한 경우 성능상 문제가 있을 수 있다.

### 자바스크립트 배열 활용

```javascript
var Queue = (function() {
    /**@description constructor
     * @return {void}
     */
    var Queue = function() {
        this.arr = [];
    };

    Queue.prototype = {
        /**@description 데이터를 넣는 작업
         * @param {Number} data 
         * @return {void}
         */
        enqueue: function(data) {
            try {
                this.arr.push(data);
            } catch(e) {
                console.error(e);
            }
        },
        /**@description 데이터를 삭제하는 작업 
         * @return {Number} data 반환 데이터
         */
        dequeue: function() {
            try {
                if(this.size() <= 0) {
                    throw "더 이상 삭제 할 수 없습니다.";
                }
                return this.arr.shift();
            } catch(e) {
                console.error(e);
            }
        },
        /**@description 현재 데이터 크기 
         * @return {Number} 반환 데이터
         */
        size: function() {
            return this.arr.length;
        }
    }

    return Queue;
}());
```

### 링 버퍼로 큐 만들기

이번에는 배열 요소를 앞으로 옮기지 않는 큐를 구현합니다. 이를 위해 사용하는 자료구조가 링 버퍼입니다. 링 버퍼는 배열의 처음이 끝과 연결되어있는 자료구조입니다. 논리적으로 앞, 뒤를 구분하기 위해서 `front`와 `rear`를 사용합니다.

- 프런트: 맨 처음 요소의 인덱스
- 리어: 맨 끝 요소의 하나 뒤의 인덱스(다음 요소를 인큐할 위치를 미리 지정)

```javascript
var Queue = (function() {
    /**@description constructor
     * @return {Number} 큐의 용량
     * @return {void}
     */
    var Queue = function(max) {
        this.arr = [];
        this.max = max; // 최대 용량
        this.num = 0; // 큐에 쌓아놓은 데이터 수
        this.front = 0; // 맨처음
        this.rear = 0; // 맨 끝
    };

    Queue.prototype = {
        /**@description 데이터를 넣는 작업
         * @param {Number} data 
         * @return {Number}
         */
        enqueue: function(data) {
            try {
                if(this.num >= this.max) {
                    throw "가득참";
                }
                this.arr[this.rear++] = data;
                this.num++;

                /*
                    순환 구조이므로
                */
                if(this.rear == this.max) {
                    this.rear = 0;
                }

                return data;
            } catch(e) {
                console.error(e);
            }
        },
        /**@description 데이터를 삭제하는 과정
         * @return {Number}
         */
        dequeue: function() {
            try {
                if(this.num <= 0) {
                    throw "더 이상 삭제 할 수 없습니다.";
                }
                var x = this.arr[this.front++];
                this.num--;

                if(this.front == this.max) {
                    this.front = 0;
                }

                return x;         
            } catch(e) {
                console.error(e);
            }
        },
        /**@description 프런트 데이터를 들여다봄
         * @return {void}
         */
        peek: function() {
            try {
                if(this.num <= 0) {
                    throw "비어있습니다."l
                }

                return this.arr[front];
            } catch(e) {
                console.error(e);
            }
        },
        /**@description 데이터 검색
         * @param {Number} x
         * @return {Number}
         */
        indexOf: function(x) {
            var i, idx;
            for(i = 0; i < num; i++) {
                idx = (i + front) % max; // 이런거는 어떻게 바로 도출이 가능할까..
                if(this.arr[idx] == x) {
                    return idx;
                }
            }
            return -1;
        },
        /**@description 데이터 검색
         * @param {Number} x
         * @return {Number}
         */
        search: function(x) {
            var i, idx;
            for(i = num; i >= 0; i--) {

            }
        }
    }

    return Queue;
}());
```

## 링 버퍼의 활용

**오래된 데이터를 버리는** 용도로 사용할 수 있습니다. 정해진 배열에 계속해서 데이터가 입력될 때 가장 최근에 들어온 데이터만 저장하고 오래된 데이터는 버리는 용도로 사용합니다.

```javascript
var N = 10, // 정해진 배열 개수
    arr = new Array(N),
    cnt = 0, // 입력 받은 개수
    retry;
console.log("정수를 입력하세요.");

do {
    console.log(cnt + 1 + "번째 정수");
    arr[cnt++ % N] = parseInt(prompt()); // cnt++ % N을 통해서 계속 인덱스 0 ~ 10을 순환
    console.log("계속할까요?");
    retry = parseInt(prompt());
} while(retry == 1);

var i = cnt - N; // 순환된 경우가 있는가 확인
if(i < 0) i = 0; // 순환된 경우가 없으므로 0부터 출력해도 된다.

for(; i < cnt; i++) {
    console.log(i + 1, a[i % N]);
}
```
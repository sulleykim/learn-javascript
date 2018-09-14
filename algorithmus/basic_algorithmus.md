# 기본 자료구조

## 자료구조

> 데이터 단위와 데이터 자체 사이의 물리적 또는 논리적인 관계

숩게 말해 자료를 효율적으로 이용할 수 있도록 컴퓨터에 저장하는 방법을 말합니다.

## 예제

```javascript
var arr = [], i, len;
arr[0] = 0;
arr[1] = 1;
arr[2] = 2;
arr[3] = 3;
arr[4] = 4;

len = arr.length;

for(i = 0; i < len; i++) {
    console.log(arr[i]);
}
```

```javascript
var arr = [0,1,2,3,4], i, len = arr.length;

for(i = 0; i < len; i++) {
    console.log(arr[i]);
}
```

### 배열 복제

```javascript
var arr = [1,2,3,4,5];
var diffArr = [1,2,3,4,5];
var copyArr = arr;

console.log(arr == diffArr); // false
console.log(arr == copyArr); // true
```

`arr`와 `diffArr` 배열은 요소의 구성은 동일하나 비교연산시 `false`를 반환한다. 그 이유는 참조하는 **주소**가 다르기 때문이다. 그러나 동일한 주소를 대입하는 `copyArr`는 `true`를 반환한다. `copyArr`와 `arr`가 동일한 레퍼런스(주소)를 가리키고 있는 것은 문제가 발생할 소지가 있다. 왜냐하면 동일한 주소를 가리키고 있으므로 값이 변경되는 경우 두 변수 모두에게 영향을 미치기 때문이다. 그러므로 **깊은 복사**를 통해서 요소의 구성은 동일하나 가리키는 주소는 다르게 만들어야 한다. 방법은 다양하다.

```javascript
var arr = [1,2,3,4,5];
var diffArr = Array.prototype.slice.call(arr);

console.log(arr == diffArr); // false
console.log(arr);
console.log(diffArr);
```

내가 생각하기에는 `slice()` 메소드를 사용하는게 좋은 방법이라고 생각된다. 이 방법을 사용하지 않으면 별도의 함수로 `arr`를 순회하면서 새로운 배열을 반환해야한다. 소스코드가 장황해질 가능성이 있다.

### 배열 요소의 최댓값 구하기

```javascript
function maxOf(arr) {
    var max = arr[0], i, len = arr.length;

    for(i = 1; i < len; i++) {
        if(arr[i] > max) max = arr[i];
    }

    return max;
}

maxOf([3,4,5,6,7,1,2]);
```

### 랜덤 함수를 이용한 배열 처리

```javascript
var num = parseInt(prompt()),
    randomArr = new Array(num),
    i, random;

for(i = 0; i < num; i++) {
    random = 100 + Math.floor(Math.random() *  num); // 0 ~ num
    randomArr[i] = random;
}

maxOf(randomArr);
```

### 배열 요소를 역순으로 정렬하기

```javascript
var arr = [22, 57, 11, 32, 91, 68, 70], 
    i, 
    len = j = arr.length - 1,
    copyArr = new Array(len);

/*
    배열 내장 함수를 사용한 방법
    내부적으로 빠른 알고리즘을 사용할 것이지만 
    공부용은 아니다.
*/
console.log(arr.reverse());

/*
    복사를 위한 배열을 만들어서 대입하는 방식이다.
    단점이라면 역시 배열을 만드는 것이다.
*/
for(i = 0; i <= len; i++) {
    copyArr[i] = arr[j];
    --j;
}

console.log(copyArr); // 방법 2
```

```javascript
/*
    arr.length / 2 만큼 순회하면서
    첫 요소와 마지막 요소를 교환하는 방식
*/
var arr = [10, 73, 2, -5, 42],
    i, last, temp, len = arr.length;

for(i = 0; i < Math.floor(len / 2); i++) {
    last = len - i - 1;
    temp = arr[i];
    arr[i] = arr[last];
    arr[last] = temp;
}

console.log(arr);
```

### 배열 요소 역순 정렬 과정 화면 출력

```javascript
var arr = [5, 10, 73, 2, -5, 42],
    i, last, temp, len = arr.length;

console.log(arr);
for(i = 0; i < Math.floor(len / 2); i++) {
    last = len - i - 1;
    temp = arr[i];
    arr[i] = arr[last];
    arr[last] = temp;
    console.log("a[" + i + "]와 " + "a[" + last + "]을 교환합니다.");
    console.log(arr);
}
console.log("역순 정렬을 마쳤습니다.");
```

### 배열 a의 모든 요소의 합계를 구하여 반환하는 메서도를 작성하세요.

```javascript
var arr = [1,2,3,4,5];

function sumOf(arr) {
    var sum = 0, index;

    for(index in arr) {
        sum += arr[index];
    }

    return sum;
}

sumOf(arr);

var sum = arr.reduce(function(a, b) { return a + b; }, 0);

console.log(sum);
```

### 두 배열이 같은가를 판단

```javascript
/** @description checked same array
 * @param {Array}
 * @param {Array}
 * @return {Boolean}
 */
function equals(a, b) {
    var aLen = a.length, 
        bLen = b.length,
        i;

    if(aLen != bLen) {
        return false;
    }

    for(i = 0; i < aLen; i++) {
        if(a[i] != b[i]) {
            return false;
        }
    }

    return true;
}
```

### 배열 b의 모든 요소를 배열 a에 복사하는 메서드 `copy()` 작성

```javascript
var aArr = [];
var bArr = [1,2,3,4,5];
/**@description copy array
 * @param {Array}
 * @param {Array}
 * @return {void}
 */
function copy(a, b) {
    var i, bLen = b.length;
    for(i = 0; i < bLen; i++) {
        a[i] = b[i];
    }
}

/**@description js call function copy array
 * @param {Array}
 * @param {Array}
 * @return {void}
 */
function jsCopy(a, b) {
    a = Array.prototype.slice.call(b);
}

jsCopy(aArr, bArr);
console.log(aArr);
```

### 배열의 b의 모든 요소를 배열 a에 역순으로 복사하는 메서드 `rcopy()`를 작성하세요.

```javascript
var a = [];
var b = [1,2,3,4,5];

/**@description reverse copy array
 * @param {Array}
 * @param {Array}
 * @return {void}
 */
function rcopy(aArr, bArr) {
    var i, temp, last, len = b.length; 
    
    for(j = 0; j < len; j++) {
        aArr[j] = bArr[j];
    }

    for(i = 0; i < Math.floor(len / 2); i++) {
        last = len - i - 1;
        temp = aArr[i];
        aArr[i] = aArr[last];
        aArr[last] = temp;
    }
}
rcopy(a, b);
console.log(a);
```

### 기수 변환

**10 진수 정수**를 **n 진수 정수**로 변환하려면 정수를 `n`으로 나눈 나머지를 구하는 동시에 그 몫에 대해 나눗셈을 반복해야 합니다. 이 과정을 몫이 0이 될 때 까지 반복하고, 구한 나머지를 역순으로 하면 됩니다.

#### 2진수 변환기

```javascript
/**@description  
 * @param {Number}
 * @return {String}
 */
function BinaryNumberMachine(inputNum) {
    var number = inputNum,
        str = [];

    while(number != 0) {
        arr.push(Math.floor(number % 2));
        number = Math.floor(number / 2);
    }

    return arr.reverse().join("");
}

BinaryNumberMachine(100);
```

#### 진수

- 8진수

```
0, 1, 2, 3, 4, 5, 6, 7
```

- 10진수

```
0, 1, 2, 3, 4, 5, 6, 7, 8, 9 
```

- 16진수
```
0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F
```

##### 10진수를 2진수 ~ 36진수로 기수 변환

```javascript
/**
 * @param {Number}
 * @param {Number}
 * @param {Array}
 * @return {void}
 */
function cardConvR(x, r, d) {
    var i = 0,
        dchar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    do {
        d[i++] = dchar.charAt(Math.floor(x % r));
        x = Math.floor(x / r);
    } while(x != 0);
}
var arr = [];

cardConvR(100, 2, arr);
console.log(arr.reverse().join(""));
/* 각 각 별도로 실행*/
cardConvR(59, 16, arr);
console.log(arr.reverse().join(""));
```

##### 진수 변환기 프로그램

```javascript
var input, 
    retry = 0, cd, dno, arr = [];
console.log("10진수를 기수 변환합니다.");

function cardConvRstr(x, r) {
    var i = 0,
        dchar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        str = "";

    do {
        str += dchar.charAt(Math.floor(x % r));
        x = Math.floor(x / r);
    } while(x != 0);

    return str.split("").reverse().join("");
}

do {
    do {
        console.log("변환하는 음이 아닌 정수 : ");
        input = parseInt(prompt());
    } while(input < 0);
    
    do {
        console.log("어떤 진수로 변환할까요? (2 ~ 36) : ");
        cd = parseInt(prompt());
    } while(cd < 2 || cd > 36);

    dno = cardConvRstr(input, cd); // 역순 처리 별도

    console.log(dno);

    retry = parseInt(prompt());
} while(retry == 1);
```

##### 기수 변환 과정 시각화 프로그램

```javascript
var input, 
    cd;

console.log("10진수를 기수 변환합니다.");
do {
    input = parseInt(prompt("변환하는 음이 아닌 정수 : "));
} while(input < 0);

do {
    cd = parseInt(prompt("어떤 진수로 변환할까요? (2 - 36)"));
} while(cd < 2 || cd > 36);


function cardConvRstrPrint(x, r) {
    var str = "",
        dchar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    do {
        console.log(r + " |  " + x);
        str += dchar.charAt(Math.floor(x % r));
        console.log("  +-----ㆍㆍㆍ" + Math.floor(x % r));
        x = Math.floor(x / r);
    } while(x != 0);
    return str.split("").reverse().join("");
}

console.log("2진수로 " + cardConvRstrPrint(input, cd) + " 입니다.");
```

### 소수의 나열

소수는 자신과 1 이외의 정수로 나누어 떨어지지 않습니다.

> 2부터 n - 1까지의 어떤 정수로도 나누어 떨어지지 않습니다.

```javascript
/**@description 1000이하 소수 출력
 * @return {void}
 */
function primeNumber() {
    var i, j, counter = 0;

    for(i = 2; i < 1000; i++) {
        for(j = 2; j < i; j++) {
            counter++;
            if(i % j == 0) break;
        }

        if(i == j) {
            console.log(i);
        }
    }
    console.log(counter);
}
primeNumber();
```

### 소수 알고리즘 개선

> 2부터 n - 1까지의 어떤 소수로도 나누어떨어지지 않습니다.

예를 들어 7이 소수인지는 7보다 작은 소수인 2,3,5로 나눗셈을 하면 충분합니다.

```javascript
/**@description 알고리즘 개선 Ver.1
 * @return {void}
 */
function primeNumber() {
    var counter = 0, 
        i, j, k, ptr = 0, 
        prime = new Array(500);

    prime[ptr++] = 2; // 2는 소수임

    for(i = 3; i <= 1000; i += 2) { // 대상은 홀수만 -> 2를 제외한 모든 짝수는 소수가 아니다
        for(j = 1; j < ptr; j++) {
            counter++;
            if(i % prime[j] == 0) {
                break;
            }
        }
        if(ptr == j) {
            prime[ptr++] = i;
        }
    }

    for(k = 0; k < ptr; k++) {
        console.log(prime[k]);
    }
    console.log(counter);
}

primeNumber();
```

#### 알아야하는 것

- 2를 제외한 짝수는 소수가 아니므로 소수 검사 제외

#### 다시 한번 이해하면서 연습

```javascript
var primeNumber = function() {
    var counter = 0,
        i, j, k, ptr = 0,
        prime = new Array(500);

    prime[ptr++] = 2; // 2는 소수
    /*
        2를 제외한 짝수는 소수가 아니므로 소수 검사 제외
    */
    for(i = 3; i <= 1000; i += 2) {
        /*
            prime[]에는 소수가 담겨있으며 prime에 있는 소수 값으로 나누어 떨어지지 않으면 소수이다.
        */
        for(j = 1; j < ptr; j++) {
            if(i % prime[j] == 0) {
                break;
            }
        }
        /*
            마지막까지 나누어떨어지지 않으므로 소수라고 배열에 저장
        */
        if(ptr == j) { // 소수
            prime[ptr++] = i;
        }
    }
}
```

### 소수 알고리즘 개선 (TODO: 다시보기)

> n의 제곱근 이하의 어떤 소수로도 나누어떨어지지 않습니다.
> prime[i]의 제곱이 n 이하인가?

```javascript
var primeNumber = function() {
    var counter = 0,
        i, j, k, ptr = 0,
        prime = new Array(500);

    prime[ptr++] = 2; // 2는 소수
    prime[ptr++] = 3; // 3은 소수

    for(i = 5; i <= 1000; i += 2) {
        var flag = false;
        for(j = 1; prime[j] * prime[j] <= i; j++) {
            counter += 2;
            if(i % prime[j] == 0) {
                flag = true;
                break;
            }
        }
        if(!flag) {
            prime[ptr++] = i;
            counter++;
        }
    }
}
```

### 에라토스테네스의 체 이해하기 (TODO : 더 공부하기)

```javascript
var primeNumber = function() {
    var prime = new Array(500).fill(false);

    for(var i = 2; i < prime.length; i++) {
        if(!prime[i]) console.log(i);
        for(var j = 2 * i; j <= prime.length; j += i) {
            prime[j] = true;
        }
    }
}
primeNumber();
```

위의 방법으로 소수를 구할 수 있지만 효율성이 좋지 않은 듯하다.

### 한 해의 경과 일 수를 계산하는 프로그램

2차원 배열을 활용하여 어떤 날짜의 **그 해의 경과 일 수**를 구해보겠습니다. 그런데, 2월의 일 수는 평년은 28일, 윤년은 29일로 해에 따라 달라집니다.

```javascript
var mdays = [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // 평년
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 윤년
];
```

#### 해당 연도가 윤년인가? 평년인가? 구분하는 함수

```javascript
var isLeap = function(year) {
    return (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) ? 1 : 0;
}
```

#### 프로그램

```javascript

var input, year, month, day;

console.log("그 해 경과 일수를 구합니다.");

do {
    console.log("년 : "); year = parseInt(prompt());
    console.log("월 : "); month = parseInt(prompt());
    console.log("일 : "); day = parseInt(prompt());
    
    console.log("그 해" + dayOfYear(year, month, day) + "입니다.");
    console.log("한 번 더 하시겠어요?");
    input = parseInt(prompt());
} while(input == 1);

/**@description dayOfYear
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @return {Number}
 */
function dayOfYear(year, month, day) {
    var days = day, i;

    for(i = 0; i < month; i++) {
        days += mdays[isLeap(year)][i];
    }

    return days;
}
```

#### 더 복잡한 데이터 구조

```javascript
var PhysicalExamination = (function() {

    var PhysicalExamination = function(name, height, vision) {
        this.name = name;
        this.height = height;
    }

    PhysicalExamination.prototype = {
        printAll: function() {
            console.log(this.name + "," + this.height);
        }
    }

    return PhysicalExamination;
})();

var student = [
    new PhysicalExamination("ryu", 200),
    new PhysicalExamination("suzy", 180),
    new PhysicalExamination("han", 150)
], index;

for(index in student) {
    student[index].printAll();
}
```
# 재귀

## 재귀 호출은 무엇인가?

> 자기 자신을 호출하는 함수

```javascript
function func() {
    func(); // 자기 자신을 호출(무한루프)
}
```

## 재귀 호출에서 무한루프를 피하자!

그렇다면 재귀 호출은 항상 무한루프에 빠질까? 그건 아니다!

```javascript
/**
 * @params {number} n
 */
function func(n) {
    if (n <= 0) {
        // Base case
        return;
    } else {
        console.log("Hello World");
        func(n - 1);
    }
}
func(5);
```

적어도 하나의 자기 자신을 호출하지 않는 Base case가 있다면 무한루프에 빠지지 않는다.

## 다양한 재귀 호출 예제

### n이하의 합을 구하는 함수

```javascript
/**
 * @params {number} n
 * @returns {number}
 */
function func(n) {
    if (n <= 0) {
        // Base case
        return 0;
    } else {
        return n + func(n - 1);
    }
}
var result = func(4);
console.log(result);
```

### 팩토리얼(Factorial)

```javascript
/**
 * @params {number} n
 * @returns {number}
 */
function factorial(n) {
    if (n == 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
var result = factorial(5);
console.log(result);
```

### x의 n승

```javascript
/**
 * @params {number} x
 * @params {number} n
 * @returns {number}
 */
function power(x, n) {
    if (n == 0) {
        return 1;
    } else {
        return x * power(x, n - 1);
    }
}
var result = power(5, 3);
console.log(result);
```

### 피보나치 수(Fibonacci Number)

```javascript
/**
 * @params {number} n
 * @returns {number}
 */
function fibonacci(n) {
    if (n < 2) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
var result = fibonacci(6);
console.log(result);
```

### 최대공약수 — 유클리드 호제법

```javascript
/**
 * @params {number} m
 * @params {number} n
 * @returns {number}
 */
function gcd(m, n) {
    if (m < n) {
        var temp = m;
        m = n;
        n = temp;
    }
    if (Math.floor(m % n) == 0) {
        return n;
    } else {
        return gcd(n, Math.floor(m % n));
    }
}
var result = gcd(6, 4);
console.log(result);
```

`m >= n` 인 두 양의 정수 m과 n에 대해서 m이 n의 배수이면 `gcd(m, n) = n` 이고, 그렇지 않으면 `gcd(m, n) = gcd(n, m % n)`이다.

### 문자열의 길이 계산

```javascript
/**
 * @params {string} str
 * @returns {number}
 */
function length(str) {
    if (str == "") {
        return 0;
    } else {
        return 1 + length(str.substring(1, str.length)); // 1번째 문자열 제외한 문자열 반환 "hello world" -> "ello world"
    }
}
console.log(length("hello world"));
```

### 문자열의 프린트

```javascript
/**
 * @params {string} str
 * @returns {number}
 */
function printChars(str) {
    if (str.length == 0) {
        return;
    } else {
        console.log(str.charAt(0));
        printChars(str.substring(1, str.length));
    }
}
printChars("hello world");
```

### 문자열을 뒤집어 프린트

```javascript
/**
 * @params {string} str
 * @returns {number}
 */
function printCharsReverse(str) {
    if (str.length == 0) {
        return;
    } else {
        printCharsReverse(str.substring(1, str.length));
        console.log(str.charAt(0));
    }
}
printCharsReverse("hello world");
```

### 2진수로 변환하여 출력

```javascript
/**
 * @params {number} n
 * @returns {number}
 */
function printInBinary(n) {
    if (n < 2) {
        console.log(n);
    } else {
        printInBinary(Math.floor(n / 2));
        console.log(Math.floor(n % 2));
    }
}
printInBinary(6);
```

### 배열의 합 구하기

```javascript
/**
 * @params {number} n
 * @params {number[]} data
 * @returns {number}
 */
function sum(n, data) {
    if (n <= 0) {
        return 0;
    } else {
        return sum(n - 1, data) + data[n - 1];
    }
}
var arr = [1, 2, 3, 4];
console.log(sum(arr.length, arr));
```

## 순환적 알고리즘 설계

-   적어도 하나의 Base case, 즉 순환되지 않고 종료되는 case가 있어야 함
-   모든 case는 결국 Base case로 수렴해야 함

## 일반 함수를 재귀 호출로 변환하기

### 순차 탐색

-   일반 함수

```javascript
/**
 * @params {number[]} data
 * @params {number} target
 * @returns {number}
 */
function search(data, target) {
    var i,
        len = data.length;
    for (i = 0; i < len; i++) {
        if (data[i] == target) return i;
    }
    return -1;
}
var arr = [1, 2, 3, 4];
console.log(search(arr, 1));
```

-   재귀 호출

```javascript
/**
 * @params {number[]} data
 * @params {number} begin
 * @params {number} end
 * @params {number} target
 * @returns {number}
 */
function search(data, begin, end, target) {
    if (begin > end) {
        return -1;
    } else if (target == data[begin]) {
        return begin;
    } else {
        return search(data, begin + 1, end, target);
    }
}
var arr = [1, 2, 3, 4];
console.log(search(arr, 0, arr.length, 1));
```

### 최대값 찾기

-   일반 함수

```javascript
/**
 * @params {number[]} data
 * @returns {number}
 */
function findMax(data) {
    var len = data.length;
    if (len == 1) {
        return data[0];
    } else {
        var max = arr[0];
        for (var i = 1; i < len; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }
}
var arr = [1, 2, 3, 4];
console.log(findMax(arr));
```

-   재귀 호출

```javascript
/**
 * @params {number[]} data
 * @params {number} begin
 * @params {number} end
 * @returns {number}
 */
function findMax(data, begin, end) {
    if (begin == end) {
        return data[begin];
    } else {
        var middle = Math.floor((begin + end) / 2);
        var max1 = findMax(data, begin, middle);
        var max2 = findMax(data, middle + 1, end);
        return Math.max(max1, max2);
    }
}
var arr = [1, 2, 3, 4];
console.log(findMax(arr, 0, arr.length - 1));
```

### 이진 검색

-   일반 함수

```javascript
/**
 * @params {number[]} data
 * @params {number} begin
 * @params {number} end
 * @params {number} target
 * @returns {number}
 */
function binarySearch(data, begin, end, target) {
    var pl = begin,
        pr = end;
    do {
        var pc = Math.floor((pl + pr) / 2);
        if (data[pc] == target) {
            return pc;
        } else if (data[pc] < target) {
            pl = pc + 1;
        } else {
            pr = pc - 1;
        }
    } while (pl <= pr);
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binarySearch(arr, 0, arr.length - 1, 1));
```

-   재귀 호출

```javascript
/**
 * @params {number[]} data
 * @params {number} begin
 * @params {number} end
 * @params {number} target
 * @returns {number}
 */
function binarySearch(data, begin, end, target) {
    if (begin > end) {
        return -1;
    } else {
        var mid = Math.floor((begin + end) / 2);
        if (data[mid] == target) {
            return mid;
        } else if (data[mid] < target) {
            return binarySearch(data, mid + 1, end, target);
        } else {
            return binarySearch(data, begin, mid - 1, target);
        }
    }
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binarySearch(arr, 0, arr.length - 1, 1));
```

### Counting Cells in a Blob

![Counting Cells in a Blob](https://user-images.githubusercontent.com/27342882/51505319-3a2c8780-1e29-11e9-9696-029bbfe08f9b.JPG)

-   Binary 이미지
-   각 픽셀은 background pixel 이거나 혹은 image pixel
-   서로 연결된 image pixel들의 집합을 blob이라고 부름
-   상하좌우 및 대각방향으로도 연결된 것으로 간주

![Counting Cells in a Blob](https://user-images.githubusercontent.com/27342882/51505454-d191da80-1e29-11e9-955f-a58496ffa396.JPG)

-   입력
    -   `N * N` 크기의 2차원 그리드(grid)
    -   하나의 좌표 (x, y)
-   출력
    -   픽셀 (x, y)가 포함된 blob의 크기
    -   (x, y)가 어떤 blob에도 속하지 않는 경우에는 0

#### Recursive Thinking

-   현재 픽셀이 속한 blob의 크기를 카운트하려면
    -   현재 픽셀이 image color가 아니라면
        -   0을 반환한다
    -   현재 픽셀이 image color라면
        -   먼저 현재 픽셀을 카운트한다 (count = 1)
        -   현재 픽셀이 중복 카운트되는 것을 방지하기 위해 다른 색으로 칠한다.
        -   현재 픽실에 이웃한 모든 픽셀들에 대해서
            -   그 픽셀이 속한 blob의 크기를 카운트하여 카운터에 더한다.
        -   카운터를 반환한다.

![Counting Cells in a Blob](https://user-images.githubusercontent.com/27342882/51505613-ecb11a00-1e2a-11e9-9118-ff1f42b11c8d.JPG)

-   인접한 8개의 픽셀 각각에 대해서 순서대로 그 픽셀이 포함된 blob의 크기를 count 한다. 북, 북동, 동, 동남, ... 순서로 고려한다.

```javascript
var BlackGroundColor = 0,
    ImageColor = 1,
    AlreadyColor = 2,
    grid = [
        [1, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 0, 0, 1, 0, 0],
        [1, 1, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [0, 1, 1, 0, 0, 1, 1, 1]
    ],
    N = grid.length;

/**
 * @params {number} x
 * @params {number} y
 * @returns {number}
 */
function countCells(x, y) {
    if (x < 0 || x >= N || y < 0 || y >= N) {
        return 0;
    } else if (grid[x][y] != ImageColor) {
        return 0;
    } else {
        grid[x][y] = AlreadyColor;
        return (
            1 +
            countCells(x - 1, y + 1) +
            countCells(x, y + 1) +
            countCells(x + 1, y + 1) +
            countCells(x - 1, y) +
            countCells(x + 1, y) +
            countCells(x - 1, y - 1) +
            countCells(x, y - 1) +
            countCells(x + 1, y - 1)
        );
    }
}
```

## 출처

-   2015 봄학기 알고리즘(권오흠 - 유튜브)

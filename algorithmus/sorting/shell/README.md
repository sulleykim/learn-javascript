# 셸 정렬

셸 정렬은 단순 삽입 정렬의 장점은 살리고 단점은 보완하여 좀 더 빠르게 정렬하는 알고리즘입니다.

## 단순 삽입 정렬

```javascript
function insertionSort(arr) {
    var i, j, len = arr.length, temp;

    for(i = 1; i < len; i++) { // 일종의 포인터, 해당되는 요소가 자신의 자리를 찾아서 삽입된다.
        temp = arr[i];

        for(j = i; j > 0 && arr[j - 1] > temp; j--) {
            arr[j] = arr[j - 1];
        }
        arr[j] = temp;
    }
}

var arr = [22,5,11,32,120,68,70];

console.log(arr);
insertionSort(arr);
console.log(arr);
```

이미 앞에서 많은 요소들이 정렬되었을 경우, 새로운 요소를 제일 앞으로 이동하는 작업이 비효율적이다.

### 단순 삽입 정렬 특징

- 정렬을 마쳤거나 정렬을 마친 상태에 가까우면 정렬 속도가 매우 빨라집니다.
- 삽입할 위치가 멀리 떨어져있으면 이동해야하는 횟수가 많아집니다.

## 셸 정렬

```javascript
function shellSort(arr) {
    var len = arr.length,
        h = len, i, j, temp;

    while(Math.floor(h / 2) > 0) {
        h = Math.floor(h / 2);
        for(i = h; i < len; i++) {
            temp = arr[i];

            for(j = i - h; j >= 0 && arr[j] > temp; j -= h) {
                arr[j + h] = arr[j];
            }
            arr[j + h] = temp;
        }
    }
}

var arr = [22,5,11,32,120,68,70];

console.log(arr);
shellSort(arr);
console.log(arr);
```

### 증분값(h 값) 선택
앞에서는 h 값을 아래처럼 변화시켰습니다.
```javascript
var h = 4, 2, 1;
```

## 정렬 정리하기

### 버블 정렬

```javascript
function bubbleSort(arr) {
    var i, j, temp, len = arr.length, count = 0;

    for(i = 0; i < len - 1; i++) {
        for(j = len - 1; j > i; j--) {
            count++;
            if(arr[j] < arr[j - 1]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
    }
    console.log(count);
}

var arr = [22,5,11,32,120,68,70];

console.log(arr);
bubbleSort(arr);
console.log(arr);
```

### 버블 정렬 개선1

```javascript
function bubbleSort(arr) {
    var i, j, temp, len = arr.length, count = 0, exchange;

    for(i = 0; i < len - 1; i++) {
        exchange = 0;
        for(j = len - 1; j > i; j--) {
            count++;
            if(arr[j] < arr[j - 1]) {
                exchange++;
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
        if(exchange == 0) break;
    }
    console.log(count);
}

var arr = [22,5,11,32,120,68,70];

console.log(arr);
bubbleSort(arr);
console.log(arr);
```

### 버블 정렬 개선2

```javascript
function bubbleSort(arr) {
    var len = arr.length, j,
        k = 0, // arr[k] 앞에 있는 값들은 검사안함
        last, temp;

    while(k < len - 1) {
        last = len - 1;

        for(j = len - 1; j > k; j--) {
            if(arr[j] < arr[j - 1]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                last = j;
            }
        }
        k = last;
    }
}

var arr = [22,5,11,32,120,68,70];

console.log(arr);
bubbleSort(arr);
console.log(arr);
```

### 선택 정렬

```javascript
function selectionSort(arr) {
    var len = arr.length, i, min;

    for(i = 0; i < len - 1; i++) {
        min = i;
        for(j = i + 1; j < len; j++) {
            if(arr[j] < arr[min]) {
                min = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
}

var arr = [22,5,11,32,120,68,70];

console.log(arr);
selectionSort(arr);
console.log(arr);
```

### 삽입 정렬

```javascript
function insertionSort(arr) {
    var len = arr.length, i, j, temp;

    for(i = 1; i < len; i++) {
        temp = arr[i];
        for(j = i; j > 0 && arr[j - 1] > temp; j--) {
            arr[j] = arr[j - 1];
        }
        arr[j] = temp;
    }
}
var arr = [22,5,11,32,120,68,70];

console.log(arr);
insertionSort(arr);
console.log(arr);
```

### 셸 정렬

```javascript
function shellSort(arr) {
    var len = arr.length,
        h = len, i, j, temp;

    while(Math.floor(h / 2) != 0) {
        h = Math.floor(h / 2);
        for(i = h; i < len; i++) {
            temp = arr[i];
            for(j = i - h; j >= 0 && arr[j] > temp; j -= h) {
                arr[j + h] = arr[j];
            }
            arr[j + h] = temp;
        }
    }
}

var arr = [22,5,11,32,120,68,70,2];

console.log(arr);
shellSort(arr);
console.log(arr);
```
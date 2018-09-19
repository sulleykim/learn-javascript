# 단순 삽입 정렬

단순 삽입 정렬은 선택한 요소를 그보다 더 앞쪽의 알맞은 위치에 삽입하는 작업을 반복하여 정렬하는 알고리즘

```javascript
var i;
for(i = 1; i < n; i++) {
    // temp <- a[i]
    // a[0], a[i - 1]의 알맞은 위치에 temp 삽입
}
```

1. 정렬된 열의 왼쪽 끝에 도달합니다.
2. temp보다 작거나 같은 key를 갖는 항목 a[j]를 발견합니다.

```javascript
function insertionSort(arr) {
    var len = arr.length, i, j, temp;

    for(i = 1; i < len; i++) { // 선택한 인덱스를 적절한 위치에 삽입하는 방식으로 정렬
        temp = arr[i]; // 적절한 위치를 찾을때까지 임시로 저장해둔다.

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

## 중간 정리

지금까지 배운 버블, 선택, 삽입정렬의 시간 복잡도는 O(n^2)입니다. (효율이 좋지 않습니다.) 다음부터는 효율적인 알고리즘에 대해서 알아봅니다. 그 전에 지금까지 배운 것에 대해서 나름대로 구현해보고 정리해보자.

### 버블정렬 (기본)

```javascript
function bubbleSort(arr) {
    var i, j, count = 0, temp, len = arr.length;

    for(i = 0; i < len - 1; i++) {
        for(j = len - 1; j > i; j--) {
            count++;
            if(arr[j - 1] > arr[j]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
    }

    console.log(count);
}

var arr = [22,5,11,32,120,68,70]; // 7

console.log(arr);

bubbleSort(arr);
console.log(arr);
```

### 버블정렬 (개선 1)

```javascript
function bubbleSort(arr) {
    var i, j, count = 0, temp, len = arr.length, exchange;

    for(i = 0; i < len - 1; i++) {
        exchange = 0;
        for(j = len - 1; j > i; j--) {
            count++;
            if(arr[j - 1] > arr[j]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                exchange++;
            }
        }
        if(exchange == 0) break;
    }
    console.log(count);
}

var arr = [22,5,11,32,120,68,70]; // 7

console.log(arr);

bubbleSort(arr);
console.log(arr);
```

### 버블정렬 (개선 2)

이미 정렬된 요소들에 대해서는 정렬하지 않는다.

```javascript
function bubbleSort(arr) {
    var k = 0, // arr[k] 앞 요소는 정렬하지마세요.
        len = arr.length, j, last;

    while(k < len - 1) {
        last = len - 1; // 정렬하는 경우가 없는 경우 while문을 멈추기 위해서

        for(j = len - 1; j > k; j--) {
            if(arr[j - 1] > arr[j]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                last = j;
            }
        }
        k = last;
    }
}

var arr = [22,5,11,32,120,68,70]; // 7

console.log(arr);
bubbleSort(arr);
console.log(arr);
```

### 단순 선택 정렬

```javascript
function selectionSort(arr) {
    var len = arr.length, i, j, temp, min;

    for(i = 0; i < len - 1; i++) {
        min = i;
        for(j = i + 1; j < len; j++) {
            if(arr[min] > arr[j]) {
                min = j;
            }
        }
        temp = arr[min];
        arr[min] = arr[i];
        arr[i] = temp;
    }
}

var arr = [22,5,11,32,120,68,70]; // 7

console.log(arr);
selectionSort(arr);
console.log(arr);
```

### 삽입 정렬

```javascript
function insertionSort(arr) {
    var len = arr.length, i, j, temp, min;

    for(i = 1; i < len; i++) {
        temp = arr[i];

        for(j = i; j > 0 && arr[j - 1] > temp; j--) {
            arr[j] = arr[j - 1];
        }
        arr[j] = temp;

        for(j = i; j > 0 && arr[j - 1] > temp; j--) {
            arr[j] = arr[j - 1];
        }
        arr[j] = temp;
    }
}

var arr = [22,5,11,32,120,68,70]; // 7

console.log(arr);
insertionSort(arr);
console.log(arr);
```
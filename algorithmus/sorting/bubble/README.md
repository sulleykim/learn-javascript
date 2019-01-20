# 정렬

## 예제

### 초기 버전

```javascript
function bubbleSort(arr) {
    var i,
        j,
        len = arr.length,
        temp,
        count = 0;

    for (i = 0; i < len - 1; i++) {
        for (j = 0; j < len; j++) {
            count++;
            if (arr[j] < arr[j - 1]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
    }
    console.log(count); // 42
}

var arr = [22, 5, 11, 32, 120, 68, 70];

console.log(arr);

bubbleSort(arr);
console.log(arr);
```

### 버블 정렬 - 최적화 버전

```javascript
function bubbleSort(arr) {
    var i,
        j,
        len = arr.length,
        temp,
        count = 0;

    for (i = 0; i < len - 1; i++) {
        for (j = len - 1; j > i; j--) {
            count++;
            if (arr[j] < arr[j - 1]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
    }

    console.log(count); // 21
}

var arr = [22, 5, 11, 32, 120, 68, 70];

console.log(arr);

bubbleSort(arr);
console.log(arr);
```

해당 로직의 핵심은 이미 정렬 완료된 요소는 검사하지 않는 것이다. 오른쪽부터 정렬을 시작해서 한 번의 **step**을 완료하면 결국 가장 작은 값이 왼쪽에 자리잡게 된다. 자신의 자리를 찾은 요소에 대해서는 다음 **step**에서는 무시하고 검사를 하여 성능을 높인다.

### 왼쪽에서 오른쪽으로 정렬

```javascript
function bubbleSort(arr) {
    var i,
        j,
        temp,
        count = 0,
        len = arr.length;

    for (i = len; i > 0; i--) {
        for (j = 1; j < i; j++) {
            count++;
            if (arr[j - 1] > arr[j]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
    }

    console.log(count);
}

var arr = [22, 5, 11, 32, 120, 68, 70];

console.log(arr);

bubbleSort(arr);
console.log(arr);
```

### 비교, 교환과정을 출력하면서 버블 정렬하는 프로그램 작성

```javascript
function bubbleSort(arr) {
    var i,
        j,
        k,
        len = arr.length,
        temp,
        count = 0,
        exchange = 0,
        str = "";

    for (i = 0; i < len - 1; i++) {
        str += "패스" + (i + 1) + ":\n";
        for (j = len; j > i; j--) {
            count++;

            for (k = 0; k < len; k++) {
                str += " " + arr[k] + "   ";
            }

            if (arr[j] < arr[j - 1]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                exchange++;
            }

            str += "\n";
        }
    }

    console.log(str);
    console.log("비교를 " + count + "회 했습니다.");
    console.log("교환을 " + exchange + "회 했습니다.");
}

var arr = [6, 4, 3, 7, 1, 9, 8];

console.log(arr);

bubbleSort(arr);
console.log(arr);
```

### 개선하기

지금까지 우리가 작성한 로직은 검사를 원하는 남은 배열이 이미 정렬된 상태여도 비교작업을 한다. 이미 정렬된 상태인 경우에는 정렬 작업을 끝내도록 개선하자.

```javascript
function bubbleSort(arr) {
    var i,
        j,
        len = arr.length,
        temp,
        exchange,
        count = 0;

    for (i = 0; i < len - 1; i++) {
        exchange = 0;
        for (j = len - 1; j > i; j--) {
            count++;
            if (arr[j - 1] > arr[j]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                exchange++;
            }
        }
        if (exchange == 0) break;
    }
    console.log(count);
}

var arr = [22, 5, 11, 32, 120, 68, 70];

console.log(arr);

bubbleSort(arr);
console.log(arr);
```

### 알고리즘 개선

각 각의 패스에서 비교, 교환을 하다가 어떤 시점 이후에 교환이 수행되지 않는다면 그보다 앞쪽의 요소는 이미 정렬을 마친 상태라고 생각해도 좋습니다. 두번째 패스에서는 이미 정렬된 요소를 검사하지 않으면 알고리즘을 개선할 수 있습니다.

```javascript
function bubbleSort(arr) {
    var k = 0, // a[k]보다 앞쪽은 이미 정렬된 상태 -> 더이상 검사를 하지 않아도 된다.
        len = arr.length,
        last,
        j,
        temp,
        count = 0;

    while (k < len - 1) {
        last = len - 1; // 왜 필요할까.. -> 이미 정렬이 완료된 경우 while문을 빠져나가기 위해서
        for (j = len - 1; j > k; j--) {
            count++;
            if (arr[j - 1] > arr[j]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                last = j; // 이미 정렬된 상태를 찾기 위한 변수
            }
        }
        k = last;
    }
    console.log(count);
}

var arr = [22, 5, 11, 32, 120, 68, 70];

console.log(arr);

bubbleSort(arr);
console.log(arr);
```

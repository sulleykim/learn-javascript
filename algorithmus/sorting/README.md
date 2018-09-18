# 정렬

## 예제

### 초기 버전

```javascript
function bubbleSort(arr) {
    var i, j,
        len = arr.length,
        temp,
        count = 0;

    for(i = 0; i < len - 1; i++) {
        for(j = 0; j < len; j++) {
            count++;
            if(arr[j] < arr[j - 1]) {
                temp = arr[j]; 
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
    }
    console.log(count); // 42
}

var arr = [22,5,11,32,120,68,70];

console.log(arr);

bubbleSort(arr);
console.log(arr);
```

### 버블 정렬 - 최적화 버전

```javascript
function bubbleSort(arr) {
    var i, j,
        len = arr.length,
        temp,
        count = 0;

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

    console.log(count); // 21
}

var arr = [22,5,11,32,120,68,70];

console.log(arr);

bubbleSort(arr);
console.log(arr);
```

해당 로직의 핵심은 이미 정렬 완료된 요소는 검사하지 않는 것이다. 오른쪽부터 정렬을 시작해서 한 번의 **step**을 완료하면 결국 가장 작은 값이 왼쪽에 자리잡게 된다. 자신의 자리를 찾은 요소에 대해서는 다음 **step**에서는 무시하고 검사를 하여 성능을 높인다.

### 왼쪽에서 오른쪽으로 정렬

```javascript
function bubbleSort(arr) {
    var i, j,
        temp,
        count = 0,
        len = arr.length;

    for(i = len; i > 0; i--) {
        for(j = 1; j < i; j++) {
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

var arr = [22,5,11,32,120,68,70];

console.log(arr);

bubbleSort(arr);
console.log(arr);
```

### 비교, 교환과정을 출력하면서 버블 정렬하는 프로그램 작성

```javascript
function bubbleSort(arr) {
    var i, j, k,
        len = arr.length,
        temp,
        count = 0,
        exchange = 0,
        str = "";

    for(i = 0; i < len - 1; i++) {
        str += "패스" + (i + 1) + ":\n";
        for(j = len; j > i; j--) {
            count++;

            for(k = 0; k < len; k++) {
                str += " " + arr[k] + "   ";
            }
            
            if(arr[j] < arr[j - 1]) {
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

var arr = [6,4,3,7,1,9,8];

console.log(arr);

bubbleSort(arr);
console.log(arr);
```
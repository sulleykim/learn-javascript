# 단순 삽입 정렬

단순 삽입 정렬은 선택한 요소를 그보다 더 앞쪽의 알맞은 위치에 삽입하는 작업을 반복하여 정렬하는 알고리즘

```javascript
var i;
for (i = 1; i < n; i++) {
    // temp <- a[i]
    // a[0], a[i - 1]의 알맞은 위치에 temp 삽입
}
```

1. 정렬된 열의 왼쪽 끝에 도달합니다.
2. temp보다 작거나 같은 key를 갖는 항목 a[j]를 발견합니다.

```javascript
function insertionSort(arr) {
    var len = arr.length,
        i,
        j,
        temp;

    for (i = 1; i < len; i++) {
        // 선택한 인덱스를 적절한 위치에 삽입하는 방식으로 정렬
        temp = arr[i]; // 적절한 위치를 찾을때까지 임시로 저장해둔다.

        for (j = i; j > 0 && arr[j - 1] > temp; j--) {
            arr[j] = arr[j - 1];
        }
        arr[j] = temp;
    }
}

var arr = [22, 5, 11, 32, 120, 68, 70];

console.log(arr);

insertionSort(arr);
console.log(arr);
```

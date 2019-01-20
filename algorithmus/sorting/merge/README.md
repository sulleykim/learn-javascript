# 병합 정렬

## 정렬을 마친 배열의 총합

```javascript
/**@description a,b 배열을 c로 합병
 * @return {Array: Number} a
 * @return {Array: Number} b
 * @return {Array: Number} c
 * @returns {void}
 */
function merge(a, b, c) {
    var pa = 0,
        pb = 0,
        pc = 0,
        aLen = a.length,
        bLen = b.length;

    while (pa < aLen && pb < bLen) {
        // 비교하여 작은 값을 저장
        c[pc++] = a[pa] <= b[pb] ? a[pa++] : b[pb++];
    }

    while (pa < aLen) {
        // a에 남아있는 요소를 복사
        c[pc++] = a[pa++];
    }

    while (pb < bLen) {
        // b에 남아있는 요소를 복사
        c[pc++] = b[pb++];
    }
}

var a = [2, 4, 6, 8, 11, 13],
    b = [1, 3, 9, 16, 21],
    c = [];

console.log(c);

merge(a, b, c);

console.log(c);
```

## 병합 정렬

```javascript
function mergeSort(arr, left, right) {
    var i, center, j, p, k;

    if (left < right) {
        center = Math.floor((left + right) / 2);
        j = 0;
        p = 0;
        k = left;

        mergeSort(arr, left, center);
        mergeSort(arr, center + 1, right);

        for (i = left; i <= center; i++) {
            buff[p++] = arr[i];
        }

        while (i <= right && j < p) {
            arr[k++] = buff[j] <= arr[i] ? buff[j++] : arr[i++];
        }

        while (j < p) {
            arr[k++] = buff[j++];
        }
    }
}
var buff = [];
var arr = [22, 5, 11, 32, 120, 68, 70];

console.log(arr);
mergeSort(arr, 0, arr.length - 1);
console.log(arr);
```

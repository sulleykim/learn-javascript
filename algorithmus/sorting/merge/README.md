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
        bLen = b.length

    while(pa < aLen && pb < bLen) { // 비교하여 작은 값을 저장
        c[pc++] = (a[pa] <= b[pb]) ? a[pa++] : b[pb++];
    }

    while(pa < aLen) { // a에 남아있는 요소를 복사
        c[pc++] = a[pa++];
    }

    while(pb < bLen) { // b에 남아있는 요소를 복사
        c[pc++] = b[pb++];
    }
}

var a = [2,4,6,8,11,13],
    b = [1,3,9,16,21],
    c = [];

console.log(c);

merge(a, b, c);

console.log(c);
```

## 병합 정렬

```javascript
function mergeSort(arr, left, right) {
    var i, center, j, p, k;

    if(left < right) {
        center = Math.floor((left + right) / 2);
        j = 0;
        p = 0;
        k = left;

        mergeSort(arr, left, center);
        mergeSort(arr, center + 1, right);

        for(i = left; i <= center; i++) {
            buff[p++] = arr[i];
        }

        while(i <= right && j < p) {
            arr[k++] = (buff[j] <= arr[i]) ? buff[j++] : arr[i++];
        }

        while(j < p) {
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

### 단계별로 이해하기

```javascript
function mergeSort(arr, left, right) {
    var j, 
        k, // 복사 시작 지점
        i,
        p, // arr 앞 배열 포인터
        center; // 분할 지점

    if(left < right) { // 배열의 요소가 2개이상인 경우
        center = Math.floor((left + right) / 2);
        j = 0;
        p = 0;
        k = left;

        mergeSort(arr, left, center); // 앞쪽 배열 정렬
        mergeSort(arr, center + 1, right); // 뒷쪽 배열 정렬

        // TODO: arr[] 배열 앞쪽에 있는 값을 임시 배열 buff[]로 저장
        for(i = left; i <= center; i++) {
            buff[p++] = arr[i];
        } 

        // TODO: arr[]에 임시배열 buff[]를 합병
        while(i <= right && j < p) {
            arr[k++] = (buff[j] <= arr[i]) ? buff[j++] : arr[i++];
        }

        // TODO: buff[] 나머지 요소 복사
        while(j < p) {
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

```javascript
function mergeSort(arr, left, right) {
    var center;
    if(left < right) {
        center = Math.floor((left + right) / 2);
        mergeSort(arr, left, center);
        mergeSort(arr, center + 1, right);
        merge(arr, left, center, right);
    }

    function merge(arr, left, center, right) {
        var i, j, part1, part2, index;
        
        // TODO: buff[] 임시저장소에 arr[] 복사
        for(i = left; i <= right; i++) {
            buff[i] = arr[i];
        }

        part1 = left; // 앞 부분 배열 포인터
        part2 = center + 1; // 뒷 부분 배열 포인터
        index = left; // 저장 포인터(시작위치)

        while(part1 <= center && part2 <= right) { // 한쪽이 모두 도달할때까지
            if(buff[part1] <= buff[part2]) {
                arr[index] = buff[part1];
                part1++;
            } else {
                arr[index] = buff[part2];
                part2++;
            }
            index++;
        }

        for(j = 0; j <= center - part1; j++) {
            arr[index + j] = buff[part1 + j];
        }
    }
}
var buff = [];
var arr = [22, 5, 11, 32, 120, 68, 70];

console.log(arr);
mergeSort(arr, 0, arr.length - 1);
console.log(arr);
```
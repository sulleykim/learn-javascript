# 단순 선택 정렬

**0부터 len - 1** 인덱스 요소에 들어갈 최소값을 선택하여 교환하는 방식

```javascript
function selectionSort(arr) {
    var len = arr.length,
        i,
        j;

    for (i = 0; i < len - 1; i++) {
        var min = i; // i번째를 임시로 최소값이라고 가정한다. (일종의 포인터 역할은 한다)

        for (j = i + 1; j < len; j++) {
            // i + 1보다 큰 요소를 검사하면서 최소값 찾음
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
}

var arr = [22, 5, 11, 32, 120, 68, 70];

console.log(arr);

selectionSort(arr);
console.log(arr);
```

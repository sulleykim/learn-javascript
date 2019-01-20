# 퀵 정렬

**퀵 정렬**은 가장 빠른 정렬 알고리즘으로 알려져있습니다. 특정 기준 값으로 **큰 그룹**과 **작은 그룹**으로 나누고 또 각 각의 기준을 특정 기준 값으로 그룹을 나누는 과정을 반복합니다.

## 배열을 두 그룹으로 나누기

```javascript
function partition(arr) {
    var len = arr.length,
        pl = 0,
        pr = len - 1,
        x = arr[Math.floor(len / 2)],
        temp;

    do {
        while (arr[pl] < x) pl++;
        while (arr[pr] > x) pr--;

        if (pl <= pr) {
            swap(arr, pl++, pr--);
        }
    } while (pl <= pr);

    function swap(arr, idx1, idx2) {
        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }
}

var arr = [1, 8, 7, 4, 5, 2, 6, 3, 9]; // 9

console.log(arr);

partition(arr);

console.log(arr);
```

## 퀵정렬 구현

앞에서는 배열을 피벗을 기준으로 나누는 방법에 대해 알아보았습니다. 이 방법을 활용하면 퀵 정렬 알고리즘이 됩니다.

```javascript
function quickSort(arr, left, right) {
    var pl = left,
        pr = right,
        x = arr[Math.floor((pl + pr) / 2)];

    do {
        while (arr[pl] < x) pl++;
        while (arr[pr] > x) pr--;

        if (pl <= pr) {
            swap(arr, pl++, pr--);
        }
    } while (pl <= pr);
    if (left < pr) quickSort(arr, left, pr);
    if (pl < right) quickSort(arr, pl, right);
}

var arr = [1, 8, 7, 4, 5, 2, 6, 3, 9]; // 9

console.log(arr);

quickSort(arr, 0, arr.length - 1);

console.log(arr);
```

## 비재귀적인 퀵정렬 구현(스택 활용)

```javascript
function Stack() {
    this.data = [];
}

Stack.prototype = {
    push: function(data) {
        this.data.push(data);
    },
    pop: function(data) {
        return this.data.pop();
    },
    isEmpty: function() {
        return this.data.length <= 0;
    }
};

function quickSort(arr, left, right) {
    var lstack = new Stack(), // 나눌 범위의 왼쪽 끝 요소의 인덱스를 저장하는 스택
        rstack = new Stack(), // 나눌 범위의 오른쪽 끝 요소의 인덱스를 저장하는 스택
        pl,
        left,
        pr,
        right,
        temp;

    lstack.push(left);
    rstack.push(right);

    while (lstack.isEmpty() != true) {
        // 스택이 비어있지 않으면
        pl = left = lstack.pop();
        pr = right = rstack.pop();
        x = arr[Math.floor((left + right) / 2)];

        do {
            while (arr[pl] < x) pl++;
            while (arr[pr] > x) pr--;

            if (pl <= pr) {
                temp = arr[pl];
                arr[pl] = arr[pr];
                arr[pr] = temp;
                pl++;
                pr--;
            }
        } while (pl <= pr);

        if (left < pr) {
            lstack.push(left);
            rstack.push(pr);
        }

        if (pl < right) {
            lstack.push(pl);
            rstack.push(right);
        }
    }
}

var arr = [1, 8, 7, 4, 5, 2, 6, 3, 9]; // 9

console.log(arr);

quickSort(arr, 0, arr.length - 1);

console.log(arr);
```

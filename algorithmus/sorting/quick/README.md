# 퀵 정렬

**퀵 정렬**은 가장 빠른 정렬 알고리즘으로 알려져있습니다. 특정 기준 값으로 **큰 그룹**과 **작은 그룹**으로 나누고 또 각 각의 기준을 특정 기준 값으로 그룹을 나누는 과정을 반복합니다.

## 배열을 두 그룹으로 나누기

```javascript
function partition(arr) {
    var len = arr.length,
    pl = 0,
    pr = len - 1,
    x = arr[Math.floor(len / 2)], temp;

    do {
        while(arr[pl] < x) pl++;
        while(arr[pr] > x) pr--;

        if(pl <= pr) { // while문에서 한번 이미 거르는데 이게 꼭 필요한 것인가..
            /*
                교환 이후에 그 다음 연산을 위해 pl, pr을 옮겨주기 위해서 후위 연산자를 사용한다.
            */
            // swap(arr, pl++, pr--);
            temp = arr[pl];
            arr[pl] = arr[pr];
            arr[pr] = temp;
            pl++;
            pr--;
        }
    } while(pl <= pr);

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
        while(arr[pl] < x) pl++;
        while(arr[pr] > x) pr--;

        if(pl <= pr) { // while문에서 한번 이미 거르는데 이게 꼭 필요한 것인가..
            /*
                교환 이후에 그 다음 연산을 위해 pl, pr을 옮겨주기 위해서 후위 연산자를 사용한다.
            */
            // swap(arr, pl++, pr--);
            temp = arr[pl];
            arr[pl] = arr[pr];
            arr[pr] = temp;
            pl++;
            pr--;
        }
    } while(pl <= pr);

    /*
        이부분이 이해가 안된다. 왜 조건이 이렇게 되는걸까? 제일 처음에 볼때는 이해가 안되었는데. 생각해보니 피벗을 기준으로
        교환과정을 완료하면 결국엔 pl과 pr 위치가 바뀐다. pl = 0, pr = 배열 길이 - 1이지만 마지막 연산을 완료하면 pr이 pl보다 먼저
        오게 된다. 그리고 left과 right는 초기값을 가지게 된다. 대략 그림은 아래와 같다.
        left <------> pr <--> pl <------> right 그래서 아래와 같은 조건절이 나오는게 아닌가? 라는 생각이 든다.
    */
    if(left < pr) quickSort(arr, left, pr);
    if(pl < right) quickSort(arr, pl, right);
}


var arr = [1, 8, 7, 4, 5, 2, 6, 3, 9]; // 9

console.log(arr);

quickSort(arr, 0, arr.length - 1);

console.log(arr);
```

```javascript
function quickSort(arr, left, right) {
    var pl = left,
        pr = right,
        x = arr[Math.floor((pl + pr) / 2)],
        temp, i, str = "";

    str += `arr[${left}] ~ arr[${right}] : {`;

    for(i = left; i < right; i++) {
        str += arr[i] + " , ";    
    }
    str += `${right}}\n`;

    console.log(str);

    do {
        while(arr[pl] < x) pl++;
        while(arr[pr] > x) pr--;

        if(pl <= pr) {
            temp = arr[pl];
            arr[pl] = arr[pr];
            arr[pr] = temp;
            pl++;
            pr--;
        }
    } while(pl <= pr);
    if(left < pr) quickSort(arr, left, pr);
    if(pl < right) quickSort(arr, pl, right);
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
}

function quickSort(arr, left, right) {
    var lstack = new Stack(), // 나눌 범위의 왼쪽 끝 요소의 인덱스를 저장하는 스택
        rstack = new Stack(), // 나눌 범위의 오른쪽 끝 요소의 인덱스를 저장하는 스택
        pl, left, pr, right, temp;

    lstack.push(left);
    rstack.push(right);

    while(lstack.isEmpty() != true) { // 스택이 비어있지 않으면
        pl = left = lstack.pop();
        pr = right = rstack.pop();
        x = arr[Math.floor((left + right) / 2)];

        do {
            while(arr[pl] < x) pl++;
            while(arr[pr] > x) pr--;

            if(pl <= pr) {
                temp = arr[pl];
                arr[pl] = arr[pr];
                arr[pr] = temp;
                pl++;
                pr--;
            }
        } while(pl <= pr);

        if(left < pr) {
            lstack.push(left);
            rstack.push(pr);
        }

        if(pl < right) {
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
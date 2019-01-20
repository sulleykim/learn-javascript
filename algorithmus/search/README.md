# 검색 알고리즘

## 검색의 세가지 방법

1. 배열 검색
    - 선형 탐색 : 무작위 데이터에서 검색
    - 이진 검색 : 정렬된 데이터에서 빠르게 검색
    - 해시법 : 추가, 삭제가 자주 일어나는 데이터에서 빠르게 검색
2. 선형 리스트 검색

3. 이진 검색 트리 검색

기능 구현시 특정 목적을 이루기 위해 선택할 수 있는 알고리즘이 여러가지인 경우에는 용도나 목적, 실행 속도, 자료구조 등을 고려하여 알고리즘을 선택해야한다.

## 예제

### 선형 검색

검색의 가장 기본적인 방법이다.

```javascript
var data = [22, 8, 55, 32, 120, 55, 70];

/**@description 순차탐색
 * @param {Array}
 * @param {Number}
 * @return {Number}
 */
var seqSearch = function(arr, key) {
    var i,
        len = arr.length;

    for (i = 0; i < len; i++) {
        if (arr[i] == key) {
            return i;
        }
    }
    return -1;
};
seqSearch(data, 55); // 2
seqSearch(data, 1); // -1
```

### 이진 검색

이 알고리즘을 적용하는 전제 조건은 데이터가 키 값으로 이미 정렬되어있다는 것입니다.

```javascript
var binarySearch = function(arr, key) {
    var pl = 0,
        pr = arr.length - 1;

    do {
        pc = Math.floor(pl + pr) / 2;
        if (arr[pc] == key) {
            return pc;
        } else if (arr[pc] < key) {
            pl = pc + 1;
        } else {
            pr = pc - 1;
        }
    } while (pl <= pr);

    return -1;
};
```

### 복잡도

-   시간 복잡도
    실행에 필요한 시간을 평가
-   공간 복잡도
    기억 영역과 파일 공간이 얼마나 필요한가

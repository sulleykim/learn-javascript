# 힙(Heap) 정렬

## Heap이란?

**부모의 값이 자식의 값보다 항상 크다**는 조건을 만족하는 **완전이진트리**입니다. 완전 이진트리는 부모는 자식을 왼쪽부터 추가하는 모양을 유지하는 트리를 의미한다. 그리고 여기에서 **이진**이라는 말은 **부모가 가질 수 있는 자식의 개수가 최대 2개다**라는 의미입니다.

## Heap을 Array 표현

힙은 완전이진트리(complete binary tree) 성질을 만족하기 때문에 다음처럼 1차원 배열(array)로도 표현이 가능합니다. 힙의 요소를 배열에 저장하면 부모와 자식의 인덱스 사이에 다음과 같은 관계가 성립됩니다.

1. 부모는 `array[(i - 1) / 2]`
2. 왼쪽 자식은 `array[(2 * i) + 1]`
3. 오른쪽 자식은 `array[(2 * i) + 2]`

## 힙(Heap) 정렬

힙 정렬은 **가장 큰 값이 루트에 위치**하는 특징을 이용하는 정렬 알고리즘입니다. 힙에서 가장 큰 값인 루트를 꺼내는 작업을 반복하고 그 값을 늘어놓으면 배열은 정렬을 마치게 됩니다.

## 단계

1. 최대 힙을 구성한다.
2. 현재 힙의 루트는 가장 큰 값이 존재하게 된다. 루트의 값을 마지막 요소와 바꾸고 힙의 사이즈를 줄인다.
3. 힙의 사이즈가 1보다 크면 위 과정을 반복한다.

## 구현1

```javascript
var arrayLength;

function buildHeap(input) {
    arrayLength = input.length;

    for(var i = Math.floor(arrayLength / 2); i >= 0; i--) {
        heapify(input, i);
    }
}

function heapify(input, i) {
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if(left < arrayLength && input[left] > input[largest]) {
        largest = left;
    }

    if(right < arrayLength && input[right] > input[largest]) {
        largest = right;
    }

    if(largest != i) {
        swap(input, i, largest);
        heapify(input, largest);
    }
}

function swap(input, index1, index2) {
    var temp = input[index1];
    input[index1] = input[index2];
    input[index2] = temp;
}

function heapSort(input) {
    buildHeap(input);
    
    for(var i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        arrayLength--;
        heapify(input, 0)
    }
}

var example = [40,10,50,24,1,2,4,-10,15,7,8,5];
console.log(example);
heapSort(example);
console.log(example);
```

## 구현1 단계별 정리

```javascript
var length;

function buildHeap(arr) {
    length = arr.length;

    /*
        arr[length / 2] ~ arr[0]를 힙으로 만든다.
        즉, 전체를 배열을 힙화
    */
    for(var i = Math.floor(length / 2); i >= 0; i--) {
        heapify(arr, i);
    }
}

function heapify(arr, i) {
    var largest = i,
        left = 2 * i + 1,
        right = 2 * i + 2;
    
    if(left < length && arr[left] > arr[largest]) {
        largest = left;
    } 

    if(right < length && arr[right] > arr[largest]) {
        largest = right;
    }

    if(i != largest) {
        swap(arr, i, largest);
        heapify(arr, largest); // 변경 사항이 있으면 자식 노드도 heapify
    }
} 

function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function heapSort(arr) {
    buildHeap(arr);

    for(var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        length--; // 이미 정렬된 요소는 heapify에서 제외하기 위하여
        heapify(arr, 0);
    }
}

var example = [40,10,50,24,1,2,4,-10,15,7,8,5];
console.log(example);
heapSort(example);
console.log(example);
```

## 이해를 바탕으로 다시 돌아와서

```javascript
// TODO 모든 요소를 heapify(buildHeap)
var length;
function buildHeap(arr) {
    length = arr.length;
    for(var i = Math.floor(arr.length / 2); i >= 0; i--) {
        heapify(arr, i);
    }
}

// TODO heapify
function heapify(arr, i) {
    var largest = i, // parent
        left = 2 * i + 1,
        right = 2 * i + 2;

    if(left < length && arr[left] > arr[largest]) {
        largest = left;
    }

    if(right < length && arr[right] > arr[largest]) {
        largest = right;   
    }

    if(i != largest) { // 값의 변화가 있는 경우
        swap(arr, i, largest); // 변경
        // TODO 아래에 있는 값을 또 heapify
        heapify(arr, largest);
    }
}

// swap
function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
} 

// TODO heapSort
function heapSort(arr) {
    buildHeap(arr);

    for(var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        length--; // 이미 정렬된 요소는 heapify를 하지 않기 위해
        heapify(arr, 0);
    }
}

var example = [40,10,50,24,1,2,4,-10,15,7,8,5];
console.log(example);
heapSort(example);
console.log(example);
```

## 책의 예제

```javascript
// TODO swap
function swap(arr, idx1, idx2) {
    var temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
}

// TODO arr[left] ~ arr[right]를 힙으로
function downHeap(arr, left, right) {
    var temp = arr[left], // 루트
        child, // 큰 값을 가진 노드
        parent // 부모

    for(parent = left; parent < Math.floor((right + 1) / 2); parent = child) {
        cl = parent * 2 + 1;
        cr = cl + 1;

        child = (cr <= right && arr[cr] > arr[cl]) ? cr : cl;
        if(temp >= arr[child]) {
            break;
        }
        arr[parent] = arr[child];
    }
    arr[parent] = temp;
}

// TODO 힙정렬
function heapSort(arr, n) {
    // TODO 초기 전체 heapify
    for(var i = Math.floor((n - 1) / 2); i >= 0; i--) {
        downHeap(arr, i, n - 1); // 세번째 인자는
    }
    
    // Sorting
    for(var i = n - 1; i > 0; i--) {
        swap(arr, 0, i); // 가장 큰 요소와 아직 정렬되지 않은 부분의 마지막 요소를 교환
        downHeap(arr, 0, i - 1); // 이미 정렬된 요소는 downHeap을 하지 않기 위해
    }
}

var example = [40,10,50,24,1,2,4,-10,15,7,8,5];
console.log(example);
heapSort(example, example.length);
console.log(example);
```
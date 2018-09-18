# 재귀

## 팩토리얼 구하기

```javascript
function factorial(n) {
    if(n > 0) {
        return n * factorial(n - 1);
    } else {
        return 1;
    }
}

factorial(3);
```

## 유클리드 호제법 - 최대 공약수 구하기

2개의 자연수 a,b에 대해서 a를 b로 나눈 나머지를 r이라고 하면 a와 b의 최대 공약수는 b와 r의 최대 공약수와 같다. 이 성질에 따라 b를 r로 나눈 나머지 r'를 구하고, 다시 r을 r'로 나눈 나머지를 구하는 과정을 반복하여 나머지가 0이 되었을 때 나누는 수가 a,b의 최대 공약수이다.

```
a = 22
b = 8

a % b = 6(r)
b % r = 2(r')
r % r' = 0(완료) - 이때 나누는 수인 r'이 최대 공약수이다.
```

```javascript
function gcd(x, y) {
    if(y == 0) {
        return x;
    } else {
        return gcd(y, x % y);
    }
}

gcd(22, 8);

/*
    gcd(8, 6);
    gcd(6, 2);
    gcd(2, 0); // 나머지가 0이므로 x가 최대 공약수
*/
```

이거 원리는 이해가 가는데, 재귀적인 소스코드를 보지 않고 짜보려고 하면 힘들 듯하다. 이 부분은 계속 보면서 숙달을 해야하는 부분인듯.

## 재귀쓰지 않고 fatorial 구현

```javascript
function fatorial(n) {
    var i, r;

    for(i = 1; i <= n; i++) {
        r *= i;
    }

    return r;
}
```

## 재귀쓰지 않고 유클리드 호제법 구현

```javascript
function gcd(x, y) {
    var a = x, b = y, temp;

    while(b != 0) {
        temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

gcd(22, 8);

/*
    a = 22, b = 8
    temp = 8;
    b = 22 % 8 (6)
    a = 8

    a = 8, b = 6
    temp = 6;
    b = 8 % 6 (2)
    a = 6;

    a = 6, b = 2
    temp = 2;
    b = 6 % 2; (0)
    a = 2;
*/
```

## 재귀 알고리즘 분석

- 하향식
- 상향식

```javascript
function recur(n) {
    if(n > 0) {
        recur(n - 1);
        console.log(n);
        recur(n - 2);
    }
}

recur(4);
```

## 재귀 알고리즘의 비재귀적 표현

### 재귀 알고리즘

```javascript
function recur(n) {
    if(n > 0) {
        recur(n - 1);
        console.log(n);
        recur(n - 2);
    }
}
recur(4);
```

### 비재귀 알고리즘
```javascript
function recur(n) {
    while(n > 0) {
        recur(n - 1);
        console.log(n);
        n = n - 2;
    }
}
```

해당 소스코드를 이용해서 **꼬리 재귀**를 제거하였습니다. 하지만 앞에서 호출한 재귀 메서드의 제거는 쉽지 않습니다. 이를 제거하기 위해서 **스택**
을 활용합니다.

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

function recur(n) {
    var stack = new Stack();

    while(true) {
        if(n > 0) {
            stack.push(n);
            n = n - 1;
            continue;
        }

        if(stack.isEmpty() != true) { // 스택이 비어있지 않다면
            n = stack.pop();
            console.log(n);
            n = n - 2;
            continue;
        }
        break;
    }
}

recur(4);
```

### 복습

#### 팩토리얼

```javascript
function fatorial(n) {
    if(n <= 0) {
        return 1;
    } else {
        return n * fatorial(n - 1);
    }
}

fatorial(4);
```

#### `recur()`

```javascript
function recur(n) {
    if(n > 0) {
        recur(n - 1);
        console.log(n);
        recur(n - 2);
    }
}

recur(4);
```

#### 꼬리 재귀 제거

```javascript
function recur(n) {
    while(n > 0) {
        recur(n - 1);
        console.log(n);
        n = n - 2;
    }
}

recur(4);
```

#### 스택을 활용한 재귀 함수 

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

function recur(n) {
    var s = new Stack();

    while(true) {
        if(n > 0) {
            s.push(n);
            n = n - 1;
            continue;
        }

        if(s.isEmpty() != true) { // 스택이 비어있지 않다면
            n = s.pop();
            console.log(n);
            n = n - 2;
            continue;
        }

        break;
    }
}

recur(4);
```
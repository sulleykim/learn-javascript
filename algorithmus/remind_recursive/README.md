# 다시 생각해보는 재귀 함수

## 팩토리얼 함수

```javascript
function fatorial(n) {
    if(n <= 1) {
        return 1;
    } else {
        return n * fatorial(n - 1);
    }
}

fatorial(3);
```

## 최대공약수 구하기

```javascript
function gcd(x, y) {
    if(y == 0) {
        return x;
    } else {
        return gcd(y, x % y);
    }
}

gcd(22, 8);
```

## 재귀 분석

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

### 꼬리 재귀 제거
```javascript
function recur(n) {
    while(n > 0) {
        recur(n - 1);
        console.log(n);
        n = n - 2;
    }
}
```

### 재귀 제거 (스택 활용);
```javascript
function Stack() {
    this.data = [];
}

Stack.prototype = {
    push: function(data) {
        this.data.push(data);
    },
    pop: function() {
        return this.data.pop();
    },
    isEmpty: function() {
        return this.data.length <= 0;
    }
};

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
    }
}
```
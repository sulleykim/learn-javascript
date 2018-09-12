# 알고리즘

## 알고리즘이란

> 문제를 해결하기 위한 것으로, 명확하게 정의되고 순서가 있는 유한 개의 규칙으로 이루어진 집합

## 예제

### 세 값의 최댓값

```javascript
function Max3() {
    var a = Prompt(),
        b = Prompt(),
        c = Prompt(),
        max = a;

    function Prompt() {
        return parseInt(prompt());
    }

    if(max < b) max = b;
    if(max < c) max = c;

    return max;  
}

Max3();
```

### 입력받은 값 중에서 최댓값

```javascript
function MaxInput() {
    var args = Array.prototype.slice.call(arguments),
        max = args[0],
        i, length = args.length;

    for(i = 1; i < length; i++) {
        if(max < args[i]) {
            max = args[i];
        }
    }

    return max;
}

MaxInput(3,4,6,7,5,13,2);
```

### 입력받은 값의 합

```javascript
function totalSum() {
    var i, sum = 0, length = arguments.length;

    for(i = 0; i < length; i++) {
        sum += arguments[i];
    }

    return sum;
}

totalSum(1,2,3,4,5,6,7,8,9,10);
```

### 1부터 n까지 합한 값 출력하기

```javascript
function printSum(n) {
    var i, 
        sum = 0, 
        str = "";

    for(i = 1; i <= n; i++) {
        if(i != n) {
            str += i + " + ";
        } else {
            str += i;
        } 
        sum += i;
    }

    str += " = " + sum;

    return str;
}

printSum(7);
```

### 정수 a, b 사이의 모든 정수의 합을 구하여 반환하는 함수 만들기

```javascript
function sumOf(a, b) {
    var temp, sum = 0;

    if(a > b) {
        temp = b; 
        b = a; 
        a = temp;
    }

    for(i = a; i <= b; i++) {
        sum += i;
    }

    return sum;
}

sumOf(3, 5); // 12
sumOf(6, 4); // 15
```

### 1부터 n까지 합한 값 출력하기 - 재입력 받기

```javascript
function SumForPos() {
    var n, i, sum = 0;

    /* 
        0이하 숫자 입력시 재입력
    */
    do {
        n = parseInt(prompt());
    } while(n <= 0);

    for(i = 1; i <= n; i++) {
        sum += i;
    }

    console.log(sum);
}

SumForPos();
```

### 두 변수 a,b에 정수를 입력하고 b - a를 출력하는 프로그램 작성

```javascript
function TwoSubtract() {
    var a = parseInt(prompt()), b;
    console.log("a의 값 : " + a);

    /* 
        b가 a보다 작은 경우 재입력
    */
    do {
        b = parseInt(prompt());
    } while(b <= a);
    console.log("b의 값 : " + b);
    console.log("b - a는" + parseInt(b - a) + "입니다.");
}

TwoSubtract();
```

### 자릿수 세기

```javascript
function CountLength() {
    var count = parseInt(prompt()), length = 0;

    while(count != 0) {
        ++length;
        count = parseInt(count / 10);
    }
    console.log(length); 
}

CountLength();
```

### 논리 연산 사용하기

```javascript
function Digits() {
    console.log("2자리 정수를 입력하세요.");

    /* 
        2자리 수가 아닌 경우 재입력
    */
    do { 
        var num = parseInt(prompt());
    } while(num < 10 || num > 99);

    console.log("선택한 수는 " + num + " 입니다.");
}

Digits();
```

### 곱셈표

```javascript
function Multi99Table() {
    var i, j, str = "";
    console.log("----- 곱셈표 -----");
    for(i = 1; i <= 9; i++) {
        for(j = 1; j <= 9; j++) {
            str += i * j + " ";
        }
        str += "\n";
    }

    console.log(str);
}

Multi99Table();
```

### 표로 정리한 곱셈표

```javascript
function Multi99TablePrint() {
    var i, k, j, str = "", top = "   |";

    for(k = 1; k <= 9; k++) {
        top += " " + k;
    }
    console.log(top);
    console.log("---+-------------------");
    for(i = 1; i <= 9; i++) {
        str += i + "  | ";
        for(j = 1; j <= 9; j++) {
            str += i * j + " ";
        }
        str += "\n";
    }

    console.log(str);
}

Multi99TablePrint();
```

### 표로 정리한 더하기 표

```javascript
function Sum99TablePrint() {
    var i, k, j, str = "", top = "   |";

    for(k = 1; k <= 9; k++) {
        top += " " + k;
    }
    console.log(top);
    console.log("---+-------------------");
    for(i = 1; i <= 9; i++) {
        str += i + "  | ";
        for(j = 1; j <= 9; j++) {
            str += i + j + " ";
        }
        str += "\n";
    }

    console.log(str);
}

Sum99TablePrint();
```

```javascript
function SquarePrint(n) {
    var i, j, str = "";

    console.log("사각형을 출력합니다.");
    console.log("단 수 : " + n);

    for(i = 1; i <= n; i++) {
        for(j = 1; j <= n; j++) {
            str += "*";
        }
        str += "\n";
    }

    console.log(str);
}

SquarePrint(5);
```

### 직각 이등변 삼각형 출력

```javascript
function TriangleLB(n) {
    var i, j, str = "";

    for(i = 1; i <= n; i++) {
        for(j = 0; j < i; j++) {
            str += "*";
        }
        str += "\n";
    }

    console.log(str);
}

TriangleLB(5);
```

### 직각 이등변 삼각형 출력 확장하기 - 1

```javascript
function TriangleLU(n) {
    var i, j, str = "";

    for(i = n; i >= 1; i--) {
        for(j = 0; j < i; j++) {
            str += "*";
        }
        str += "\n";
    }

    console.log(str);
}

TriangleLU(5);
```

### 직각 이등변 삼각형 출력 확장하기 - 2

```javascript
function TriangleRU(n) {
    var i, j, k, str = "";

    for(i = n; i >= 1; i--) {
        for(k = 0; k < n - i; k++) {
            str += " ";
        }

        for(j = 0; j < i; j++) {
            str += "*";
        }
        str += "\n";
    }

    console.log(str);
}

TriangleRU(5);
```

### 직각 이등변 삼각형 출력 확장하기 - 3

```javascript
function TriangleRB(n) {
    var i, j, k, str = "";

    for(i = n; i >= 1; i--) {
        for(k = 0; k < i - 1; k++) {
            str += " ";
        }

        for(j = 0; j < n - i + 1; j++) {
            str += "*";
        }
        str += "\n";
    }

    console.log(str);
}

TriangleRB(5);
```

### n단 피라미드 메서드

```javascript
function spira(n) {
    var i, k, j, empty = n, str = "";

    for(i = 1; i <= n; i++) {
        --empty;
        for(k = empty; k > 0; k--) {
            str += " ";
        }
        
        for(j = 0; j < (i - 1) * 2 + 1; j++) {
            str += "*";
        }

        str += "\n";
    }

    console.log(str);
}

spira(9);
```

### n단 숫자피라미드 메서드

```javascript
function nspira(n) {
    var i, k, j, empty = n, str = "";

    for(i = 1; i <= n; i++) {
        --empty;
        for(k = empty; k > 0; k--) {
            str += " ";
        }
        
        for(j = 0; j < (i - 1) * 2 + 1; j++) {
            str += i;
        }

        str += "\n";
    }

    console.log(str);
}

nspira(9);
```
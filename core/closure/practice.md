# 클로저

## 성질

```javascript
function makeCounter() {
    var count = 0;
    return f;

    function f() {
        return count++;
    }
}

var counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
```

## 응용

### 사람 데이터를 저장하는 클로저를 생성하는 함수

```javascript
function Person(name, age) {
    var _name = name;
    var _age = age;

    return {
        getName: function() { return _name; },
        getAge: function() { return _age; },
        setAge: function(x) { _age = x; }
    }
}
```

### 함수 팩토리

```javascript
function makeMultiplier(x) {
    return function(y) {
        return x * y;
    }
}
```

### 활용하기

```javascript
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}
var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```

### 클로저를 이용해서 프라이빗 메소드 (private method) 흉내내기

```javascript
var count = (function() {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }

    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    }
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
```
## 잘못된 사용: 반복문안에서 클로져 만들기

### 잘못된

```javascript
window.onload = function() {
    var elm = document.getElementByTagName("input");
    for(var i = 0; i < elm.length; i++) {
        elm[i].onclick = function() {
            console.log(i);
        };
    }
}
```

### 올바른 방법1

```javascript
window.onload = function() {
    var elm = document.getElementByTagName("input");
    for(var i = 0; i < elm.length; i++) {
        (function(index) {
            elm[index].onclick = function() {
                console.log(index);
            };
        })(i);
    }
}
```

### 올바른 방법2

```javascript
for(let i = 0; i < elm.length; i++) {
    elm[i].onclick = function() {
        console.log(i);
    };
}
```
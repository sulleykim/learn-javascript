# 상속

다양한 상속 방법에 대해서 알아보고 있습니다. 약간 의문이 있어서 질문 남깁니다. 여러가지 상속을 직접 확인하면서 차이를 알아보고 있습니다. 각 각의 상속에는 차이가 있었지만, 생성자를 명시적으로 정해주는 이유에 대해서는 잘 알지 못합니다. 제가 알고 있는 것이 정확합니까? 그리고 생성자를 명시적으로 지정해주는 이유는 무엇입니까?

## 예제

```javascript
function Rectangle(w, h) {
    var width = w;
    var height = h;

    this.getWidth = function() {
        return width;
    }

    this.getHeight = function() {
        return height;
    }

    this.setWidth = function(value) {
        if(value < 0) {
            throw '길이는 음수일 수 없다';
        }  else {
            width = value;
        }
    }

    this.setHeight = function(value) {
        if(value < 0) {
            throw '길이는 음수일 수 없다.';
        } else {
            height = value;
        }
    }
}

Rectangle.prototype.getArea = function() {
    return this.getWidth() * this.getHeight();
}

function Square(length) {
    Rectangle.call(this, length, length);
}


// Square.prototype = Rectangle.prototype;
// Square.prototype = new Rectangle();
// Square.prototype = Object.create(Rectangle.prototype);

Square.prototype.constructor = Square;

var r = new Rectangle(5, 7);
var s = new Square(6);

// console.log(r.getArea());
// console.log(s.getArea());

console.dir(s);
```

## 알게 된 것

### Square.prototype = Rectangle.prototype 상속

![상속](https://user-images.githubusercontent.com/27342882/47251041-2824fc80-d468-11e8-9be2-ba55396016b4.JPG)

이 방법을 사용하면 프로토타입 체인에서 부모 생성자를 찾을 수 없습니다. 

### Square.prototype = new Rectangle() 상속

![상속](https://user-images.githubusercontent.com/27342882/47251049-560a4100-d468-11e8-83b4-e4920be684f1.JPG)


이 방법은 프로토타입 체인에서 부모 생성자를 찾을 수 있었지만, 중복되는 소스코드가 있습니다.

### Square.prototype = Object.create(Rectangle.prototype) 상속

![상속](https://user-images.githubusercontent.com/27342882/47251058-7cc87780-d468-11e8-8321-ca28a9e6a391.JPG)

앞서 소개한 상속방법의 문제를 해결한 끝에 `Object.create()`에 도달하였습니다. 해당 방법은 프로토타입 체인에서 부모 생성자를 찾을 수 있고, 중복되는 소스코드가 없습니다. 그래서 **이 방법이 가장 좋은 상속이라고 저는 생각합니다.**

## 알고 싶은 것

하지만, 수많은 예제 코드에 있는 `Square.prototype.constructor = Square;`라는 생성자를 명시하는 소스코드는 명확히 역할을 알 수가 없었습니다. 해당 소스코드가 없더라도 잘 작동합니다. **이것은 왜 필요합니까?**

제가 찾은 수많은 글들은 단지 `constructor` 프로퍼티의 일관성을 위해 명시적으로 설정을 해준다고 합니다. 이것이 의미가 있습니까? 아니면 여러분이 생각하는 이유는 무엇입니까?

## 찾은 이유

```javascript
function A() {}

function B() {}

B.prototype = Object.create(A.prototype);

var b = new B();

console.log(b.constructor === A); // true
console.log(b.constructor === B); // false

B.prototype.constructor = B;

console.log(b.constructor === A); // false
console.log(b.constructor === B); // true
```

소스코드 작성시 이것을 적극적으로 확인하는 경우가 많습니까? 
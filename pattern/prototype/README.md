# 자바스크립트 패턴을 위한 기본 정리

## 모든 것은 객체

```javascript
var words = "hello world";
console.log(window.words);
```

자바스크립트의 거의 대부분의 자료형은 **객체**이다. 

## 프로토타입

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.about = function() {
    console.log(this.name);
}

var ryu = new Person("hangyeong");
ryu.about();
```

```javascript
// Object.create
var ryu1 = Object.create(Person.prototype, {
    name: {
        value: "suzy",
        writable: false // 쓰기 가능 여부
    }
});

console.log(ryu1);
```

## 기본 상속

### 상속 방법1

```javascript
function Job() {}
Job.prototype.about = Person.prototype.about;
Job.prototype.skill = function() {
    console.log("skill");
}
```

### 상속 방법2

```javascript
var Parent = function() { this.name = "ryu"; };
var Child = function() {};

// 상속
Child.prototype = new Parent();

var child = new Child();
console.log(child.name);
```
위와 같은 방법으로 상속을 구현하면 Parent의 this로 참조되는 멤버들이 Child에 복사가 아닌 참조가 일어납니다. 따라서 hasOwnProperty를 돌려보면 Child에서 해당프로퍼티가 없습니다. 이런 패턴의 경우 부모 생성자함수의 this가 참조하는 멤버들을 사용할 수 있고 prototype 체인 추적이 가능하지만 부모 생성자함수로 인자를 넘길 방법이 없다는 단점이 있습니다. 해당 문제를 해결하기 위해서 두번째 상속방법인 apply,call 등을 사용하여 scope 바인딩으로 생성자를 빌려올 수 있으며, 생성자 빌려오기를 통해 다중 상속구현이 가능합니다.

```javascript
var Parent = function() { this.name = "ryu"; };
var Child = function () {
    Parent.apply(this, arguments);
};
Child.prototype = new Parent();

var child = new Child();
console.log(child);
console.log(Child.prototype.constructor);
```

### 상속 방법2
```javascript
function clone(Parent, Child) {
    for(var attr in Parent.prototype) {
        Child.prototype[attr] = Parent.prototype[attr];
    }
}

var Castle = function() {};
Castle.prototype.build = function() { console.log("Castle built"); };
var Winterfell = function() {};
clone(Castle, Winterfell);
var winterfell = new Winterfell();
winterfell.build();
```

### 상속 방법3

```javascript
var Castle = function() {};
Castle.prototype.build = function() { console.log("Castle built"); };
var Winterfell = function() {};

Winterfell.prototype = Object.create(Castle.prototype);
// Winterfell.prototype.constructor = Winterfell;

var winterfell = new Winterfell();
winterfell.build();
```

### 상속 방법 3-1 생성자 매개변수

```javascript
var Castle = function(name) {
    this.name = name;
};
Castle.prototype.build = function() { console.log("Castle built"); };
var Winterfell = function(name, age) {
    Castle.apply(this, arguments);
    this.age = age;
};

Winterfell.prototype = Object.create(Castle.prototype);
Winterfell.prototype.constructor = Winterfell;
Winterfell.prototype.test = function() {
    console.log(this.name, this.age);
}
var winterfell = new Winterfell("hangyeong", 25);
winterfell.test();
```

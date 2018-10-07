# 모듈

## 모듈 단위로

```javascript
Westeros = Westeros || {};
Westeros.Castle = function(name) {
    this.name = name; // constructor
}

Westeros.Castle.prototype.Build = function() {
    console.log("Castle build: " + this.name);
}
```

## 모듈을 계층구조로 구축

```javascript
var Westeros = Westeros || {};
Westeros.Structures = Westeros.Structures || {};
Westeros.Structures.Castle = function(name) {
    this.name = name; // constructor
}
Westeros.Structures.Castle.prototype.Build = function() {
    console.log("Castle build: " + this.name);
}

var winterfell = new Westeros.Structures.Castle("Winterfell");
winterfell.Build();
```

## 즉시 실행 함수

```javascript
var Castle = (function() {
    function Castle(name) {
        this.name = name;
    }

    Castle.prototype.Build = function() {
        console.log("Castle build: " + this.name);
    }

    return Castle;
})();
Westeros.Structures.Castle = Castle;
```

## 상속

```javascript
var BaseStructure = (function() {
    function BaseStructure() {

    }

    return BaseStructure;
})();

Structure.BaseStructure = BaseStructure;

var Castle = (function(_super) {
    __extends(Castle, _super); // 자식, 부모
    function Castle(name) {
        this.name = name;
        _super.call(this);
    }

    Castle.prototype.Build = function() {
        console.log("Castle built: " + this.name);
    }

    return Castle;
})(BaseStructure)
```

![상속](https://user-images.githubusercontent.com/27342882/46578670-67068b80-ca40-11e8-8ab7-99e21eab5e6c.JPG)


```javascript
/**@description 상속
 * @param {Function} d Child
 * @param {Function} b Parent
 */
var __extends = this._extends || function(d, b) {
    /*
        for(var key in obj)를 사용할때 그것은 주어진 객체와 부모 객체의 프로퍼티를
        프로토타입 체인이 끝까지 도달할때까지 반복합니다. 특정 객체의 속성만 확인하려면
        hasOwnProperty를 사용해야한다.
    */
    for(var p in b) { // 1
        if(b.hasOwnProperty(p)) { // 부모의 프로퍼티인 경우에만
            d[p] = b[p]; // 자식에게 전달
        }
    }

    function __() { // 2
        this.constructor = d; // 자식
    }

    __.prototype = b.prototype; // 3
    d.prototype = new __(); // 4
}
```

![상속](https://user-images.githubusercontent.com/27342882/46579064-e480ca80-ca45-11e8-9416-fe44686cfac0.JPG)

## 클래스에서 채택한 클로저 구문으로 전체 모듈 구현

```javascript
var Westeros;
(function(Westeros) {
    (function(Structures) {
        var Castle = (function() {
            function Castle(name) {
                this.name = name;
            }

            Castle.prototype.Build = function() {
                console.log("Castle built " + this.name);
            }

            return Castle;
        })();
        Structures.Castle = Castle;
    })(Westeros.Structures || (Westeros.Structures = {}));
    var Structures = Westeros.Structures;
})(Westeros || (Westeros = {}));
```

## 단일 모듈 내에서 복수의 클래스 정의

```javascript
var Westeros;
(function() {
    (function(Structures) {
        var Castle = (function() {
            function Castle(name) {
                this.name = name;
            }

            Castle.prototype.Build = function() {
                console.log("Castle built: " + this.name);
                var w = new Wall();
            };
            return Castle;
        })();
        Structures.Castle = Castle;

        var Wall = (function() {
            function Wall() {
                console.log("Wall constructed");
            }
            return Wall;
        })();
        Structures.Wall = Wall; // 클로저의 외부에 클래스를 노출한다.
    })(Westeros.Structures || (Westeros.Structures = {}));
    var Structures = Westeros.Structure;
})(Westeros || (Westeros == {}));
```

## ECMAScript 6 클래스와 모듈

자바스크립트 차기 버전에서는 클래스를 쉽게 만들 수 있또록 선택틱 슈가를 지원한다. 이는 기능이나 의미를 변경하지 않고 사람이 이해하기 쉽고 표현하기 쉽게 프로그래밍 언어를 재구성해 놓은 것을 말합니다. 즉, 문법적으로는 새로워보이지만 내부 구현은 사실 **prototype**이다. 그래서 이전 버전에 대한 이해가 반드시 필요하다.

```javascript
class Castle extends Westeros.Structure.BaseStructure {
    constructor(name, alleginece) {
        super(name);
    }

    Build() {
        super.Build();
    }
}
```
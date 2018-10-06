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
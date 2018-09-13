# 이벤트 버블링과 캡쳐링

## 들어가기에 앞서

**HTML**은 트리(tree) 구조로 이루어진다. 주위에서 쉽게 볼 수 있는 **계층도** 형태이며, 부모와 자식 관계가 존재한다. 

![HTML 트리 구조](https://user-images.githubusercontent.com/42409137/44625580-bc328600-a947-11e8-9ac1-ca41ff985182.png)

우리는 기능 구현시 대부분 자바스크립트를 이용하여 **DOM**을 선택하고 해당 요소에 이벤트를 등록한다. 대표적인 이벤트로 마우스 클릭과 키보드 이벤트가 있으며 이벤트의 종류는 다양하다.

## 문제점

자바스크립트로 개발을 하다보면 중첩된 **DOM** 요소에 이벤트를 등록해야하는 경우가 있다.

```html
<div id="outer">
    outer   
    <div id="inner">
        inner
    </div>
</div>
```

```javascript
var outer = document.getElementById("outer"),
inner = document.getElementById("inner");

outer.addEventListener("click", function() {
    console.log("outer");
});

inner.addEventListener("click", function() {
    console.log("inner");
});
```

예를 들면 요소 안에 또 다른 기능을 하는 요소가 있는 경우이다. 실행해보면 알겠지만, **inner** 요소를 클릭하면 **outer** 이벤트도 실행된다. 이것은 우리가 원하는 것이 아니다. 이를 해결하기 전에 이런 **현상**이 무엇인지에 대해서 알아보자.

## addEventListener()

**Dom**에 이벤트를 등록할때 자주 사용되는 메소드는 `addEventListener`이다.

```
target.addEventListener(type, listener[, useCapture]);
```

우리가 주목해야하는 것은 3번째(userCapture)이다. 기본값(defualt)은 `false`이며 해당 경우에는 **이벤트 버블링**으로 작동하고, 그 반대의 경우에는 **이벤트 캡쳐링**으로 작동한다.

## 이벤트 버블링

이벤트 버블링은 특정 화면 요소에서 이벤트가 발생했을 때 해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성을 의미합니다.

![이벤트 버블링](https://user-images.githubusercontent.com/42409137/44627250-5523ca00-a965-11e8-8d1e-a75bbe33410d.JPG)

```html
<div id="outer">
    outer   
    <div id="inner">
        inner
    </div>
</div>
```

```javascript
var outer = document.getElementById("outer"),
inner = document.getElementById("inner");

outer.addEventListener("click", function() {
    console.log("outer");
}, false);

inner.addEventListener("click", function() {
    console.log("inner");
}, false);
```

**inner** 요소를 클릭하면 아래의 결과가 출력된다.

```
inner
outer
```

## 이벤트 캡쳐링

이벤트 캡쳐는 이벤트 버블링과 반대 방향으로 진행되는 이벤트 전파 방식입니다.

![이벤트 캡쳐링](https://user-images.githubusercontent.com/42409137/44627256-6b318a80-a965-11e8-83ac-e25e2b6d2a95.JPG)

```html
<div id="outer">
    outer   
    <div id="inner">
        inner
    </div>
</div>
```

```javascript
var outer = document.getElementById("outer"),
inner = document.getElementById("inner");

outer.addEventListener("click", function() {
    console.log("outer");
}, true);

inner.addEventListener("click", function() {
    console.log("inner");
}, true);
```

**inner** 요소를 클릭하면 아래의 결과가 출력된다.

```
outer
inner
```

## 문제 해결

중첩된 **Dom** 요소에서 **inner**을 클릭하면 이벤트 버블링에 의해서 **outer**까지 이벤트가 전파되는지에 대해서 알아보았습니다. 그렇다면 **inner** 요소를 클릭한 경우, **inner**에 등록된 이벤트만 실행되게 하려면 어떻게 해야할까요?  `event.stopPropagation()`를 사용하면 해당 이벤트가 전파되는 것을 막습니다. 

```html
<div id="outer">
        outer   
        <div id="inner">
            inner
        </div>
    </div>
```

```javascript
var outer = document.getElementById("outer"),
inner = document.getElementById("inner");

outer.addEventListener("click", function(event) {
    event.stopPropagation();
    console.log("outer");
}, false);

inner.addEventListener("click", function(event) {
    event.stopPropagation();
    console.log("inner");
}, false);
```

이제 우리가 원하는대로 이벤트가 발생합니다.

## 주의사항

중첩된 요소에서 이벤트 버블링에 의해 자식요소에서 부모요소까지 이벤트가 전파될 수 있는 이유는 중첩된 모든 요소에 이벤트가 등록되어있기 때문이다. 만약, 중간 요소에 이벤트가 등록되어있지 않다면 전파되지 않는다.

## 응용 - 이벤트 위임(Event Delegation)

지금까지 배운 **이벤트 버블링과 캡쳐링**을 응용한 패턴을 소개합니다. **이벤트 위임**은 하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식입니다.  

### 이벤트 위임을 사용하지 않으면?

이벤트 위임을 본격적으로 살펴보기 전에 **이벤트 위임**을 사용하지 않으면 어떤 불편함이 있는지 알아보겠습니다. 우리는 앞서 버블링과 캡쳐링을 소개하는 예제 코드와 같이 **Dom**에 직접 접근하여 하나 하나 이벤트를 등록하였습니다. 새로운 예제처럼 말이지요.

```html
<div id="wrapper">
  <div id="insert">추가</div>
  <div id="remove">삭제</div>
  <div id="update">수정</div>
</div>
```

```javascript
var insert = document.getElementById("insert"),
remove = document.getElementById("remove"),
update = document.getElementById("insert");

insert.addEventListener("click", function(event) {
    console.log("insert");
}, false);

remove.addEventListener("click", function(event) {
    console.log("remove");
}, false);

update.addEventListener("click", function(event) {
    console.log("update");
}, false);
```

하지만, 이 경우 몇가지 문제점이 있습니다.

1. 매번 새로운 기능을 추가할 때마다 이벤트 등록해야한다.
2. 이벤트 등록된 **Dom**을 삭제하는 경우, 이벤트 등록을 삭제해야 성능에 영향을 미치지 않는다.

물론, 이벤트 등록하는 **Dom** 개수가 많지 않은 경우 하나 하나 이벤트를 등록하는게 더 좋을 수 있습니다. 하지만, 화면에 표시되는 요소의 개수가 많다면 일일이 요소마다 이벤트를 할당하는 것은 성능상의 문제를 발생할 수 있습니다.

### 개선하기

```html
<div id="wrapper">
    <div id="insert">추가</div>
    <div id="remove">삭제</div>
    <div id="update">수정</div>
</div>
```

```javascript
var wrapper = document.getElementById("wrapper")

wrapper.addEventListener("click", function(event) {
    var targetId = event.target.id;

    switch(targetId) {
        case 'insert':
            console.log("insert");
            break;
        case 'remove':
            console.log("remove");
            break;
        case 'update':
            console.log("update");
            break;
        default:
            console.log("default");
    }
}, false);
```

최상위 요소 `#wrapper`로 요소들을 감싸고, `#wrapper`에만 이벤트 등록을 합니다. 이벤트 위임 패턴을 사용하면 앞서 소개한 문제점을 해결할 수 있습니다. **첫번째,** 새로운 기능을 추가하더라도 별도로 이벤트 등록을 하지 않아도 됩니다. **두번째,** 처음부터 각 각의 요소에 이벤트를 등록하지 않았으므로 요소가 삭제되더라도 별도의 이벤트 삭제에 대한 처리를 하지 않아도 됩니다. 

### 이벤트 위임 패턴이 유용한 대표적인 상황

- 다수의 DOM에 한꺼번에 이벤트 리스너를 할당하는 경우
- 동적인 DOM에 이벤트 리스너를 그때 그때 할당하는 경우

## 예제 모음

### 이벤트 리스너를 할당해야하는 DOM 예

```html
<div id="wrapper">
    <div id="row0">
        <div id="cell0000">00,00</div>
        <div id="cell0001">00,01</div>
        <div id="cell0002">00,02</div>
    </div>
    <div id="row1">
        <div id="cell0100">01,00</div>
        <div id="cell0101">01,01</div>
        <div id="cell0102">01,02</div>
    </div>
    <div id="row2">
        <div id="cell0200">02,00</div>
        <div id="cell0201">02,01</div>
        <div id="cell0202">02,02</div>
    </div>
</div>
```

### 이벤트 리스너를 각각 할당하는 예

```javascript
(function() {
    var x, y, cell;
    for(x = 0; x < 3; x++) {
        for(y = 0; y < 3; y++) {
            cell = document.getElementById("cell" + ("0" + x) + ("0" + y));

            cell.onmouseover = function() {
                this.style.backgroundColor = "red";
            };

            cell.onmouseout = function() {
                this.style.backgroundColor = "white";
            };

            cell.onclick = function() {
                console.log(this.innerHTML);
            }
        }
    }
}());
```

### 이벤트 패턴을 활용하는 예

```html
<div id="tableWrapper">
    <div id="row0">
        <div id="cell0000">00,00</div>
        <div id="cell0001">00,01</div>
        <div id="cell0002">00,02</div>
    </div>
    <div id="row1">
        <div id="cell0100">01,00</div>
        <div id="cell0101">01,01</div>
        <div id="cell0102">01,02</div>
    </div>
    <div id="row2">
        <div id="cell0200">02,00</div>
        <div id="cell0201">02,01</div>
        <div id="cell0202">02,02</div>
    </div>
</div>
```

```javascript
(function() {
    var wrapper = document.getElementById("tableWrapper");
 
    wrapper.addEventListener("mouseover", function(event) {
        var target = event.target;

        if(target.id && target.id.indexOf("cell") > -1) {
            target.style.backgroundColor = "red";
        }
    });

    wrapper.addEventListener("mouseout", function(event) {
        var target = event.target;

        if(target.id && target.id.indexOf("cell") > -1) {
            target.style.backgroundColor = "white";
        }
    });

    wrapper.addEventListener("click", function(event) {
        var target = event.target;

        if(target.id && target.id.indexOf("cell") > -1) {
            console.log(target.innerHTML);
        }
    });
}());
```

### DOM의 id에 따라 이벤트 처리 분기

```html
<video style="width: 480px;" id="videoBunny" src="http://media.w3.org/2010/05/bunny/movie.ogv"></video>
<div id="controlPanel">
    <button id="play">Play</button>
    <button id="pause">Pause</button>
</div>
```

```javascript
(function() {
    var videoBunny = document.getElementById("videoBunny"),
    controlPanel = document.getElementById("controlPanel");

    controlPanel.addEventListener("click", function(e) {
        var target = e.target || e.srcElement;

        if(target.id === "play") {
            videoBunny.play();
        } else if(target.id === "pause") {
            videoBunny.pause();
        }

        e.stopPropagation();
    }, true);
}());
```
## 참고한 문서

- [이벤트 버블링, 이벤트 캡처 그리고 이벤트 위임까지](https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/)
- [이벤트 전파](https://opentutorials.org/course/1375/6768)
- [속깊은 자바스크립트](https://book.naver.com/bookdb/book_detail.nhn?bid=11282182)
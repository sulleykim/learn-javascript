# MVC 패턴

Model-View-Controller의 약자로 어플리케이션을 세가지의 역할로 구분한 개발 방법론이다. 이 아키텍처 패턴을 효과적으로 사용하면 사용자 인터페이스로부터 비즈니스 로직을 분리하여 어플리케이션의 시각적 요소와 그 이면에서 실행되는 비즈니스 로직을 서로 영향 없이 수정 및 유지보수할 수 있다는 장점이 있다.

## 자바스크립트의 MVC 패턴은 적합한가?

## 예제들 구현하면서 내 생각 정리하기

- Model
    웹 애플리케이션 상태가 들어가있고 상태를 변경하는 로직이 포함되어있다.
- View
    웹 애플리케이션 상태를 받아서 view에 바인딩하는 역할을 한다.
- Controller
    Model과 View를 연결하는 매개체 역할을 한다. 내 생각에는 여기에서 검증(오류, 비지니스)을 하는게 맞는 듯하다.

## 새로 알게 된 것

- [addeventlistener handleEvent](https://www.thecssninja.com/javascript/handleevent)

```html
<html>
    <head>
        <title>handleEvent</title>
    </head>
    <body>
        <h1 id="touch">Click Me!</h1>
        <script>
            var obj = {
                this.name = "eventHandle";
                this.handleEvent = function() {
                    console.log(this.name);
                }
            };

            document.getElementById("touch").addEventListener("click", obj);
        </script>
    </body>
</html>
```

```javascript
var obj  =  {
    init: function() {
        document.getElementById("btn").addEventListener("click", this, false);
        document.getElementById("btn").addEventListener("touchstart", this, false);
    },
    handleEvent: function(e) {
        switch(e.type) {
            case "click":
                this.button();
                break;
            case "touchstart":
                this.button();
                break;
        }
    },
    dude: "holla",
    button: function() {
        alert(this.dude);
    }
};

obj.init();
```


## 참고

- [#JavaScript MVC 모델 연습 - spinbox - Devlog - 티스토리](http://asfirstalways.tistory.com/231)
- [Classic Front End MVC with Vanilla Javascript](https://medium.com/@patrickackerman/classic-front-end-mvc-with-vanilla-javascript-7eee550bc702)
- [Javascript Model-View-Controller example](https://agilewarrior.wordpress.com/2011/10/26/javascript-model-view-controller-example/)

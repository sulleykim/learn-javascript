# Javascript의 MVC

## 구성

- Model
    애플리케이션 상태를 저장
- View
    클라이언트에 모델을 렌더링
- Controller
    사용자 동작에 반응하여 **모델을 업데이트**

## MVC 구현을 위한 알림 패턴(Publish-Subscribe)

```javascript
var EventEmitter = (function() {
    function EventEmitter() {
        this._events = {};
    }
    
    EventEmitter.prototype = (function() {

        return {
            on: function(event, listener) {
                (this._events[event] || this._events[event] = []).push(listener);
                return this;
            },
            emit: function(event, arg) {
                (this._events[event] || []).slice().forEach(function(fn) {
                    fn(arg);
                });
                return this;
            }
        }
    }());
}());
```
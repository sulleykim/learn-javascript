# HTTP 제어 / Ajax

## Ajax

자바스크립트를 사용하여 비동기 HTTP 통신을 하는 기법

### HTTP

웹 브라우저와 웹 서버가 HTML로 작성된 웹 페이지나 동영상, 음성파일등을 주고받기 위한 프로토콜 규약입니다. 이 프로토콜을 SSL로 암호화하여 보안성을 확보한 것을 가리켜 HTTPS라고 합니다.

### HTTP 통신

HTTP에서는 클라이언트가 서버에 요청 메세지를 보내고 이에 따라 서버가 응답 메시지를 반환합니다. HTTP에서는 전송 계층 프로토콜로 TCP를 사용하고 네트워크 계층 프로토콜로 IP를 사용합니다. 이 두 계층을 합쳐서 TCP/IP라는 이름으로 부릅니다.

### 기본적인 처리 흐름

1. `XMLHttpRequest` 객체 생성
2. 서버와 통신할 때 사용할 처리 방법 등록
3. 요청 전송하고 통신 시작

```javascript
window.onload = function() {

    // XMLHttpRequest 객체 생성
    var req = new XMLHttpRequest();

    // 서버와 통신할 때 사용할 처리 방법 등록
    req.onreadystatechange = function() {
        if(req.readyState == 4) {
            if(req.status == 200) {
                document.getElementById("view").innerHTML = req.responseText;
            }
        }
    }

    // 요청 전송하고 통신 시작
    req.open("GET", "data.txt");
    req.send(null);
}
```

통신 상태가 바뀌면 `readyState` 프로퍼티 값이 바뀝니다. 그러면 웹 브라우저가 값 변화를 감지하여 readystatechange 이벤트를 발생시킵니다.

| 값 | 설명                                                               |
|:--:|:-----------------------------------------------------------------:|
| 0  | 초기화되지 않음 (open 메서드가 호출된 상태가 아니다)                   |
| 1  | 로드 중 (open 메서드 호출되었지만 send 메서드 호출되지 않음)            |
| 2  | 로드 완료 (send 메서드 호출되었지만 응답돌아오지 않음)                  |
| 3  | 응답 수신중 (응답 행과 헤더 가져왔지만 메시지 본문 가져오지 않음)        |
| 4  | 수신완료 (모든 응답 가져옴!)                                          |

```javascript
window.onload = function() {
    var req = new XMLHttpRequest();

    console.log("A: readyState = " + req.readyState); // 0
    req.onreadystatechange = function() {
        onsole.log("B: readyState = " + req.readyState);
    }

    req.open("GET", "data.txt");
    req.send(null);
}
```

```javascript
req.onreadystatechange = function() { // readyState 프로퍼티 값이 바뀌면 실행(0, 1, 2, 3, 4)
    if(req.readyState == 4) { // 응답을 모두 수신
        if(req.status == 200) { // 서버가 요청을 성공적으로 처리
            document.getElementById("view").innerHTML = req.responseText;
        }
    }
}
```

### 크로스 오리진 통신

**XMLHttpRequest**는 동일 출처 정책을 준수하기 때문에, 크로스 오리진 통신을 할수 없다. 단 다음 기법을 사용하면 가능하다.

- JSONP
- CORS
- postMessage

#### JSONP

**script 요소의 src 속성이 가리키는 자바스크립트 파일은 다른 도메인에 위치해도 읽을 수 있다**라는 성질을 이용한 기법

#### CORS

**XMLHttpRequest** Level 1에서는 크로스 오리진 통신이 금지되어있지만 **XMLHttpRequest** Level 2부터는 제한적으로 허용합니다.
**데이터를 가져오는 대상이 악의적인 웹사이트라면 읽기와 쓰기를 금지해야하지만 그 상대를 신뢰할 수 있다면 데이터의 읽기와 쓰기를 허용하자**는 생각에서 출발했습니다. 서버의 데이터를 다른 웹 사이트에서도 읽을 수 있게 하려면 서버 응답에 `Access-Control-Allow-Origin'이라는 HTTP 헤더를 추가해야한다.
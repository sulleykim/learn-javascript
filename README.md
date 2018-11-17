# 자바스크립트 핵심 배우기

> 질문의 답변을 스스로 찾아보아요!

## 목차

- 프론트엔드 면접 질문

    - 자바스크립트 개념
        - null과 undefined의 차이는 무엇인가요?
        - 클로저는 무엇인가요?
        - 호이스팅은 무엇인가요?
        - 이벤트 버블링과 캡쳐링은 무엇인가요?
        - 이벤트 위임 패턴은 무엇인가요?
        - 이벤트 구독 및 전파 패턴에 대해서 설명하세요
        - 콜스택과 이벤트 큐의 상호 작용에 대해서 설명하세요
        - 자바스크립트 this에 대해서 설명하세요
        - 프로토타입에 대해서 설명하세요
        - 상속에 대해서 설명하세요
        - 실행 컨텍스트의 실행 단계에 대해서 설명하세요
        - 콜백 함수는 무엇인가요?
        - `apply()`와 `call()`의 차이는 무엇인가요?
        - `==` 연산자와 `===` 연산자의 차이는 무엇인가요?
        - delete 연산자는 무엇인가요?
        - 자바스크립트 성능 향상에 대해서 설명하세요.
            - reflow와 repaint
        - 함수를 구현하세요

            ```javascript
            function add() {
                // hint 클로저 활용
            }

            add(4)(3) // 7
            ```
        - 알고 있는 디자인 패턴에 대해서 설명하세요 (ex. MVC, MVP, MVVM, FLEX)
        - 체이닝 패턴은 무엇이고 장, 단점에 대해서 설명하세요

    - 알고리즘 및 기타
        - 알고 있는 정렬 알고리즘을 설명하세요
        - Single Page Application(Spa)는 무엇인가요?
        - 서버 사이드 렌더링은 무엇인가요?
        - 사용한 자바스크립트 라이브러리 및 프레임워크는 무엇인가요?
        - 상태 관리의 필요성에 대해서 설명하세요
        - 테스트 코드를 작성한 경험이 있나요?
        - 학습은 어떻게 진행하세요?
        - 최근에 만들고 있는 프로젝트가 있나요?
        - 데이터베이스 사용 경험이 있나요?
        - 크로스 브라우징 경험이 있나요?
        - 크로스 도메인 이슈를 설명하고 해결 경험을 알려주세요.

    - CSS
        - Float 해체 방법에 대해서 설명하세요.
        - 전처리기(SCSS)의 장, 단점은 무엇인가요?

- 핵심 개념
    - [자바스크립트에 대하여](/core/about-javascript.md)
    - [변수](/core/variable.md)
    - [함수](/core/function.md)
    - [closure](/core/closure/README.md)
    - [콜백 함수에 대하여](/core/callback/README.md)
    - [이벤트 버블링과 캡쳐링와 이벤트 위임](/core/event_bubble_capture.md)
    - [Promise](/core/promise/README.md)

- 새로운 자바스크립트(ES6 ~)
    - [new Proxy](/es6/proxy/README.md)
    
- 성능
    - [Reflow와 Repaint](/core/performance/ReflowRepaint.md)

- 도구
    - [jshint](/tools/jshint/README.md)
    - [webpack](/tools/webpack/README.md)
    - [Test](/tools/test/README.md)
        - [jasmine](/tools/test/jasmine/README.md)
        - [Karma와 webpack, Typescript로 테스트 개발 환경 구축하기](/tools/test/karma/webpackTsDev/README.md)

- 패턴
    - [pub/sub pattern](/pattern/pubsub/README.md)
    - [mvc pattern](/pattern/mvc/README.md)

- 기타
    - [실시간 웹 애플리케이션](/etc/realtime/README.md)
    - [실시간 플랫폼 성능 향상](/etc/performance/README.md)
    - [싱글 페이지 애플리케이션](/etc/spa/README.md)
    - [MongoDB](/etc/database/mongodb/README.md)
    - [상태 패턴](/etc/store/README.md)

- 알고리즘
    - [기본 알고리즘](/algorithmus/basic.md)
    - [기본 알고리즘](/algorithmus/basic_algorithmus.md)
    - [검색](/algorithmus/search.md)
    - [스택](/algorithmus/stack/README.md)
    - [큐](/algorithmus/queue/README.md)
    - [재귀 함수](/algorithmus/recursive/README.md)
    - [정렬](/algorithmus/sorting/README.md)
        - [버블](/algorithmus/sorting/bubble/README.md)
        - [선택](/algorithmus/sorting/selection/README.md)
        - [삽입](/algorithmus/sorting/insertion/README.md)
        - [합병](/algorithmus/sorting/merge/README.md)
        - [힙](/algorithmus/sorting/heap/README.md)
        - [쉘](/algorithmus/sorting/shell/README.md)
        - [퀵](/algorithmus/sorting/quick/README.md)
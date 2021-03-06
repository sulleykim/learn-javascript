# 자바스크립트 테스트

인턴쉽을 하면서 가장 어려운 것은 **테스트코드**를 작성하는 일이다. 사실 테스트 코드를 작성하지 않더라도 **클래스, 함수**를 만들고 실제 사용하면서 **개발자**는 많은 실험과 반복을 통해서 정상적으로 작동하는가를 확인한다. 그래서 나는 이 과정 자체가 테스트라고 생각하며 별도의 **테스트 코드**를 작성하는게 생산적인 일인가? 에 대한 의문을 가지고 있다. 그럼에도 불구하고 저명한 오픈소스나 프로덕션(production) 제품에 테스트 코드를 작성하는 것을 보아하니 내가 모르는 중요한 이유가 있을 듯하다. 테스트에 대해서 알아보고 적용해보자.

> 버그가 없는 완벽한 소프트웨어는 없다. 단지 버그를 찾지 못할뿐

## 테스트의 한계

**테스트의 한계**라고 적었지만 정확히 말하면 **자가 테스트의 한계**라고 표현하고 싶다. 소프트웨어를 작성하다보면 어느 순간 자신이 작성하고 있는 소스코드가 완벽(?)하다는 착각에 빠지곤 한다. 이는 매우 위험한 생각이며 테스트 코드 작성시 주의해야한다. 이유는 제 3자가 아닌 개발자가 직접 테스트를 수행하는 것은 객관적인 테스팅이 어렵기 때문에 결함 발견율도 낮아지기 때문이다. 개발자는 **자기가 알고 있는 한정된 시나리오**상에서만 테스트를 하기 때문에 다른 문제를 발견하기 어렵다. 그래서 개발자는 코드 작성시 자신의 생각에 너무 매몰되어서는 안된다고 생각한다. 그리고 우리의 소프트웨어를 활용하는 사용자는 우리가 원하는 방식대로 소프트웨어를 사용해주지 않는다. 예상치 못한 행동에 의해 소프트웨어가 영향을 받는다면 매우 치명적일 것이다.

## 테스트의 필요성

- 생명권과 재산권 보호(가장 중요)
- 고객 신뢰도

## 테스트의 종류

- TDD(테스트 자체에 집중)

    TDD(Test Driven Development)는 Test를 통과하는 코드를 작성하자라는 모토로 개발을 진행하는 소프트웨어 개발 방법 중 하나입니다. 간단히 설명하면 구현해야할 기능 Test를 통과하는 코드를 간단하게 작성한 후, 그 코드를 표준에 맞는 좋은 코드로 변환(리펙토링)을 하는 방법입니다. 프로세스를 요약해본다면 아래와 같습니다.

- BDD(비지니스 요구사항 집중)

    행동 주도 개발(Behavior Driven Development, 이하 BDD)이란 TDD(Test Driven Development)에 DDD(Domain Driven Design)의 스타일(유비쿼터스 언어, 임베디드 도메인 전용 언어 등)을 적용하여 탄생한 소프트웨어 개발 방법의 하나이다.

## 자바스크립트 테스트 도구

- [jasmine](/jasmine/README.md)

## 참고 자료

- [자스민으로 프론트엔드 테스트 코드 작성하기](http://blog.jeonghwan.net/tool/2017/03/28/jasmine.html)
- [BDD](http://www.zdnet.co.kr/news/news_view.asp?artice_id=00000039170216)
- [내맘대로 정리해보는 BDD, TDD](http://blog.ngenius.kr/2017/01/21/report-BDD-TDD-by-mystyle.html)
- [BDD](https://blog.nuti.pe.kr/2018/07/14/bdd/)
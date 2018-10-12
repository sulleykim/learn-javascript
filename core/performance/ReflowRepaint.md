# 자바스크립트 성능

CSS를 이용한 복잡한 페이지 디자인가 js를 이용한 동적 변화가 매우 다양하게 이용되고 있는 상황에서 이에 따른 속도저하등의 문제점이 발생하고 있다. 이를 원천적으로 해결할 수는 없으나 줄이는 방법에 대해 알아본다.

## Reflow와 Repaint

브라우저 렌더링 과정을 포함하여 Reflow와 Repaint, 그리고 렌더링 성능 개선을 위한 DOM 조작 전략을 설명한다.

### Reflow 개념

리플로우는 문서 내 요소의 위치와 도형을 다시 계산하기 위한 웹브라우저 프로세스의 이름으로, 문서의 일부 또는 전체를 다시 렌더링하는 데 사용됩니다. 리플로우는 브라우저에서 사용자를 차단하는 작업이므로, 개발자가 리플로우 시간을 향상하는 방법을 이해하고 리플로우 시간에 다양한 문서 속성의 효과(DOM 깊이, CSS 규칙 효율성, 다양한 스타일 유형 변경)를 이해하는 데 유용합니다. 간혹 문서에 있는 단일 요소를 리플로우하려면 상위 요소 및 이어지는 모든 요소도 리플로우해야 할 수 있습니다.

#### Reflow 발생

- 윈도우 리사이징
- 폰트의 변화
- 스타일 추가, 제거
- 내용 변화
- 클래스 동적 변화
- js를 통한 dom 동적 변화
- 엘리먼트에 대한 offsetWidth / offsetHeight 계산
- 스타일 속성 변화

#### Reflow 가이드 라인

1. 불필요한 DOM 깊이를 줄입니다. DOM 트리의 수준 하나를 변경하면 트리의 모든 수준, 즉 위로는 루트, 아래로는 수정된 노드의 하위 요소에 이르기까지 모두 변경될 수 있습니다. 이에 따라 리플로우를 실행하는 데 더 많은 시간이 걸리게 됩니다.
2. CSS 규칙을 최소화하고 사용되지 않는 CSS 규칙을 삭제합니다.
3. 애니메이션과 같이 복잡한 렌더링을 변경하는 경우 흐름 밖에서 변경합니다. 변경할 때는 절대 위치나 고정 위치를 사용합니다.
4. 불필요하고 복잡한 CSS 선택기, 특히 하위 요소 선택기는 사용하지 않습니다. 이 경우 선택기를 일치시키기 위해 더 높은 CPU 처리량이 필요합니다.

#### Reflow 영향 최소화

1. 클래스 변화에 따른 스타일 변화를 원할 경우, 최대한 DOM 구조 상 끝단에 위치한 노드에 주어라

    깊은 요소를 가지는 경우, 부모 요소에 클래스를 변경하는 경우 자식 요소 모두가 계산되어야할 수 도 있음. 그러므로, 가장 아래에 있는 요소에 클래스 변경

2. 인라인 스타일을 최대한 배제하라.

    인라인은 페이지 전체에 걸쳐 수차례 발생하게 된다. 외부 스타일은 한번만 발생

3. 애니메이션이 들어간 엘리먼트는 가급적 **position:fixed 또는 position:absolute**로 지정

    일반적으로 js로 구현한 애니메이션은 초 단위로 요소 위치를 변경하여 reflow를 발생시킨다.  이러한 경우에 해당 개체의 position 속성을 fixed 또는 absoute로 주게 되면 다른 요소들의 레이아웃에 영향을 끼치지 않으므로 페이지 전체의 Reflow 대신 해당 애니메이션요소의 Repaint만을 유발한다. 이것은 비용적인 측면에서 매우 효율적인 방법이다.

4. 테이블 레이아웃은 피하라.
    테이블로 구성된 페이지 레이아웃은 점진적(progressive) 페이지렌더링이 적용되지 않으며, 모두 로드되고 계산된 후에야 화면에 뿌려진다. **점진적 페이지 렌더링**은 요소가 화면에 표시되는 단계를 의미하는데, 단계가 동기적으로 이루어지는게 아니고 비동기적으로 이루어지게 되는데. 테이블은 동기적으로 이루어지므로 성능이 나빠질 요소가 있다고 한다.

5. IE의 경우, CSS에서의 JS표현식을 피하라. (그대로 첨부)

    소개된지 오래된 규칙이지만 매우 효과적인 규칙이다. 이 CSS 표현식의 비용이 매우 높은 이유는, 문서 전체 또는 문서중 일부가 Reflow될때마다 표현식이 다시계산되기 때문이다. 이는 결국.. 애니메이션과 같은 변화에 의해 리플로우가 발생했을 때, 경우에 따라 1초당 수천, 수만번의 표현식 계산이 진행될 수 있다는 것을 의미한다. 때문에 CSS표현식은 반드시 피해야한다.

6. JS를 통해 스타일변화를 주어야 할 경우, 가급적 한번에 처리하라

    특정 요소에 스타일 변화를 주어야 할 경우 다음과 같이 시도

    ```javascript
    var toChange = document.getElementById("element");
    toChange.style.background = '#333';
    toChange.style.color = '#fff';
    toChange.style.border = '1px solid #ccc';
    ```
    이러한 접근은 여러번 중복된 Reflow와 Repaint를 유발시킨다. 때문에 위와 같은 방법보다는 다음과 같은 방법으로, 단 한번의 변화만을 발생시키는 것이 더욱 효과적이다.

    ```css
    /* CSS */
    #elem { border:1px solid #000; color:#000; background:#ddd; }
    .highlight { border-color:#00f; color:#fff; background:#333; }
    ```

    ```javascript
    /* js */
    document.getElementById('elem').className = 'highlight';
    ```

7. CSS 하위선택자는 필요한 만큼만 정리하라.

    설렉터 검색을 최소화하는 노력 필요

#### reflow가 발생하는 속성(참고)

- width	
- height
- padding	
- margin
- display	
- border-width
- border	
- top
- position	
- font-size
- float	
- text-align
- overflow-y	
- font-weight
- overflow	
- left
- font-family	
- line-height
- vertical-align	
- right
- clear	
- white-space
- bottom	
- min-height

살펴보니 대부분 사용 빈도가 높은 속성들이 reflow를 요발한다.

### Repaint

엘리먼트의 스킨에 변화가 발생하지만, 레이아웃에는 영향을 미치지 않을 때 유발된다. (visibility, outline, background-color 등이
포함) Opera에 따르면 Repaint는 해당 행위가 발생하는 순간, 문서내 DOM tree의 다른 노드들의 스킨까지도 검증해야 하므로 비용이 높다고
함.


#### repaint가 발생하는 속성(참고)

- color	
- border-style
- visibility	
- background
- text-decoration	
- background-image
- background-position	
- background-repeat
- outline-color	
- outline
- outline-style	
- border-radius
- outline-width	
- box-shadow
- background-size

## 참고

- [성능 개선](http://lists.w3.org/Archives/Public/public-html-ig-ko/2011Sep/att-0030/Reflow_____________________________Tip.pdf)
- [CSS 애니메이션 성능 개선](http://wit.nts-corp.com/2017/06/05/4571)
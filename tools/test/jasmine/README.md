# JasmineJS 시작하기

Jasmine은 테스트 프로세스를 처리하는 JavaScript 개발자에게 가장 인기있는 도구 중 하나입니다. 그것은 오픈 소스 기술입니다. JavaScript의 여러 구성 요소를 테스트하는 간단한 API입니다. 이 튜토리얼에서는 Jasmine.js의 기본 기능과 함께 이해하기 쉬운 예제를 설명합니다.

## 개요

Jasmine은 모든 종류의 JavaScript 애플리케이션을 테스트 할 수 있는 오픈 소스 JavaScript 프레임 워크입니다. Jasmine은 BDD (Behavior Driven Development) 절차에 따라 JavaScript 문장의 각 행이 제대로 테스트되는지 확인합니다. BDD 절차를 따르면 Jasmine은 전체 응용 프로그램을 테스트하는 대신 전체 응용 프로그램의 최소 단위를 테스트하는 작은 구문을 제공합니다.

## 사용 이유

- Jasmine은 다른 JavaScript 프레임 워크에 의존하지 않습니다.
- Jasmine은 DOM이 필요하지 않습니다.
- Jasmine 프레임 워크에서 사용되는 모든 구문은 깨끗하고 분명합니다.
- Jasmine은 오픈 소스 프레임 워크이며 독립형, 루비 보석, Node.js 등과 같은 다른 버전에서 쉽게 사용할 수 있습니다.

## 환경 설정

1. [여기 접속](https://github.com/jasmine/jasmine/releases)
2. `jasmine-standalone-x.x.x.zip` 설치 및 압축 풀기

## BDD(Behavioral Driven Development)에 대하여

1. 시작

    이 단계에서는 Jasmine 응용 프로그램을 사용할 수 있도록 환경을 준비합니다.

2. 실패한 테스트 작성

    이 단계에서는 처음으로 테스트 케이스를 작성합니다. 테스트 할 파일이나 기능이 없기 때문에이 테스트가 실패 할 것입니다.

3. 통과하도록 코드 작성

    이 단계에서는 테스트해야 할 JavaScript 파일 또는 함수를 준비합니다. 이 단계는 우리가 초기 단계에서 준비한 모든 테스트 케이스가 성공적 일 것임을 확신 할 때 필요합니다.

4. 리팩터링

    리팩토링은 BDD 모델에서 매우 중요한 단계이며 특정 응용 프로그램 또는 기능에 대해 가능한 많은 테스트 사례를 준비해야합니다.

5. 중지

    모든 것이 잘 진행되면 응용 프로그램을 준비해야합니다. 따라서이 단계를 BDD 응용 프로그램의 끝으로 간주 할 수 있습니다.

## Jasmine 동작 원리

![bdd](https://user-images.githubusercontent.com/27342882/48656847-079f9080-ea6e-11e8-9f97-139af88b4aac.JPG)

## 기본 예제 소스

```javascript
// Player.js
function Player() {
}

Player.prototype.play = function(song) {
    this.currentlyPlayingSong = song;
    this.isPlaying = true;
};

Player.prototype.pause = function() {
    this.isPlaying = false;
};

Player.prototype.resume = function() {
    if (this.isPlaying) {
        throw new Error("song is already playing");
    }

    this.isPlaying = true;
};

Player.prototype.makeFavorite = function() {
    this.currentlyPlayingSong.persistFavoriteStatus(true);
};
```

```javascript
// Song.js
function Song() {
}

Song.prototype.persistFavoriteStatus = function(value) {
    // something complicated
    throw new Error("not yet implemented");
};
```

```javascript
// SpecHelper.js
beforeEach(function () {
    jasmine.addMatchers({
        toBePlaying: function () {
            return {
            compare: function (actual, expected) {
                var player = actual;

                return {
                    pass: player.currentlyPlayingSong === expected && player.isPlaying
                };
            }
            };
        }
    });
});
```

```javascript
describe("Player", function() {
    var player;
    var song;

    beforeEach(function() {
        player = new Player();
        song = new Song();
    });

    it("should be able to play a Song", function() {
        player.play(song);
        
        // play.currentlyPlayingSong와 song이 동일한가?
        expect(player.currentlyPlayingSong).toEqual(song);

        //demonstrates use of custom matcher
        expect(player).toBePlaying(song);
    });

    describe("when song has been paused", function() {
        beforeEach(function() {
            player.play(song);
            player.pause();
        });

        it("should indicate that the song is currently paused", function() {
            // player.isPlaying값이 false인가?
            expect(player.isPlaying).toBeFalsy();

            // demonstrates use of 'not' with a custom matcher
            expect(player).not.toBePlaying(song);
        });

        it("should be possible to resume", function() {
            player.resume();
            expect(player.isPlaying).toBeTruthy();
            expect(player.currentlyPlayingSong).toEqual(song);
        });
    });

    // demonstrates use of spies to intercept and test method calls
    it("tells the current song if the user has made it a favorite", function() {
        spyOn(song, 'persistFavoriteStatus');

        player.play(song);
        player.makeFavorite();

        expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
    });

    //demonstrates use of expected exceptions
    describe("#resume", function() {
        it("should throw an exception if song is already playing", function() {
            player.play(song);

            expect(function() {
                player.resume();
            }).toThrowError("song is already playing");
        });
    });
});
```

## Matchers

Jasmine은 테스트 프레임 워크이므로 항상 JavaScript 파일 또는 함수의 결과를 예상 결과와 비교하는 것을 목표로합니다. Matcher는 Jasmine 프레임 워크에서 유사하게 작동합니다. Matchers는 실제 출력과 예상 출력 간의 부울 비교를 수행하는 JavaScript 함수입니다. 내장된 matcher 와 사용자 정의 matchers 의 두 종류의 matcher가 있습니다.

- 내장된 matcher

    ```javascript
    describe("Adding single number ", function (){  
        //example of toEqual() matcher    
        it("should add numbers",function(){ 
            expect(nested.add(5)).toEqual(5); 
            expect(nested.add(5)).toEqual(10); 
        });   
        
        it("should add numbers",function(){ 
            expect(nested.addAny(1,2,3)).toEqual(6); 
        });     
    }
    ```
- 사용자 정의 matcher

    ```javascript
    describe("This custom matcher example", function() {
        beforeEach(function() {
            jasmine.addMatchers ({
                validateAge: function() {
                    return {
                        compare: function(actual, expected) {
                            var result = {};
                            result.pass = (actual >= 13 && actual <= 19);
                            result.message = 'sorry u are not a teen';
                            return result;
                        }
                    };
                }
            });
        });

        it('Lets see whether u are teen or not', function() { 
            var myAge = 14; 
            expect(myAge).validateAge();         
        });   
            
        it('Lets see whether u are teen or not ', function() { 
            var yourAge = 18;
            expect(yourAge).validateAge();  
        }); 
    });
    ```

## 블록 건너 뛰기

```javascript
xdescribe('This custom matcher example ', function() { 
   
    beforeEach(function() { 
        // We should add custom matched in beforeEach() function. 
        
        jasmine.addMatchers({ 
            validateAge: function() { 
                return { 
                compare: function(actual,expected) { 
                    var result = {}; 
                    result.pass = (actual > = 13 && actual < = 19); 
                    result.message = 'sorry u are not a teen ';  
                    return result; 
                }  
                };   
            }    
        });    
    });  
    
    xit('Lets see whether u are teen or not', function() { 
        var myAge = 14; 
        expect(myAge).validateAge();  
    });
   
    xxit('Lets see whether u are teen or not ', function() {  
        //Skipping this Spec 
        var yourAge = 18; 
    }); 

});
```

## `toEqual()`

`toEqual()`은 Jasmine의 내장 라이브러리에있는 가장 간단한 일치 프로그램입니다. 이 메소드의 인수로 주어진 연산 결과가 결과와 일치하는지 여부와 일치합니다.

> 자바스크립트 `==` 연산자

```javascript
// ExpectExam.js
window.expectexam = {
    currentVal: 0
}
```

```javascript
// ExpectSpec.js
describe("Different Methods of Expect Block",function (){ 
    it("The Example of toEqual() method",function (){    
        expect(expectexam.currentVal).toEqual(0);  
    });
});
```

## `toBe()`

toBe () 매처는 toEqual () 과 비슷한 방식으로 작동하지만 기술적으로 서로 다릅니다. toBe () 매처는 객체의 유형과 일치하지만 toEqual () 은 결과의 동등성과 일치합니다.

> 자바스크립트 `===` 연산자

```javascript
// ExpectExam.js
window.expectexam = {  
   currentVal: 0, 
   name:"tutorialspoint", 
   name1:"tutorialspoint"  
};
```

```javascript
// ExpectSpec.js
describe("Different Methods of Expect Block",function (){  

    it("The Example of toBe() method",function (){ 
        expect(expectexam.name).toBe(expectexam.name1);     
    });   
});
```

## `toBeTruthy()`

```javascript
describe("Different Methods of Expect Block",function (){  
    var boolean = true;
    it("The Example of toBeTruthy() method",function (){   
        expect(boolean).toBeTruthy();    
    });  
}); 
```

## `toFeFalsy()`

```javascript
describe("Different Methods of Expect Block",function (){  
    var boolean = false;
    it("The Example of toBeTruthy() method",function (){   
        expect(boolean).toBeFalsy();    
    });  
}); 
```

## `toContain()`

toContain () matcher는 요소가 같은 배열 또는 다른 순차 객체의 일부인지 여부를 확인하는 기능을 제공합니다. 

```javascript
describe("Different Methods of Expect Block",function (){  
    it("The  Example of toContain() method",function (){ 
        expect([1,2, 3, 4]).toContain(3);
    }); 
}); 
```

## 예외 확인

Jasmine은 다른 계산 matchers와 별개로 프로그램의 예외를 확인하는 유용한 matchers를 제공합니다. 

```javascript
var throwMeAnError = function() {   
   throw new Error(); 
};  

describe("Different Methods of Expect Block", function() {  
    var exp = 25; 
    it ("Hey this will throw an Error ", function() { 
        expect(throwMeAnError).toThrow(); 
    }); 
});
```

## `beforeEach()`

Jasmine의 또 다른 주목할만한 특징은 각 기능의 전후입니다. 이 두 가지 기능을 사용하여 각 사양을 실행하기 전후에 일부 코드를 실행할 수 있습니다. 이 기능은 응용 프로그램에서 공통 코드를 실행하는 데 매우 유용합니다.

```javascript
var currentVal = 0; 

beforeEach(function(){ 
    currentVal = 5; 
});  

describe("Different Methods of Expect Block",function(){ 
   
    it("after each function ", function(){
        expect(currentVal).toEqual(5);     
    }); 

});
```

## `afterEach()`

```javascript
var currentVal = 0; 

afterEach(function(){ 
    currentVal = 5;  
});  

describe("Different Methods of Expect Block",function() { 
   
    it("first call ", function(){ 
        expect(currentVal).toEqual(0);     
    });     
    
    it("second call ",  function() { 
        expect(currentVal).toEqual(5);     
    });   

});
```

## `Spy()`

Jasmine spy는 이름에서와 똑같은 또 다른 기능입니다. 그것은 당신이 당신의 어플리케이션 함수 호출을 감시하도록 허락 할 것입니다. Jasmine에는 두 가지 유형의 훔쳐보기 기술이 있습니다. 첫 번째 방법은 spyOn () 을 사용하여 구현할 수 있으며 두 번째 방법은 createSpy ()를 사용하여 구현할 수 있습니다 . 이 장에서는 이러한 두 가지 방법론에 대해 자세히 설명합니다.

### `spyOn()`

```javascript
// SpyJasmine
var Person = function() {};
Person.prototype.sayHelloWorld = function(dict) {
    return dict.hello() + " " + dict.world();
};

var Dictionary = function() {}; 

Dictionary.prototype.hello = function() { 
    return "hello"; 
}; 
    
Dictionary.prototype.world = function() { 
    return "world"; 
}; 
```

```javascript
describe("Example Of jasmine Spy using spyOn()", function() { 
  
    it('uses the dictionary to say "hello world"', function() { 
        var dictionary = new Dictionary; 
        var person = new Person; 
            
        spyOn(dictionary, "hello");  // replace hello function with a spy 
        spyOn(dictionary, "world");  // replace world function with another spy 
            
        person.sayHelloWorld(dictionary);
        expect(dictionary.hello).toHaveBeenCalled();  
        // not possible without first spy 
    
        expect(dictionary.world).toHaveBeenCalled();  
        // not possible withoutsecond spy 
    }); 

});
```

### `createSpy()` 이거는 왜 쓰는거지?

```javascript
describe("Example Of jasmine Spy using Create Spy", function() { 
    it("can have a spy function", function() { 
        var person = new Person(); 
        person.getName11 = jasmine.createSpy("Name spy"); 
        person.getName11(); 
        expect(person.getName11).toHaveBeenCalled(); 
    }); 
}); 
```
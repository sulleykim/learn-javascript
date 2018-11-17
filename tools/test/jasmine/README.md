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

## 예제 소스 분석

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
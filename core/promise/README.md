# 프로미스

## 중첩 콜백 함수

```javascript
function sleep(callback) {
    setTimeout(function() {
        callback();
    }, 1000);
}

sleep(function() {
    console.log('A');
    sleep(function() {
        console.log('B');
        sleep(function() {
            console.log('C');
        })
    })
});
```

이 예에서 볼 수 있듯이 콜백 함수를 여러 개 중첩하면 작업 내용을 이해하기 어려워집니다. 이를 **콜백 지옥**이라고 부릅니다. 이런 콜백 지옥을 해결하기 위한 방법중에 하나는 **Promise**를 사용하는 것입니다.

## Promise의 기본

```javascript
var promise = new Promise(function(resolve, reject) {
    // ...
});
```
 
| 키워드    |                                    내용                                      |
|:--------:|:----------------------------------------------------------------------------:|
| resolve  | 함수 안의 처리가 완료되는 경우 호출. 이 값은 다음 처리를 실행하는 함수에 전달된다. |
| reject   | 함수 안의 처리가 실패했을 때 호출                                               |

```javascript
var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log('A');
        resolve();
    }, 1000);
});

promise.then(function() {
    console.log('B');
});
```

```javascript
var hello = function(message) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(message);
        }, 1000);
    })
}

hello("hello world").then(function(message) {
    return message;
}).then(function(message) {
    console.log(message);
});
```

## Promise를 종료시키는 resolve 함수와 then 메서드

`resolve()` 함수는 Promise를 종료시킵니다. `resolve()` 함수에 인수로 넘긴 값은 `then` 메서드에 인수로 넘긴 함수에 전달되어 다음 처리를 위해 사용됩니다.

```javascript
promise.then();
```

```javascript
var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        var name = prompt("이름을 입력하십시오.");
        resolve(name);
    }, 1000);
});

promise.then(function(name) {
    console.log("안녕하세요." + name + "님!");
});
```

## Promise를 실패로 처리하는 reject 함수와 catch 메서드

```javascript
promise.catch();
```

```javascript
var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        var n = parseInt(prompt("10 미만의 숫자를 입력하세요!"));

        if(n <= 10) {
            resolve(n);
        } else {
            reject(`오류 메시지 발생!`);
        }
    });
});

promise.then(function(num) {
    console.log("성공한 경우" + " " + num);
}).catch(function(error) {
    console.log(error)
})
```

## then의 두번째 인수

`then` 메서드에는 두 번째 인수로 실패 콜백 함수를 지정할 수 있습니다.

```javascript
promise.then(Fullfilled, Rejected);
```

```javascript
var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        var n = parseInt(prompt("10 미만의 숫자를 입력하세요!"));

        if(n <= 10) {
            resolve(n);
        } else {
            reject(`오류 메시지 발생!`);
        }
    });
});

promise.then(

    function(num) {
        // success
    },
    function(error) {
        // failure
    }
)
```

## promise가 실행하는 콜백함수에 인수 넘기기

```javascript
var hello = function(message) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(message);
        }, 1000)
    })
}
```

## Promise로 비동기 처리 연결하기

```javascript
function buyAsync(money) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            var payment = parseInt(prompt("지불하고자 하는 금액을 입력하세요!"));
            var balance = money - payment;
            if(balance > 0) {
                console.log(`${payment}원을 지불했습니다.`);
                resolve(balance);
            } else {
                reject(`잔액은 ${balance} 입니다.`);
            }
        }, 1000);
    })
}

buyAsync(500)
    .then(function(balance) {
        console.log(`잔액은 ${balance} 입니다`);
        return buyAsync(balance);
    })
    .then(function(balance) {
        console.log(`잔액은 ${balance} 입니다`);
        return buyAsync(balance);
    })
    .then(function(balance) {
        console.log(`잔액은 ${balance} 입니다`);
        return buyAsync(balance);
    })
    .catch(function(error) {
        console.log(error);
    })
```

## 비동기 처리 여러 개를 병렬로 실행하기

Promise 객체의 all 메서드를 사용하면 비동기 처리 여러 개를 병렬로 실행할 수 있습니다. 그리고 모든 처리가 성공적으로 끝났을 때만 다음 작업을 실행하도록 합니다.

### all 메소드

```javascript
var number = function(num) {
    return new Promise(function(resolve, reject) {
        if(typeof num == 'number') {
            resolve(num);
        } else {
            reject(`숫자가 아닙니다.`);
        }
    })
}

number(3).then(function(num) {
    console.log(num);
}).catch(function(error) {
    console.log(error);
});

number(3).then(function(num) {
    return number(num);
}).then(function(num) {
    console.log(num)
}).catch(function(error) {
    console.log(error);
});

Promise.all([
    number(3),
    number(4),
    number(5)
]).then(function(num) {
    console.log(num); // [3,4,5]
}).catch(function(error) {
    console.log(error);
});

Promise.all([
    number(3),
    number(4),
    number("not number")
]).then(function(num) {
    console.log(num); 
}).catch(function(error) {
    console.log(error); // 숫자가 아닙니다.
});
```

```javascript
function buyAsync(name, mymoney) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            var payment = parseInt(prompt(`${name}님, 지불하고자 하는 금액을 입력하십시오`));
            var balance = mymoney - payment;

            if(balance > 0) {
                console.log(`${name}: ${payment}원을 지불했습니다.`);
                resolve(balance);
            } else {
                reject("잔액이 없어 ㅠㅠ");
            }
        }, 1000);
    })
}

Promise.all([
    buyAsync("Ryu", 500),
    buyAsync("Suzy", 100),
    buyAsync("Han", 200)
]).then(function(balance) {
    console.log(balance);
}).catch(function(error) {
    console.log(error);
});
```

### rece 메서드

가장 먼저 종료한 Promise 객체의 결과만 다음 작업으로 보냅니다.

```javascript
function buyAsync(name, mymoney) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            var payment = parseInt(prompt(`${name}님, 지불하고자 하는 금액을 입력하십시오`));
            var balance = mymoney - payment;

            if(balance > 0) {
                console.log(`${name}: ${payment}원을 지불했습니다.`);
                resolve(balance);
            } else {
                reject("잔액이 없어 ㅠㅠ");
            }
        }, 1000);
    })
}

Promise.race([
    buyAsync("Ryu", 500),
    buyAsync("Suzy", 100),
    buyAsync("Han", 200)
]).then(function(balance) {
    console.log(balance);
}).catch(function(error) {
    console.log(error);
});
```
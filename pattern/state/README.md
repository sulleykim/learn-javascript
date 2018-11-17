# 상태 관리 라이브러리 분석

## [순수 자바스크립트를 이용한 상태 시스템](https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/)

![상태 관리의 원리](https://user-images.githubusercontent.com/27342882/48411881-4ab7e600-e786-11e8-8c66-045ae81d1a18.JPG)

![상태 관리의 원리](https://user-images.githubusercontent.com/27342882/48411884-4c81a980-e786-11e8-897d-2c1c794507e1.JPG)

## Slim-Redux

![redux](https://user-images.githubusercontent.com/27342882/48452051-ab7c0880-e7f0-11e8-8d41-6417970e6c36.png)

### 예시

```javascript
import { createStore } from './redux';

// reducer
function counter(state = 0, action) {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// actions
const increment = () => {
    return {
        type: 'INCREMENT'
    };
}

const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

const store = createStore(counter);

store.subscribe(function() {
    // 상태 변화시 실행
});

store.dispatch(increment());
```

### 분석

```javascript
/*
obj: {
    counter: function() {},
    visible: function() {}
}

fn: (reducer, key) => reducer(state[key], action)
*/
function mapValues(obj, fn) {
    return Object.keys(obj).reduce((result, key) => {
        result[key] = fn(obj[key], key);
        return result;
    }, {});
}

/*
    {
        counter: function(state = 0, action) {
            switch(action.type) {
                case 'INCREMENT':
                    return state + 1;
                case 'DECREMENT':
                    return state - 1;
                default:
                    return state;
            }
        },
        visible: function() {

        }
    }
*/
function pick(obj, fn) {
    // Object.keys(obj) [counter, visible]
    return Object.keys(obj).reduce((result, key) => {
        /*
            입력받은 reduce 함수인가? (typeof function)
            해당 함수는 입력받은 reduce를 확인하는 함수
        */
        if(fn(obj[key])) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

export function combineReducers(reducers) {
    var finalReducers = pick(reducers, (val) => typeof val === 'function');
    return (state = {}, action) => mapValues(finalReducers,
        (reducer, key) => reducer(state[key], action)
    );
}
```
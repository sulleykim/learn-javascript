# Node의 내부

Node의 내부 구조를 알고 있다면 내부 구조 지식을 활용하여 웹 애플리케이션에 좀 더 효율적인 코드로 작성할 수 있을 것입니다.

## 내부 구조에 대한 그림

![내부 구조에 대한 그림](https://user-images.githubusercontent.com/27342882/50594228-05d74280-0edf-11e9-8e8c-0283ef57032a.JPG)

우리는 새로운 주제가 나올 때마다 그림을 다시 살펴보면서 더 자세한 내용을 추가할 것입니다. 일단 **내부 구조**를 살펴봅시다. 매우 간단합니다. 핵심은 `V8`과 `libuv`입니다. Nodejs는 우리가 작성한 **자바스크립트**를 사용하여 컴퓨터 내부의 파일 시스템 관리나 네트워크 프로그래밍을 가능하게 만듭니다. 자바스크립트로 이런 멋진 일이 가능하다니 놀랍지 않습니까? 이런 마법이 가능한 이유는 Nodejs가 자바스크립트 코드를 C++로 매핑했기에 가능합니다. 쉽게 설명하자면 우리가 작성한 자바스크립트 코드는 컴퓨터 자원이 필요한 작업을 하는 경우(네트워크, 서버 구축, 파일 시스템) 이에 해당되는 C++ 코드 일부로 변환되어 실행됩니다.

-   V8

> V8 프로젝트는 Google이 개발 한 오픈 소스 자바 스크립트 엔진입니다.

-   libuv

> libuv 프로젝트는 노드가 운영 체제에 액세스 할 수있게 해주는 C++ 오픈 소스 프로젝트입니다.

![Nodejs는 JS와 C++로 구성](https://user-images.githubusercontent.com/27342882/50594598-92cecb80-0ee0-11e9-80ba-60c96325dcb8.JPG)

해당 그림은 각 구조마다 소스코드의 비중을 의미합니다. 눈에 띄는 것은 `C++`입니다. **Nodejs 플랫폼을 만든 기술적인 이유는 다양합니다.** 하지만 아쉽게도 나는 이에 대한 답변을 현재 시점에서 알지 못합니다. 하지만 Nodejs로 인해서 C++을 모르는 자바스크립트 개발자들이 할 수 있는 마법이 늘어난 것은 확실합니다.

## 내부를 분석해보기

우리는 특정 함수를 하나 선택하고 **오픈소스인 Nodejs**의 소스코드를 살펴볼 것입니다.

### `pbkdf2` 따라가기

1. 노드 표준 라이브러리에서 함수 선택

    ![pbkdf2 Function](https://user-images.githubusercontent.com/27342882/50635021-e4845e00-0f93-11e9-8f5d-ba3213f5970a.JPG)

    [Nodejs Github](https://github.com/nodejs/node)

2. [노드 소스 코드에서 구현 된 위치 찾기](https://github.com/nodejs/node/blob/master/lib/internal/crypto/pbkdf2.js)
    ```
    node/lib/internal/crypto/pbkdf2.js
    ```
3. 이 함수를 구현하기 위해 `V8`과 `libuv`가 어떻게 사용되는지를 살펴보기

### Nodejs 실행 순서

![Nodejs 실행 순서](https://user-images.githubusercontent.com/27342882/50635620-4219aa00-0f96-11e9-8c0a-69d954d71200.JPG)

Nodejs 소스코드에서 `lib` 폴더는 우리가 자주 사용하는 함수의 모음이다. 예를 들어서 `os`에 대한 정보가 필요하다면 `os` 함수를 불러서 사용하면 된다. 그렇다면, 어떻게 자바스크립트 코드로 `os` 정보를 알 수 있을까? 비밀은 `process.binding()`에 있다. 해당 함수는 **자바스크립트 코드와 C++ 코드를 연결한다.** 그리고 `V8`에서 **자바스크립트 코드와 c++의 값을 변환한다.** 변환된 C++ 파일에 내장 함수들은 이미 구현되어있다. `os`에 대한 `C++` 소스코드는 [여기](https://github.com/nodejs/node/blob/master/src/node_os.cc)에서 확인 할 수 있다.

```javascript
var os = require("os");
var cpus = os.cpus();
```

우리가 자바스크립트 소스코드를 작성하고 `Nodejs` 플랫폼에서 실행하면 C++ 함수가 실행되고 결과값을 출력한다. `os.cpus()`는 실행 컴퓨터의 `cpu` 정보를 반환한다. `C++` 소스코드는 아래와 동일하다.

```cpp
static void GetCPUInfo(const FunctionCallbackInfo<Value>& args) {
  Environment* env = Environment::GetCurrent(args);
  Isolate* isolate = env->isolate();

  uv_cpu_info_t* cpu_infos;
  int count;

  int err = uv_cpu_info(&cpu_infos, &count);
  if (err)
    return;

  // It's faster to create an array packed with all the data and
  // assemble them into objects in JS than to call Object::Set() repeatedly
  // The array is in the format
  // [model, speed, (5 entries of cpu_times), model2, speed2, ...]
  std::vector<Local<Value>> result(count * 7);
  for (int i = 0; i < count; i++) {
    uv_cpu_info_t* ci = cpu_infos + i;
    result[i * 7] = OneByteString(isolate, ci->model);
    result[i * 7 + 1] = Number::New(isolate, ci->speed);
    result[i * 7 + 2] = Number::New(isolate, ci->cpu_times.user);
    result[i * 7 + 3] = Number::New(isolate, ci->cpu_times.nice);
    result[i * 7 + 4] = Number::New(isolate, ci->cpu_times.sys);
    result[i * 7 + 5] = Number::New(isolate, ci->cpu_times.idle);
    result[i * 7 + 6] = Number::New(isolate, ci->cpu_times.irq);
  }

  uv_free_cpu_info(cpu_infos, count);
  args.GetReturnValue().Set(Array::New(isolate, result.data(), result.size()));
}
```

### 정리하기

> V8은 javascript 코드를 해석하고 실행하는 데 사용되고 libuv는 파일 시스템 및 동시성의 일부 측면에 액세스하는 데 사용됩니다.

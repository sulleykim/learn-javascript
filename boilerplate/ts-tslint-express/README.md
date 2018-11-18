# Typescript에서 Express.js 개발 할때 할일 정리(TSLint + Prettier)

## 환경 설정

- express.js
- typescript
- tslint + Prettier
- node-ts
- nodemon
- vsode

## TSLint와 Prettier 도입

- `tslint` 
- `prettier` 
- `tslint-config-prettier` TSLint과 Prettier의 중복 처리를 비활성화
- `tslint-plugin-prettier` ESLint 규칙으로 Prettier를 로드

## 소스코드 변경 후 저장시 바로 코드 수정

TSLint 플러그인을 설치하고 설정 "tslint.autoFixOnSave": true을하면 
저장 될 때마다 Lint + Prettier 해줍니다.

1. VSCode [Ctrl + , -> format으로 검색] 
2. Editor: Format On Save 설정하기 [체크 표시]

## ts-node

node는 자바스크립트(js)를 이해할 수 있지만 타입스크립트(ts)를 바로 이해할 
수 없습니다. 그래서 트랜스파일링하여 읽는 방법도 있지만 `node-ts`를 사용하면 별도 트랜스파일링없이 ts파일을 읽어서 실행 할 수 있습니다.

```json
"scripts" :  { 
  "dev" :  "ts-node ./src/index.ts" ,   // 개발 환경에 대한 명령.
}
```

`npm run dev` 명령어로 node 대신 ts-node를 사용하여 src의 ts파일을 직접 읽을 수 있습니다. 
## 참고

- [Typescript에서 Express.js 개발 할때 할일 정리](https://qiita.com/yuukive/items/012bdf1b9ff3881546b3)
# TypeScript Complier

HTML에 TS를 연결할 때, 브라우저는 타입스크립트를 읽을 수 없으므로 컴파일된 자바스크립트 파일을 연결해준다.

---

## TS 파일 실행

```
ts-node 파일이름
```

---

## TS-> JS 컴파일 명령어

```js
tsc 파일이름

tsc 파일이름 -w //변환할 때마다 업데이트 됨
```

---

## tsconfig.json 생성

기본적인 컴파일러 옵션들 생성

```js
tsc --init
```

---

## tsconfig가 있는 프로젝트 폴더 안에서 모든 TS -> JS로 변환

```js
tsc --w
```

---

## 프로젝트 구조

`tsconfig.json`에 `outDir`라는 옵션이 있는데, 여기에 컴파일된 파일들을 어디에 지정할 건지 설정할 수 있다.
설정하지 않는 경우에는 기본적으로 항상 현재 딕렉토리 안에 TS가 있는 곳에서 JS 파일이 생기게 된다.

```js
"outDir": ./build",
```

이후 index.html에서도 파일 연결 경로를 변경해줘야한다.
타입스크립트가 있는 최상위부터 반영되어서 컴파일된 outDir에 나오게된다.

루트 디렉토리에 TS 파일 생성을 원치 않는다면, `tsconfig.json`에 `rootDir`라는 옵션에서 설정할 수 있다.

```js
"rootDir": ./src",
```

어떤 파일만 제외하고 컴파일하고 싶다면, `tsconfig.json`에 `exclude`라는 옵션에서 설정할 수 있다.

```js
"exclude": ["./src/dev.ts"]
```

어떤 파일만 컴파일 하고 싶을 때

```js
"include": ["./src/dev.ts"]
```

---

## 컴파일러 옵션

```js
"incremental": true // 계속 새롭게 컴파일되는게 아닌 이전 컴파일된 파일과 비교해서 비교된 수정된 사항이 없다면 그 부분을 유지하고 수정된 내용만 컴파일한다.
"target": "ES5" // 어떤 버전으로 컴파일
"module": "ES6" // 모듈 정보 어떻게 할껀지
"allowJS": true // TS와 JS 섞어서 사용하면 설정
"checkJS": true // JS 파일에서 잘못하고 있을 때 에러 뜨게 하는 것
"composite": true // 이전에 빌드된 정보들을 기억하고 있어서 다음 빌드할 때 더 빠르게 빌드를 도와줌
"noEmit": true // 컴파일 에러가 있는지 없는지만 확인하고 싶을 때 사용 (컴파일 에러 체크만 함)
```

---

## 디버깅

`tsconfig.json`에 `sourceMap`라는 옵션을 true로 설정해주면 map이라는 파일이 생기는데, 작성한 TS 코드와 컴파일된 JS코드를 연결시켜주는 그런 모든 정보들이 담겨져 있는 파일이다. 그래서 해당 옵션을 설정하게 된다면 작성한 TS에서 어디를 가리키는지를 가지고 있는 파일이다.

```js
"sourceMap": true
```
# Core Types

## Number

```js
let num: number = 20;
```

---

## String

```js
let name: string = 'ck';
let str: string = `My name is ${name}`;
```

---

## Boolean

```js
let isDone: boolean = true;
```

---

## Object

object는 원시형이 아닌 모든 값을 받을 수 있다.

```js
function func(bar: object) {
	console.log(bar);
}

func([1, 2, 3]); // 성공
func({ a: 1, b: 2 }); // 성공
func(123); // 에러
```

- Object는 모든 객체가 할당될 수 있다. 자바스크립트에 포함된 모든 생성자들은 Object를 extend한다.

```js
function func2(bar: Object) {
	console.log(bar);
}

func2([1, 2, 3]); // 성공
func2({ a: 1, b: 2 }); // 성공
func2(123); // 성공
```

- {} 타입은 Object와 동일하다.

```js
function func2(bar: {}) {
	console.log(bar);
}

func2([1, 2, 3]); // 성공
func2({ a: 1, b: 2 }); // 성공
func2(123); // 성공
```

---

## Array

```js
// 타입 뒤에 []를 사용하는 방법
let arr: string[] = ['hi', 'hello'];
let arr2: (string | number)[] = [1, 2, 'hi'];

// 제네릭 배열 타입을 사용하는 방법
let arr3: Array<number> = [1, 2, 3];
```

### readonly

readonly는 타입 뒤에 []를 붙일 때 사용 가능하고, `Array<number>`와 같은 제너릭 배열 타입에서는 사용 불가하다.

```js
function printArray(fruits: readonly string[]) {

}
```

---

## Tuple

고정된 사이즈에 서로 다른 타입이 있을 때 사용 가능하다.
튜플은 인덱스로 접근하게 되는데 가독성이 떨어진다. 따라서 interface, type alias 또는 class로 대체해서 사용 가능하다.

예제 1)

```js
// 튜플 타입으로 선언
let arrT: [string, number];

// 초기화
arrT = ['hi', 10];
```

예제 2)

```js
const obj: {
	name: string,
	age: number,
	// hobbies: (number | string)[];
	hobbies: [string, string, number],
} = {
	name: 'ck',
	age: 25,
	hobbies: ['running', 'relaxing', 2],
};

obj.hobbies.push('sleeping');
obj.hobbies[1] = 'sleeping';
```

---

## Enum

enum은 값의 집합에 더 나은 이름을 붙여주기 위해 사용한다.
상수 값들을 한 곳에 모아서 타입을 보장하게 하고, 타입의 값의 변하지 않아서 안전하게 타입을 사용할 수 있게 해주는 것이 enum이라는 타입이다.
enum의 특징으로는 0부터 시작하여 멤버들의 번호를 매긴다.
값을 수동으로 설정하여 번호를 바꿀 수 있다.

> 대부분의 케이스에서는 union type으로 대체 되어서 사용 가능하다.

예제 1)

```js
enum Role {
	ADMIN = 5,
	READ_ONLY,
	AUTHOR,
}
const obj2 = {
	hobbies: ['running', 'relaxing', 2],
	role: Role.ADMIN,
};

if (obj2.role === Role.ADMIN) console.log('is admin');
```

예제 2)

```js
enum Color {Red, Yellow, Blue};
let pickColor: Color = Color.Red
console.log(pickColor); // 0
let whichColor: string = Color[2]
console.log(whichColor); // Blue
```

---

## any

any는 알지 못하는 타입을 표시할 때 사용한다.
any를 사용하는 경우엔 타입 검사를 하지 않고, 컴파일 시간에 검사를 하게된다.

```js
let arrList: any[] = [1, true, 'hi'];
arrList[1] = 200;
```

---

## null과 undefined

null은 변수를 선언하고 빈 값을 할당한 상태이고, undefined는 변수를 선언하고 값을 할당하지 않은 상태이다.

```js
let age: number | undefined;
```

```js
let name: string | undefined;
name = undefined;
name = 'ck';
```

---

## void

void는 함수에서 반환하는 값이 없을 때 반환 타입을 표현하기 위해 사용한다.
void인 경우 생략도 가능하다.

```js
function func3(): void {
	console.log('hello');
}
```

---

## never

never는 항상 오류를 발생시키거나 `절대 반환하지 않는` 반환 타입으로 쓰인다.

```js
// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function func3(message: string): never {
	throw new Error(message);
}

// 끝나지 않아서 함수의 마지막에 도달할 수 없다.
function func4(): never {
	while (true) {}
}

// 반환 타입이 never로 추론된다.
function func5() {
	return error('에러');
}
```

---

## Type Alias

Type Alias는 원하는 타입을 정의할 수 있는 것이다.

```js
type Text = string;
const name: Text = 'ck';

type Student = {
	name: string,
	age: number,
};
const student: Student = {
	name: 'ck',
	age: 25,
};
```

---

## String Literal Types

타입을 문자열로 지정할 수 있는 것이다.

```js
type Name = 'name';
let yourName: Name;
```

---

## Union Type

---

## Type Inference

타입스크립트에서 타입 추론 덕분에 자동으로 알아서 타입을 명시해주지만, 프로젝트가 커질 수록 함수 안에서 따로 실행되는 코드가 많이 들어있기 때문에 타입을 정확하게 명시하는 것이 좋다.

---

## Type Assertions

Type Assertions는 컴파일러에게 타입 단언, 즉 뭘 하고 있는지 알고 있다고 말해주는 방법이다.

예제 1) `angle-bracket`

```js
let val1: any = '문자열 입니다'
let strLength: number = (<string>val1).length;
```

예제 2) `-as` (JSX에서 사용할 때는 -as로만 캐스팅 가능)

```js
let val1: any = '문자열 입니다'
let strLength: number = (val1 as string).length;
```

`!` : 느낌표는 옵션이 아니고 절대적으로 값이 있다고 확신할 때 선택하는 것이다.

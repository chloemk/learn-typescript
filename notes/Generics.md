# Generics

제네릭은 통상적인, 포괄적인이라는 뜻으로 단일 타입이 아닌 `어떤 타입에서도 작동하는` 컴포넌트를 만들 수 있다.
제네릭을 이용하면 클래스나 함수 인터페이스를 다양한 타입으로 선언할 수 있다.
선언할 때는 타입 파라미터만 적어주고 `생성하는 시점에 타입을 결정`한다.
사용자는 제네릭을 통해서 여러 타입의 컴포넌트나 자신만의 타입을 만들 수 있다.  
제네릭의 특징으로는 `재사용성`이 높다.
그리고 제네릭을 함수에서 사용할 때는 항상 인자를 전달하는 괄호 앞에 제네릭을 정의한다.

---

모든 타입을 받을 수 있으면 `any` 타입을 사용하면 되지만 `any` 타입을 사용하면 함수가 반환할 때 어떤 타입인지에 대한 정보를 잃게 된다.

```js
function func(arg: any): any {
	return arg;
}
func(123); // number 타입을 넘겼지만 any 타입이 반환된다는 정보만 얻는다.
```

> 제네릭은 어떤 타입이 반환되는지 표시하기 위해 인수의 타입을 캡처하는 방법이다.
> 아래의 예제에서는 T라는 타입 변수를 추가했다. `T`는 인수의 타입을 캡처하고 이 정보를 나중에 사용할 수 있게 해주고 `T`를 반환 타입으로 다시 사용한다.
> 인수와 반환 타입을 같은 타입을 사용하므로써 다른 한쪽으로 타입 정보를 운반해주는 역할을 해준다.

```js
function func2<T>(arg: T): T {
	// T라는 타입 변수를 추가했다.
	return arg;
}
let result = func2(123); // 타입 인수 추론 사용
let result2 = func2 < number > 123; // <>사용하여 명시적으로 전달
```

> 제너릭 함수 func3는 타입 매개변수 T와 T배열인 인수 arg를 취하고 T배열을 반환한다. number배열을 넘기게 되면 T가 number에 바인딩되서 함수는 number 배열을 얻게 된다.

```js
function func3<T>(arg: Array<T>): Array<T> {
	console.log(arg.length);
	return arg;
}
```

---

## Generic Classes

> Flexible and strongly typed class
> 제네릭 클래스를 만드는 이유는 클래스롤 어떤 틀을 만들어 놓고 `재사용할 수 있기 때문`이다.

아래의 예제와 같이 class로 틀을 만든 후

```js
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item)
  }
  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1)
  }
  getItems() {
    return [...this.data]
  }
}
```

text를 저장할 수도 있고, 숫자를 저장할 수도 있다.

```js
const textStorage = new DataStorage<string>();
textStorage.addItem('ck')
textStorage.addItem('mm')
textStorage.removeItem('mm')
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number | string>();
numberStorage.addItem(2);
numberStorage.addItem('hi')
```

---

## Constraints

제네릭에 `조건`을 줄 수 있는 것이 constraints이다. 조건부를 사용하면 조금 더 세밀하게 타입을 제한해서 정의 할 수 있다.
타입 뒤에 `extends` 키워드를 붙혀서 조건을 줄 수 있다.

예제 1)

```js
interface Employee {
  pay(): void;
}
class FullTimeEmployee implements Employee {
  pay() {
    console.log('풀타임 입니다')
  }
  workFullTime() {}
}
//제네릭 함수로 어떤 타입이든 다 들어와도 된다고 명시하는 것이다.
//pay를 사용하고 싶으면 Employee를 구현한 인터페이스를 확장한 것만 가능하다고 조건을 걸어줄 수 있다.
function pay<T extends Employee>(employee: T): T {
  employee.pay();
  return employee; //받아온 employee 타입 그대로 리턴한다.
}

const ck = new FullTimeEmployee();
const ckAfterPay = pay(ck);
```

예제 2)
T는 어떠한 오브젝트 타입을 받아서, K는 그 오브젝트 안에 있는 키들 중 하나여야 하고, 리턴되는 것은 그 오브젝트에 있는 키가 가리키고 있는 value 타입이라고 명시한 것이다.

> keyof : 그 오브젝트 안에 들어있는 키의 타입

```js
const obj = {
  name: 'ck',
  age: 20,
}
console.log(getValue(obj, 'name'))

// const getValue = <T, K extends keyof T>(obj: T, key: K): T[K] => {}
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
```

예제 3)
제네릭은 매우 flexible하다.

```js
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}
const mergeObj = merge({name: 'ck', hobbies: ['sports']}, {age: 25})
console.log(mergeObj)
```

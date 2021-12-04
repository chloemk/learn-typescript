interface Direction<L, R> {
	left: () => L;
	right: () => R;
}

class WhichDir<L, R> implements Direction<L, R> {
	constructor(private leftVal: L, private rightVal: R) {}
	left(): L {
		return this.leftVal;
	}
	right(): R {
		return this.rightVal;
	}
}
const either: Direction<number, number> = new WhichDir(4, 5);
either.left();
either.right();
const best = new WhichDir({ name: 'ck' }, 'hello');

function func3<T>(arg: Array<T>): Array<T> {
	console.log(arg.length);
	return arg;
}
let str: Array<string> = ['hello', 'hi'];
console.log(func3(str));

//generic type as a call signature of an object literal type
function func4<T>(arg: T): T {
	return arg;
}
let myIdentity: { <T>(arg: T): T } = func4;

//Generic Interface - 객체 리터럴을 인터페이스로 가져온다.
interface GenericIdentityFunc {
	<T>(arg: T): T;
}
function func5<T>(arg: T): T {
	return arg;
}
let myIdentity2: GenericIdentityFunc = func5;

//Generic Classes - 제너릭 인터페이스랑 비슷한 형태를 가지고 있다.
//클래스는 정적 측면과 인스턴스 측면 타입을 갖는다. 제네릭 클래스는 정적 측면이 아닌 인스턴스 측면만 제너릭이므로 작업할 때 정적 멤버는 클래스의 타입 매개변수를 쓸 수 없다.
class GenericNum<T> {
	zeroVal: T;
	add: (x: T, y: T) => T;
}
let myGenericNum = new GenericNum<number>();
myGenericNum.zeroVal = 0;
myGenericNum.add = function (x, y) {
	return x + y;
};

//제네릭 조건 Generic Constraints
interface Employee {
	pay(): void;
}

class FullTimeEmployee implements Employee {
	pay() {
		console.log('풀타임');
	}
	workFullTime() {}
}
class PartTimeEmployee implements Employee {
	pay() {
		console.log('파트타임');
	}
	workPartTime() {}
}
//세부적인 타입을 인자로 받아서 추상적인 타입으로 리턴하는 함수는 좋지 않다
// function pay(employee: Employee): Employee {
//   employee.pay();
//   return employee
// }

//제네릭 함수로 어떤 타입이든 다 들어와도 되는데, 이 Employee를 구현한 확장된 것만 가능하다고 조건을 걸어줄 수 있다.
function pay<T extends Employee>(employee: T): T {
	employee.pay();
	return employee; //employee를 받아온 그 타입 그대로 리턴한다
}

const ck = new FullTimeEmployee();
const jay = new PartTimeEmployee();

const ckAfterPay = pay(ck);
const jayAfterPay = pay(jay);

//예제 2
const obj = {
	name: 'ck',
	age: 20,
};
console.log(getValue(obj, 'name'));
//keyof : 그 오브젝트 안에 들어있는 키의 타입
//T는 어떠한 오브젝트 타입을 받아서, K는 그 오브젝트 안에 있는 키들 중 하나여야 하고,
//리턴되는 것은 그 오브젝트에 있는 키가 가리키고 있는 value 타입이라고 명시한 것이다.
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
	return obj[key];
}

//예제 3
function merge<T extends object, U extends object>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}
const mergeObj = merge({ name: 'ck', hobbies: ['sports'] }, { age: 25 });
console.log(mergeObj);

//Generic function practice
interface Lengthy {
	length: number;
}
//반환하는 값은 튜플로 작성된 것이다.
function countAndPrint<T extends Lengthy>(el: T): [T, string] {
	let descText = 'no val';
	if (el.length === 1) descText = 'Got 1 val';
	else if (el.length > 1) descText = 'Got ' + el.length + ' elements';
	return [el, descText];
}
console.log(countAndPrint('hi'));

function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U
) {
	return obj[key];
}
console.log(extractAndConvert({ name: 'ck' }, 'name'));

//! Generic class
class DataStorage<T> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}
	removeItem(item: T) {
		this.data.splice(this.data.indexOf(item), 1);
	}
	getItems() {
		return [...this.data];
	}
}

const textStorage = new DataStorage<string>();
textStorage.addItem('ck');
textStorage.addItem('mm');
textStorage.removeItem('mm');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number | string>();
numberStorage.addItem(2);
numberStorage.addItem('hi');

# Advanced Types

---

# Type Aliases vs Interface

## Interface

> 어떤 것의 규격 사항이다. 어떤 특정한 규격을 정의하고 그 규격을 통해서 구현해야 한다면 인터페이스 사용이 적합하다.

#### 차이점

- 인터페이스는 상속을 통한 확장이 가능하다.

```js
interface ZPositionInterface extends PositionInterface {
	z: number;
}
```

- 같은 interface를 두번 이상 선언한 경우 declaration merging이 가능하다.

```js
interface PositionInterface {
	x: number;
	y: number;
}

interface PositionInterface {
	z: number;
}

const obj2: PositionInterface = {
	x: 1,
	y: 1,
	z: 1,
};
```

## Type Aliases

Type Aliases(타입 별칭)은 타입의 새로운 이름을 만든다.
Represent primitives, object types, union types, tuples and intersections.

> 어떠한 데이터를 담을 때 데이터의 모습, 타입을 결정한다. 데이터를 담을 목적이라면 타입을 사용하는 것이 적합하다.

#### 차이점

- 새로운 타입 만들기

```js
type StringType = string;
```

- 유니온 타입 만들기

```js
type Directions = 'left' | 'right';
```

- Intersection(교차 타입)을 이용해서 두가지를 묶은 타입으로 만들 수 있다. (extend 할 수 있다)

```js
type ZPositionType = PositionType & { z: number };
```

- 타입 엘리어스는 computed properties를 사용할 수 있다.

```js
type Person = {
	name: string,
	age: number,
};

type Name = Person['name']; // string
```

---

# Utility Types

유틸리티 타입은 전역으로 사용가능하며 타입 변환을 쉽게 하기 위하여 사용한다.

---

## Mapped Types

기존에 있는 타입들을 이용해서 다른 형태로 바꾸는 타입이다.
재사용성이 좋다.

> P는 T 타입의 키들 중 하나고, T[P]로 value에 접근할 수 있다.
> `?`는 옵셔널 기호이다.

```js
type Optional<T> = {
  [P in keyof T]?: T[P]; // for...in과 동일하다
}
```

```js
type Fruits = 'apple' | 'banana' | 'pineapple'
// Fruits가 가지고 있는 키들 중 하나씩 선택되는게 K
type FruitLevel = {[K in Fruits]: number}

const level: FruitLevel = {
  apple: 1,
  banana: 2,
  pineapple: 3,
}
```

---

## Partial<T>

타입 T 집합의 모든 프로퍼티를 선택적으로 타입을 생성한다. 주어진 타입의 모든 하위 타입 집합을 나타내는 타입을 반환한다.
기존의 타입 중에서 부분적인 것만 허용하고 싶을 때 사용할 수 있다.

타입 T의 모든 프로퍼티를 optional 형태로 바꿔준다.

> 타입 T의 프로퍼티 키값에 해당하는 P를 전부 옵셔널 형태로(?) 감싸 리턴한다.

```js
type Partial<T> = {[P in keyof T]?: T[P];};
```

```js
type Todo = {
	title: string,
	desc: string,
	label: string,
	priority: 'high' | 'low',
};
//fieldsToUpdate 업데이트하려는 인자는 Todo의 Partial타입이다. 부분적으로 받을 수 있다.
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
	return { ...todo, ...fieldsToUpdate };
}
const todo: Todo = {
	title: '타입스크립트 배우기',
	desc: '열심히 공부하기',
	lavel: '공부',
	priority: 'high',
};
const updated = updateTodo(todo, { priority: 'low' });
```

---

## Required<T>

Partial과 반대로 T 타입 집합의 모든 프로퍼티를 필수로 설정한 타입을 생성한다. (모든 optional 타입들을 언랩핑한다)

```js
type Requried<T> = {
  [P in keyof T]-?: T[P]; // -는 옵셔널을 제거해주는 연산자
};
```

```js
interface Props {
	a?: number;
	b?: string;
}
const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5, b: 'hi' };
```

---

## Readonly<T>

T 타입 집합의 모든 프로퍼티를 읽기 전용으로 설정한 타입이다.
읽기 전용이기 때문에 해당 프로퍼티는 재할당될 수 없다. (참조만 할 수 있게된다.)

```js
type Readonly<T> = {readonly [P in keyof T]: T[P]}
```

```js
interface Todo {
	title: string;
	due: string;
}
type ReadOnlyTodo = ReadOnly<Todo>;
const todo: ReadOnlyTodo = {
	title: '해야할 일',
	due: 'today',
};
```

---

## Record<K, T>

T 타입의 프로퍼티 K의 집합으로 타입을 생성한다. 타입의 프로퍼티를 다른 타입에 매핑 시키는데 사용된다.

> K 타입을 key 값 타입으로, T타입을 밸류 값으로 갖는 타입을 리턴한다. 주로 K에 union 문자열을 주어 map 형식의 타입을 만들 수있고 여러 값들을 원하는 키값에 따라 분류할 때 사용한다.

```js
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

```js
type PageInfo = {
	title: string,
};
type Page = 'home' | 'about' | 'contact';
const nav: Record<Page, PageInfo> = {
	home: { title: 'Home' },
	about: { title: 'About' },
	contact: { title: 'Contact' },
};
```

---

## Pick<T, K>

기존의 타입에서 원하는 속성과 밸류들만 뽑아서 보다 제한적인 타입을 만들때 사용한다. T타입으로부터 K프로퍼티만 추출한다.

> T라는 타입을 받아오고, K는 키값 T에 속하는 union 타입이 되고, 매칭되는 프로퍼티만 리턴한다.

```js
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

```js
type Video = {
	id: string,
	title: string,
	url: string,
	data: string,
};
type VideoMetadata = Pick<Video, 'id' | 'title'>;
function getVideoMetadata(id: string): VideoMetadata {
	return {
		id: id,
		title: 'title',
	};
}
```

```js
interface Product {
	id: number;
	price: number;
	brand: string;
}
function fetchProducts(): Promise<Product[]> {}
function displayProductDetail(item: Pick<Product, 'id' | 'brand'>) {}
```

---

## Omit<T, K>

> Pick과는 반대로 T 타입으로부터 K 프로퍼티를 제거한다.

```js
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

```js
interface Todo {
	title: string;
	desc: string;
	completed: boolean;
}

type TodoPreview = Omit<Todo, 'desc'>;

const todo: TodoPreview = {
	title: 'cleaning',
	completed: false,
};

const todoDetail: Omit<Todo, 'title' | 'completed'> = {
	desc: 'clean my room',
};
```

---

## NonNullable<T>

T타입에서 null 또는 undefined를 제외하고 타입을 생성한다.

```js
type NonNullale<T> = T extends null | undefined ? never : T
```

```js
type T0 = NonNullable<string | number | undefined>; // string | number
```

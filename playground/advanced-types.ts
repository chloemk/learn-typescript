// ! Index Type
type Animal = {
	name: string;
	age: number;
	gender: 'male' | 'female';
};

type Name3 = Animal['name']; // Name3이라는 type은 string이 됨
const text: Name3 = 'hi'; // Name3의 타입은 string이였으니까 문자열 'hi'를 변수 text에 할당함

type Gen = Animal['gender']; //Gen이라는 타입에는 union 타입 'male' | 'female'이 들어감

type Keys = keyof Animal; // Animal에 있는 모든 키의 타입을 타입 Keys에 할당함. 'name' | 'age' | 'gender'가 유니온 타입으로 들어감
const key: Keys = 'gender';

//! Mapped Type
type Video3 = {
	title: string;
	author: string;
};
type Optional<T> = {
	[P in keyof T]?: T[P];
};
type Video3Optional = Optional<Video3>;
type Animals = {
	name: string;
	age: number;
};
//재사용성이 높음
const animals: Optional<Animals> = {
	name: 'cat',
};

//! Readonly - 읽을 수만 있는 타입
type Todos = {
	title: string;
	desc: string;
};

function display(el: Readonly<Todos>) {}

// ! Pick Type - 기존의 타입에서 원하는 속성과 밸류들만 뽑아서 보다 제한적인 타입을 만들때 사용한다.
type Video = {
	id: string;
	title: string;
	url: string;
	data: string;
};
type VideoMetadata = Pick<Video, 'id' | 'title'>;
function getVideoMetadata(id: string): VideoMetadata {
	return {
		id: id,
		title: 'title',
	};
}
//T라는 타입을 받아오고, K는 T타입에 있는 키들을 상속한 아이들이다.
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }

// ! Omit Type - pick과 반대로 원하는 것을 빼버린다
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
// T라는 타입을 받아오고, K는 any 타입에 있는 키들을 상속한 아이들이다.
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

//! Record Type - 서로 엮을 수 있는 것
type PageInfo = {
	title: string;
};
type Page = 'home' | 'about' | 'contact';
const nav: Record<Page, PageInfo> = {
	home: { title: 'Home' },
	about: { title: 'About' },
	contact: { title: 'Contact' },
};

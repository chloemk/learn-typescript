//! Type alias
type PositionType = {
	x: number;
	y: number;
};

//! Interface
interface PositionInterface {
	x: number;
	y: number;
}

// 인터페이스는 결합이 가능하다.
interface PositionInterface {
	z: number;
}

//* object
const object1: PositionType = {
	x: 1,
	y: 1,
};

const object2: PositionInterface = {
	x: 1,
	y: 1,
	z: 1,
};

//* class
class Pos1 implements PositionType {
	x: number;
	y: number;
}

class Pos2 implements PositionInterface {
	x: number;
	y: number;
}

//* Extends
// 인터페이스는 상속을 통해 확장 가능하다.
interface ZPositionInterface extends PositionInterface {
	z: number;
}

// 타입은 인터섹션을 이용해서 두가지를 묶은 타입으로 만들 수 있다.
type ZPositionType = PositionType & { z: number };

// 타입 엘리어스는 computed properties를 사용할 수 있다.
type Person = {
	name: string;
	age: number;
};

type Name = Person['name']; // string

// 새로운 타입 만들기
type StringType = string;

//유니온 타입 만들기
type Directions = 'left' | 'right';

// ! Type Aliases
type Names = string;
type NameResolver = () => string;
type NameorResolver = Name | NameResolver;
function nameFunc(el: NameResolver): Names {
	if (typeof el === 'string') return el;
	else return el();
}

// * type aliases로 제네릭 만들기
type Container<T> = { value: T };

//프로퍼티 안에서 자기 자신을 참조하는 타입 별칭
type Tree<T> = {
	value: T;
	left: Tree<T>;
	right: Tree<T>;
};

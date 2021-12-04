function add(
	n1: number | string,
	n2: number | string,
	resultConversion: string
) {
	let result;
	if (typeof n1 === 'number' && typeof n2 === 'number') result = n1 + n2;
	else result = n1.toString() + n2.toString();
	if (resultConversion === 'as-number') return parseFloat(result);
	else return result.toString();
}

const answer = add(20, 30, 'as-number');
console.log(answer);

const answer2 = add('hi', 'hello', 'as-text');
console.log(answer2);

//Type Assertions
function jsStrFunc(): any {
	return 2;
}
const result = jsStrFunc();
console.log((result as string).length);
console.log((<string>result).length);

function findNumbers(): number[] | undefined {
	return undefined;
}

const numbers = findNumbers()!;
numbers.push(2);

//optional parameter 전달해도 되고 전달하지 않아도 되는. 전달하지 않으면 undefined가 됨
function printName(firstName: string, lastName?: string) {
	console.log(firstName);
	console.log(lastName);
}
printName('ck', 'k');
printName('ck');

//default parameter: 기본값 설정
function printMessage(message: string = '기본값이에요') {
	console.log(message);
}
printMessage();

//rest parameter
function addNum(...nums: number[]): number {
	return nums.reduce((a, b) => a + b);
}

console.log(addNum(1, 2, 3));

// Discriminated Union
type SuccessState = {
	result: 'success';
	response: {
		body: string;
	};
};
type FailState = {
	result: 'fail';
	response: {
		body: string;
	};
};
type LoginState = SuccessState | FailState;

function printLoginState(state: LoginState) {
	if (state.result === 'success') {
		console.log(`${state.response.body}`);
	} else {
		console.log(`${state.result}`);
	}
}

// Intersection Type
type Student = {
	name: string;
	score: number;
};
type Workers = {
	emplyeeId: number;
	work: () => void;
};

function whoWorks(person: Student & Workers) {
	console.log(person.name, person.emplyeeId, person.work());
}
// whoWorks({ name: 'ck', score: 10, emplyeeId: 5 });

//callback
function addHandler(n1: number, n2: number, cb: (num: number) => void) {
	const result = n1 + n2;
	cb(result);
}
addHandler(10, 20, (result) => {
	console.log(result);
});

// discriminating unions
type LoadingState = {
	state: 'loading';
};
type FailedState = {
	state: 'failed';
	code: number;
};
type NetworkSuccessState = {
	state: 'success';
	response: {
		title: string;
		duration: number;
		summary: string;
	};
};
type NetworkState = LoadingState | FailedState | NetworkSuccessState;

function networkStatus(state: NetworkState): string {
	//모든 타입에 공유되지 않는 프로퍼티에 접근 하려는 시도는 오류를 발생시킨다.
	// state.code;
	switch (state.state) {
		case 'loading':
			return '로딩중...';
		case 'failed':
			return `Error ${state.code}`;
		case 'success':
			return `network success ${state.response.title}`;
	}
}

// Intersection Types
interface ErrorHandling {
	success: boolean;
	error?: { message: string };
}
interface ArtworksData {
	artworks: { title: string }[];
}
interface ArtistsData {
	artists: { name: string }[];
}
type ArtworkResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handler = (resp: ArtistsResponse) => {
	if (resp.error) {
		console.log(resp.error.message);
		return;
	}
	console.log(resp.artists);
};

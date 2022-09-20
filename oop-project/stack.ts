// 단일 연결리스트로 스택 구현
interface Stack {
	readonly size: number;
	push(value: string): void;
	pop(): string;
}

type StackNode = {
	readonly value: string;
	// 처음 들어온 노드는 다음 스택 노드를 가리키고 있지 않을 수 있다.
	readonly next?: StackNode;
}

class StackImpl implements Stack {
	private _size: number = 0;
	private _head?: StackNode;

	constructor(private capacity: number) {}

	get size() {
		return this._size;
	}

	push(value: string): void {
		if (this.size === this.capacity) {
			throw new Error('stack is full!!');
		};

		const node: StackNode = {value, next: this._head};
		this._head = node;
		this._size++;
	}

	pop(): string  {
		if (this._head == null) {
			throw new Error('stack is empty!!!');
		}
		const node = this._head;
		this._head = node.next;
		this._size--;
		return node.value;
	}
}

const stack = new StackImpl(10);
stack.push('hey1');
stack.push('hey2');
stack.push('hey3');
while(stack.size !== 0) {
	console.log(stack.pop());
}
stack.pop();

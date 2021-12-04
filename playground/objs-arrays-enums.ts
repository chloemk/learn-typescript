const obj: {
	name: string;
	age: number;
	// hobbies: (number | string)[];
	hobbies: [string, string, number];
} = {
	name: 'ck',
	age: 25,
	hobbies: ['running', 'relaxing', 2],
};

obj.hobbies.push('sleeping');

obj.hobbies[1] = 'sleeping';

console.log(obj.name);

const product = {
	id: 'abc',
	price: 12000,
	tags: ['great-offer', 'hot-and-new'],
	details: {
		title: 'red carpet',
		desc: 'A great carpet - almost brand new!',
	},
};

console.log(product.details.title);

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {
	ADMIN = 5,
	READ_ONLY,
	AUTHOR,
}

const obj2 = {
	name: 'ck',
	age: 25,
	hobbies: ['running', 'relaxing', 2],
	role: Role.ADMIN,
};

console.log(obj2.hobbies);

if (obj2.role === Role.ADMIN) console.log('is admin');

for (const hobby of obj2.hobbies) {
	if (typeof hobby === 'string') console.log(hobby.toUpperCase());
	else console.log(hobby * 2);
}

let favouriteActivies: string[];
favouriteActivies = ['climbing'];

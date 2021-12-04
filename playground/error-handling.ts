type SuccessState = {
	result: 'success';
};

type ErrorState = {
	result: 'fail';
	reason: 'offline' | 'down' | 'timeout';
};

type ResultState = SuccessState | ErrorState;

class NetworkClient {
	tryConnect(): ResultState {}
}

class UserService {
	constructor(private client: NetworkClient) {}
	login() {
		this.client.tryConnect();
	}
}

class App {
	constructor(private userService: UserService) {}
	run() {
		try {
			this.userService.login();
		} catch (err) {
			console.log(err);
		}
	}
}

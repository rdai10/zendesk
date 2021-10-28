const fetch = () => {
	Promise.resolve({
		
	})

}

class Request {
	constructor(url) {
		this.url = url;
	}

	url() {
		return this.url;
	}
}

window.fetch = fetch;
window.Request = Request;
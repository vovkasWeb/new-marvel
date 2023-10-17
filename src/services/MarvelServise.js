class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = 'apikey=17c90dff8350bf52ea40e82d4e7f7550'
	getResource = async url => {
		let res = await fetch(url)

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`)
		}

		return await res.json()
	}

	getAllCharcters = () => {
		return this.getResource(
			`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
		)
	}
	getCharcter = id => {
		return this.getResource(
			`${this._apiBase}characters/${id}?${this._apiKey}`
		)
	}
}

export default MarvelService

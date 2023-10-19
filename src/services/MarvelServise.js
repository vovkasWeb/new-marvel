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

	getAllCharacters = async () => {
		const res = await this.getResource(
			`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
		)
		return res.data.results.map(this._transformCharacter)
	}
	getCharcter = async id => {
		const res = await this.getResource(
			`${this._apiBase}characters/${id}?${this._apiKey}`
		)
		return this._transformCharacter(res.data.results[0])
	}
	_transformCharacter = ({
		id,
		name,
		description,
		thumbnail,
		urls,
		comics,
	}) => {
		return {
			id,
			name,
			description: description
				? `${description.slice(0, 210)}...`
				: 'There is no description for this character',
			thumnail: thumbnail.path + '.' + thumbnail.extension,
			homepage: urls[0].url,
			wiki: urls[1].url,
			comics: comics.items,
		}
	}
}

export default MarvelService

import { Component } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelServise'
import './charList.scss'

class CharList extends Component {
	state = {
		charList: [],
		loading: true,
		error: false,
	}

	marvelService = new MarvelService()

	componentDidMount() {
		this.marvelService
			.getAllCharacters()
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	onCharListLoaded = charList => {
		this.setState({
			charList,
			loading: false,
		})
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false,
		})
	}

	// Этот метод создан для оптимизации,
	// чтобы не помещать такую конструкцию в метод render
	renderItems(arr) {
		const items = arr.map((item) => {
			let imgStyle = { objectFit: 'cover' }

			return (
				<li className='char__item' key={item.id}>
					<img src={item.thumnail} alt={item.name} style={imgStyle} />
					<div className='char__name'>{item.name}</div>
				</li>
			)
		})
		// А эта конструкция вынесена для центровки спиннера/ошибки
		return <ul className='char__grid'>{items}</ul>
	}

	render() {
		const { charList, loading, error } = this.state

		const items = this.renderItems(charList)

		const errorMessage = error ? <ErrorMessage /> : null
		const spinner = loading ? <Spinner /> : null
		const content = !(loading || error) ? items : null

		return (
			<div className='char__list'>
				{errorMessage}
				{spinner}
				{content}
				<button className='button button__main button__long'>
					<div className='inner'>load more</div>
				</button>
			</div>
		)
	}
}

export default CharList

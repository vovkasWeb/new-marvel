import { Component } from 'react'
import './charInfo.scss'
import PropTypes from 'prop-types'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelServise'
import Skeleton from '../skeleton/Skeleton'

class CharInfo extends Component {
	state = {
		char: null,
		loading: false,
		error: false,
	}
	marvelService = new MarvelService()

	componentDidMount() {
		this.updateChar()
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar()
		}
	}

	onCharLoaded = char => {
		console.log(char)
		this.setState({ char, loading: false })
	}
	onCharLoading = () => {
		this.setState({
			loading: true,
		})
	}
	onError = () => {
		this.setState({ loading: false, error: true })
	}
	

	updateChar = () => {
		const { charId } = this.props
		if (!charId) {
			return
		}

		this.onCharLoading()

		this.marvelService
			.getCharcter(charId)
			.then(this.onCharLoaded)
			.catch(this.onError)

		
	}

	render() {
		const { char, loading, error } = this.state

		const skeleton = char || loading || error ? null : <Skeleton />
		const errorMessage = error ? <ErrorMessage /> : null
		const spinner = loading ? <Spinner /> : null
		const content = !(loading || error || !char) ? <View char={char} /> : null

		return (
			<div className='char__info'>
				{skeleton}
				{errorMessage}
				{spinner}
				{content}
			</div>
		)
	}
}

const View = ({ char }) => {
	const { name, description, thumnail, homepage, wiki, comics } = char

	return (
		<>
			<div className='char__basics'>
				<img src={thumnail} alt={name} />
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<a href={homepage} className='button button__main'>
							<div className='inner'>homepage</div>
						</a>
						<a href={wiki} className='button button__secondary'>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>{description}</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>
				{comics
					? comics.map((item, i) => {
							if (i >= 10) {
								return
							}
							return (
								<li key={i} className='char__comics-item'>
									{item.name}
								</li>
							)
					  })
					: 'There is no comics with this character'}
			</ul>
		</>
	)
}
CharInfo.propTypes = {
	charId: PropTypes.number,
}
export default CharInfo

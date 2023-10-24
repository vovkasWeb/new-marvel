import { useState,useEffect,useRef } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelServise'
import './charList.scss'

const CharList =(props)=> {
	const [charList,setCharList] = useState([]);
	const [loading,setLoading] = useState(true);
	const [error,setError] = useState(false);
	const [newItemLoadin,setNewItemLoadin] = useState(false);
	const [offset,setOffset] = useState(210);
	const [charEnd,setCharEnd] = useState(false);

	const marvelService = new MarvelService()

	useEffect(()=>{
        onRequest();
	},[])
	
	const onRequest = offset => {
		onCharListLoading()
		marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}
	const onCharListLoading = () => {
		setNewItemLoadin(true)
	}

	const onCharListLoaded = newCharList => {
		let ended = false
		if (newCharList.length < 9) {
			ended = true
		}
	
		setCharList(charList=>[...charList,...newCharList]);
		setLoading(loading=>false);
		setNewItemLoading(newItemLoading=>false);
		setOffset(offset=>offset + 9);
		setCharEnd(charEnd=>ended);

	}
	const onError = () => {
		setError(true)
setLoading(loading=>false);
	}


	const renderItems = (arr)=> {
		const items = arr.map(item => {
			let imgStyle = { objectFit: 'cover' }
			return (
				<li
					className='char__item'
					key={item.id}
					onClick={() => this.props.onCharSelected(item.id)}
				>
					<img src={item.thumnail} alt={item.name} style={imgStyle} />
					<div className='char__name'>{item.name}</div>
				</li>
			)
		})
		// А эта конструкция вынесена для центровки спиннера/ошибки
		return <ul className='char__grid'>{items}</ul>
	}

	

		const items = this.renderItems(charList)

		const errorMessage = error ? <ErrorMessage /> : null
		const spinner = loading ? <Spinner /> : null
		const content = !(loading || error) ? items : null

		return (
			<div className='char__list'>
				{errorMessage}
				{spinner}
				{content}
				<button
					className='button button__main button__long'
					disabled={newItemLoading}
					onClick={() => this.onRequest(offset)}
					style={{ display: charEnd ? 'none' : 'block' }}
				>
					<div className='inner'>load more</div>
				</button>
			</div>
		)
	
}

export default CharList

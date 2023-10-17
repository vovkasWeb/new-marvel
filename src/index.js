import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App'
import MarvelService from './services/MarvelServise'
import './style/style.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

const marvelService = new MarvelService()
marvelService.getAllCharcters().then(res => res.data.results.forEach(element => console.log(element.name)))

marvelService.getCharcter(1011052).then(res => console.log(res))

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

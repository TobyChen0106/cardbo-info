import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import "./Cards.css"
import Card from "../../components/Card"
import tempCardLists from './tempCardLists'
class Cards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [],
			banks: [],
			offers: []
		}
	}
	componentDidMount() {

		fetch('/api/cards').catch(function (error) {
			window.alert("[Error] " + error);
		}).then(
			res => res.json()
		).then((data) => {
			this.setState({ cards: data })
			// console.log(this.state.cards)
		})

		fetch('/api/filter-data').catch(function (error) {
			window.alert("[Error] " + error);
		}).then(
			res => res.json()
		).then((data) => {
			this.setState({ banks: data.bankList })
			this.setState({ offers: data.offerList })
		})

	}
	
	render() {
		// const cardLists = this.state.cards.map((i, index) => (
		const cardLists = tempCardLists.map((i, index) => (
			<Card
				cardID={i.cardID}
				cardName={i.cardName}
				cardBank={i.cardBank}
				imageUrl={i.imageUrl}
				imageRotate={i.imageRotate}
				imageLocal={i.imageLocal}
				offer={i.offer}
				note={i.note} />
		));
		return (
			<div className="cards-container">
				{cardLists}
			</div>
		)
	}
}

export default Cards

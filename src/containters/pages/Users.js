import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import "./Cards.css"

var postlist = [1, 2,3];

class Cards extends Component {
	render() {
		const lists = postlist.map((i, index) => (
				<NavLink style={{ textDecoration: 'none' }} to={"/posts/" + i} className="link black">
					i
				</NavLink>
		));
		return (
			<div className="homePageContainer">
				<div className="homePagePosts">
					{lists}
				</div>
			</div>
		)
	}
}

export default Cards

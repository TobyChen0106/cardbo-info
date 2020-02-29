import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import "./Card.css"

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardID: props.cardID,
            cardName: props.cardName,
            cardBank: props.cardBank,
            imageUrl: props.imageUrl,
            imageRotate: props.imageRotate,
            imageLocal: props.imageLocal,
            offer: props.offer,
            note: props.note,
            
        }
    }
    componentDidMount() {
    
    }
    render() {
        var style = {};
        if (this.state.imageRotate === true) {
            style = {
                transform: 'rotate(270deg)',
                height: window.innerWidth / 8,
            };
        } else {
            style = {
                width: window.innerWidth / 8,
            };
        }
        return (
            <div className="card-data-container">
                <div className="cardName">{this.state.cardName}</div>
                <img id="card-image" className="card-image" src={this.state.imageUrl} style={style} />
            </div>
        )
    }
}

export default Card

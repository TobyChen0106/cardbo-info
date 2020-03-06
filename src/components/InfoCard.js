import React, { Component } from 'react'
import "./InfoCard.css"

class InfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // infoID:"",
            // cardID:"",
            infoID: props.infoID,
            cardName: props.cardName,
            infoTitle: props.infoTitle,
            infoSummary: props.infoSummary,
            // dueDate: "",
        }
    }

    render() {
        return (
            <div className="card-data-container">
                <div className="cardTitle">
                    <div className="cardName">{this.state.cardName}</div>
                    <div className="infoID">{this.state.infoID}</div>
                </div>

                <div className="infoTitle">{this.state.infoTitle}</div>
                <div className="infoSummary">{this.state.infoSummary}</div>
            </div>
        )
    }
}

export default InfoCard

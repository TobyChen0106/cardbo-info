import React, { Component } from 'react'
import { NavLink, BrowserRouter } from "react-router-dom";
import "./Infos.css"
import InfoCard from "../../components/InfoCard"
// import tempCardLists from './tempCardLists'


const ReactMarkdown = require('react-markdown')


class Infos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "view",
			// id: undefined,
			// infoData: undefined,
			id: 0,
			infoData: {
				infoTitle: "",
				infoSummary: "",
				dueDate: "",
				startDate: "",
				contents: ""
			},
			allInfoData: [],
			markdownSrc: "",
			htmlMode: 'raw'
		}
	}
	componentWillMount() {
		const status = this.props.match.params.status;
		const id = this.props.match.params.id;
		
		// change title
		document.title = "Cardbo Information";

		this.setState({ status: status, id: id });
		if (!id) {
			fetch('/api/all-infos').catch(function (error) {
				window.alert("[Error] " + error);
			}).then(
				res => res.json()
			).then((data) => {
				this.setState({
					allInfoData: data
				});
				console.log(data)
			})
		} else {
			fetch('/api/infos/' + id).catch(function (error) {
				window.alert("[Error] " + error);
			}).then(
				res => res.json()
			).then((data) => {
				this.setState({
					infoData: {
						infoTitle: data.offerName,
						infoSummary: data.offerAbstract,
						startDate: data.expiration.beginDate,
						dueDate: data.expiration.endDate,
						contents: data.reward.contents
					}
				});
				// console.log(data.dueDate)
			})
		}
	}
	componentDidMount() {

		if (this.state.status === "edit") {
			document.addEventListener('input', (event) => {
				const title = document.getElementById("titleTextarea").value;
				const summary = document.getElementById("summaryTextarea").value;
				const startDate = document.getElementById("startDateTextarea").value;
				const dueDate = document.getElementById("dueDateTextarea").value;
				const contents = document.getElementById("markdownTextarea").value;
				this.setState({
					infoData: {
						infoTitle: title,
						infoSummary: summary,
						startDate: startDate,
						dueDate: dueDate,
						contents: contents
					},
				});
			});
		}
	}
	handleSave = () => {
		var newInfo = {
			infoID: this.state.id,
			infoTitle: this.state.infoData.infoTitle,
			infoSummary: this.state.infoData.infoSummary,
			dueDate: this.state.infoData.dueDate,
			contents: this.state.infoData.contents
		}
		fetch('/api/saveinfos', {
			method: 'POST',
			body: JSON.stringify(newInfo),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).catch(function (error) {
			window.alert("[Error] " + error);
		}).then()
	}
	handleBack = () => {

	}
	render() {
		// console.log(this.state.status);
		console.log(this.state.infoData.dueDate)
		if (this.state.id) {
			if (this.state.infoData) {
				if (this.state.status === "view") {
					return (
						<div className="ReactMarkdown-pane">
							<div className="result-title">{this.state.infoData.infoTitle}</div>
							<div className="result-dueDate">{this.state.infoData.startDate} - {this.state.infoData.dueDate}</div>
							<ReactMarkdown
								className="result"
								source={this.state.infoData.contents}
								skipHtml={this.state.htmlMode === 'skip'}
								escapeHtml={this.state.htmlMode === 'escape'}
								unwrapDisallowed={true}
							/>
						</div>
					);
				} else if (this.state.status === "edit") {
					return (
						<BrowserRouter forceRefresh={true}>
							<div className="edit-mode-container">

								<div className="basic-data">
									<div>優惠 ID: {this.state.id}</div>

								</div>
								<div className="title">
									<div>Title</div>
									<textarea cols="20" rows="1" className="editor-textarea" id="titleTextarea" defaultValue={this.state.infoData.infoTitle} />
								</div>
								<div className="summary">
									<div>Summary</div>
									<textarea cols="50" rows="3" className="editor-textarea-summary" id="summaryTextarea" defaultValue={this.state.infoData.infoSummary} />
								</div>
								<div className="dueDate">
									<div>start date</div>
									<textarea cols="50" rows="1" className="editor-textarea" id="startDateTextarea" defaultValue={this.state.infoData.startDate} />
								</div>
								<div className="dueDate">
									<div>due date</div>
									<textarea cols="50" rows="1" className="editor-textarea" id="dueDateTextarea" defaultValue={this.state.infoData.dueDate} />
								</div>
								<div className="buntton-holder">
									<button className="back-button" onClick={this.handleBack}><NavLink to="/infos" style={{ textDecoration: 'none' }}>BACK</NavLink></button>
									<button className="save-button" onClick={this.handleSave}>SAVE</button>
								</div>
								<div className="editor-container">
									<div className="contents-holder">
										<div className="contents-title">Contents</div>
										<div className="editor-pane">
											<textarea cols="50" rows="50" className="editor-textarea-contents" id="markdownTextarea" defaultValue={this.state.infoData.contents} />
										</div>
									</div>
									<div className="preview-holder">
										<div className="preview-title">Preview</div>
										<div className="result-pane">
											<div className="ReactMarkdown-pane">
												<div className="result-title">{this.state.infoData.infoTitle}</div>
												<div className="result-dueDate">{this.state.infoData.startDate} - {this.state.infoData.dueDate}</div>
												<ReactMarkdown
													className="result"
													source={this.state.infoData.contents}
													skipHtml={this.state.htmlMode === 'skip'}
													escapeHtml={this.state.htmlMode === 'escape'}
													unwrapDisallowed={true}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</BrowserRouter>
					);
				} else {
					return (
						<div className="error">
							[ERROR] STATUS ERROR!
						</div>
					);
				}
			} else {
				return (
					<div className="error">
						[ERROR] NO DATA FOUND!
					</div>
				);
			}
		} else {

			const dataList = this.state.allInfoData.map((i, index) => (
				<div className="info-card-holder">
					<NavLink to={"/infos/edit/" + i.offerID} className="info-card-link" style={{ textDecoration: 'none' }}>
						<InfoCard
							key={index}
							infoID={i.offerID}
							cardName="CardName"
							infoTitle={i.offerName}
							infoSummary={i.offerAbstract}
						/>
					</NavLink>
				</div>
			));
			return (
				<BrowserRouter forceRefresh={true}>
					<div className="all-data-container">
						{dataList}
					</div>
				</BrowserRouter>
			);
		}


	}
}

export default Infos

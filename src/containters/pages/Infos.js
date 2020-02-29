import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import "./Infos.css"
import Info from "../../components/Info"
import tempCardLists from './tempCardLists'


const ReactMarkdown = require('react-markdown')


class Infos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "view",
			// id: undefined,
			// infoData: undefined,
			id: 0,
			infoData: {contents:"testdata\r\ntest"},
			infoPageData: "Data Not Found.",
			markdownSrc: "",
			htmlMode: 'raw'
		}
	}
	componentWillMount() {
	}
	componentDidMount() {
		const status = this.props.match.params.status;
		const id = this.props.match.params.id;
		this.setState({ status: status, id: id });

		if (!id) {

		} else {
			fetch('/api/infos/' + id).catch(function (error) {
				window.alert("[Error] " + error);
			}).then(
				res => res.json()
			).then((data) => {
				if (data) {
					this.setState({ infoData: data });
					console.log(data)
				}
			})
		}
	}
	handleMarkdownChange = (evt) => {
		this.setState({ markdownSrc: evt.target.value })
	}

	handleControlsChange = (mode) => {
		this.setState({ htmlMode: mode })
	}
	render() {
		// console.log(this.state.status);
		if (this.state.id) {
			if (this.state.infoData) {
				if (this.state.status === "view") {
					return (
						<ReactMarkdown
							source={this.state.infoData.contents}
							escapeHtml={false} />
					);
				} else if (this.state.status === "edit") {
					return (
						<div className="edit-mode-container">
							<div className="editor-pane">
								<textarea cols="50" rows="100" className="editor-textarea">
									{this.state.infoData.contents}
								</textarea>
							</div>
							<div className="result-pane">
								<ReactMarkdown
									className="result"
									source={this.state.infoData.contents}
									skipHtml={this.state.htmlMode === 'skip'}
									escapeHtml={this.state.htmlMode === 'escape'}
								/>
							</div>
						</div>
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
			return (
				<div className="all-data-container">
					{/* {this.state.infoPageData} */}
					all data listed:
				</div>
			);
		}


	}
}

export default Infos

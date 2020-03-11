import React, { Component } from 'react'
import { NavLink, BrowserRouter } from "react-router-dom";
import "./Infos.css"
import InfoCard from "../../components/InfoCard"
import ReactLoading from 'react-loading';
//select
import Select from 'react-select';
// import tempCardLists from './tempCardLists'


const ReactMarkdown = require('react-markdown')
Array.prototype.contains = function (v) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] === v) return true;
	}
	return false;
};

Array.prototype.unique = function () {
	var arr = [];
	for (var i = 0; i < this.length; i++) {
		if (!arr.contains(this[i])) {
			arr.push(this[i]);
		}
	}
	return arr;
}

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
			allCards: [],
			markdownSrc: "",
			htmlMode: 'raw',
			loading: true,
			cardNameList: [],
			checkList: [],
			IDoptions: [],
			selectedCardOption: undefined,

			selectedCard: undefined,
			selectedCardID: undefined,
			selectedBank: undefined,
			selectedBankID: undefined,
			bankList: ['所有銀行','台新銀行', '渣打銀行', '彰化銀行', '花旗銀行', '第一銀行', '遠東商銀', '聯邦銀行', '永豐銀行', '元大銀行', '上海商銀', '台北富邦', '兆豐銀行',
				'新光銀行', '中國信託', '星展銀行', '華南銀行', '陽信銀行', '滙豐銀行', '日盛銀行', '國泰世華', '合作金庫', '臺灣企銀',
				'王道銀行', '台灣樂天', '凱基銀行', '玉山銀行', '臺灣銀行', '台中商銀', '土地銀行', '安泰銀行', '三信銀行', '高雄銀行', '華泰銀行',
				'美國運通'],
			bankOptions: []
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
				const cardNameList = data.map((i, index) => (i.cardName)).unique();
				const IDoptions = data.map((i, index) => ({ label: i.offerID, value: i.index, }));
				this.setState({ cardNameList: cardNameList });
				this.setState({ IDoptions: IDoptions });
			}).then(() => {
				this.setState({ loading: false });
			});
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
			}).then(() => {
				this.setState({ loading: false });
			});
		}
		// make bankOptions
		var bankOptions = this.state.bankList.map((i, index) => (
			{
				label: i,
				value: index
			}
		));
		this.setState({ bankOptions: bankOptions });
	}
	componentDidMount() {
		if (this.state.status === "edit") {
			document.addEventListener('input', (event) => {
				const title = document.getElementById("titleTextarea").value;
				const summary = document.getElementById("summaryTextarea").value;
				const startDate = document.getElementById("startDateTextarea").value;
				const dueDate = document.getElementById("dueDateTextarea").value;
				const contents = document.getElementById("markdownTextarea").value;
			});
		}
	}

	handleSave = () => {
		var newInfo = {
			infoID: this.state.id,
			infoTitle: this.state.infoData.infoTitle,
			infoSummary: this.state.infoData.infoSummary,
			dueDate: this.state.infoData.dueDate,
			startDate: this.state.infoData.startDate,
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
	onCheck = (e, i) => {
		console.log(e);
		console.log(i);
		console.log("check");
	}
	handleSelectOfferID = (e) => {
		this.setState({
			selectedCardID: e.label,
			selectedCardOption: e.value
		})
	}
	handleSelectBank = (e) => {
		const label = e.label;
		this.state.cardOptions = this.state.allCards.filter(card => card.bankName === label).map((i, index) => (
			{ label: i.cardName, value: index }
		));
		this.setState({ selectedBank: label });
		this.setState({ selectedBankID: e.value });
		if(label === '所有銀行'){

		}
	}
	handleSelectCard = (e) => {
		this.setState({ selectedCard: e.label });
		this.setState({ selectedCardID: e.value });
	}
	render() {
		if (this.state.loading) {
			// if (true) {
			return (<div className="my-loading">
				<ReactLoading type={'balls'} color={'#ffffff'} height={'20vh'} width={'20vw'} />
			</div>)
		}
		else if (this.state.id) {
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
			const selectList = this.state.cardNameList.map((i, index) => (
				<div>
					<input type="checkbox" value={i} onChange={(e) => this.onCheck(e, i)}></input>
					<label for="vehicle1">{i}</label>
				</div>
			));
			var dataList;
			if (this.state.selectedCardID) {
				dataList = this.state.allInfoData.filter(word => word.offerID === this.state.selectedCardID).map((i, index) => (
					<div className="info-card-holder">
						<NavLink to={"/infos/edit/" + i.offerID} className="info-card-link" style={{ textDecoration: 'none' }}>
							<InfoCard
								key={index}
								infoID={i.offerID}
								cardName={i.cardName}
								infoTitle={i.offerName}
								infoSummary={i.offerAbstract}
							/>
						</NavLink>
					</div>
				));
			} else {
				dataList = this.state.allInfoData.map((i, index) => (
					<div className="info-card-holder">
						<NavLink to={"/infos/edit/" + i.offerID} className="info-card-link" style={{ textDecoration: 'none' }}>
							<InfoCard
								key={index}
								infoID={i.offerID}
								cardName={i.cardName}
								infoTitle={i.offerName}
								infoSummary={i.offerAbstract}
							/>
						</NavLink>
					</div>
				));
			}

			return (
				<BrowserRouter forceRefresh={true}>
					<div>
						{/* <div>
							<input type="checkbox" checked = {true} value="all" onClick={this.checkAll}></input>
							<label for="All">All</label>
							{selectList}
						</div> */}
						<div className="selcet-bank-container">
							<Select options={this.state.bankOptions} onChange={(e) => this.handleSelectBank(e)} value={this.state.selectedBankID} isSearchable={false} />
						</div>
						<div className="selcet-card-container">
							<Select options={this.state.cardOptions} onChange={(e) => this.handleSelectCard(e)} value={this.state.selectedCardID} isSearchable={false} />
						</div>
						<div clssName="select-holder">
							<Select
								options={this.state.IDoptions}
								onChange={(e) => this.handleSelectOfferID(e)}
								value={this.state.selectedCardOption}
								isSearchable={true}
								placeholder="Search Offer ID" />
						</div>
					</div>
					<div className="all-data-container">
						{dataList}
					</div>
				</BrowserRouter>
			);
		}


	}
}

export default Infos

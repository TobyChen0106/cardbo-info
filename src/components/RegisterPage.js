//images
import cancel from '../images/cancel.png'

import React, { Component } from 'react';
import './register.css'
//slider
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

//select
import Select from 'react-select';

// Liff
const liff = window.liff;




// mongoose
const mongoose = require('mongoose');
const User = require('../models/User');
// import User from '../models/User.js'

//temp card data
const _allCards = require('./cards.json');

// import _allCards from './cards.json'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '??',
            userId: undefined,

            nickName: "",
            age: 20,
            gender: "",
            userCards: [],
            cards: [{
                bank: '',
                card: '',
                selectedBank: null,
                selectedCard: null,
                options: []
            }],

            agreeCheck: false,

            bankList: ['台新銀行', '渣打銀行', '彰化銀行', '花旗銀行', '第一銀行', '遠東商銀', '聯邦銀行', '永豐銀行', '元大銀行', '上海商銀', '台北富邦', '兆豐銀行',
                '新光銀行', '中國信託', '星展銀行', '華南銀行', '陽信銀行', '滙豐銀行', '日盛銀行', '國泰世華', '合作金庫', '臺灣企銀',
                '王道銀行', '台灣樂天', '凱基銀行', '玉山銀行', '臺灣銀行', '台中商銀', '土地銀行', '安泰銀行', '三信銀行', '高雄銀行', '華泰銀行',
                '美國運通'],
            allCards: {},
            IDregistered: false
            // allCards: _allCards,
        };

    }
    componentWillMount() {
        fetch('/api/cards').catch(function (error) {
            window.alert("[Error] " + error);
        }).then(
            res => res.json()
        ).then((data) => {
            this.setState({ allCards: data })
            // console.log(data);
        })
        liff.init(async (data) => {
            let profile = await liff.getProfile();
            if (!profile.userId) {
                window.alert("USER ID ERROR!");
            } 
            this.setState({
                displayName: profile.displayName,
                userId: profile.userId
            });
        });
    }
    componentDidMount() {
        if (!this.state.userId) {
            // window.alert("USER ID ERROR!");
        } else {
            fetch('/api/check-users').catch(function (error) {
                window.alert("[Error] " + error);
            }).then(
                res => res.json()
            ).then((data) => {
                if (data) {
                    IDregistered = true;
                    this.setState({ IDregistered: true });
                    this.setState({ agreeCheck: true });

                    this.setState({displayName:data.displayName});
                    this.setState({userId:data.userId});
                    this.setState({nickName:data.nickName});
                    this.setState({age:data.age});
                    this.setState({gender:data.gender});
                    this.setState({userCards:data.userCards});
                } else {
                    this.setState({ IDregistered: false });
                }

            })
        }
    }
    formOnSubmit = () => {
        if (this.state.age === 0) {
            alert('請輸入年齡!');
        }
        else if (!this.state.agreeCheck) {
            alert('請閱讀並同意使用者服務條款!');
        } else {
            var userCards = this.state.cards.filter(card => card.card !== '' && card.bank !== '').map((i, index) => (
                this.state.allCards.filter(card => card.cardName === i.card && card.cardBank === i.bank)[0]
            ));
            // console.log(userCards)

            const newUser = {
                lineID: this.state.userId,
                displayName: this.state.displayName,
                nickName: this.state.nickName,
                age: this.state.age,
                gender: this.state.gender,
                cards: userCards,
                stores: []
            };
            fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).catch(function (error) {
                window.alert("[Error] " + error);
            }).then(
                res => res.json()
            ).then((data) => {
                console.log(data);
            }).then(() => {
                // liff.sendMessages([{
                //     'type': 'text',
                //     'text': "Done!"
                // }])
            }).catch(function (error) {
                window.alert("Error sending message: " + error);
            }).then(() => {
                liff.closeWindow();
            })
        }
    }

    handleNickNameChange = (event) => {
        this.setState({ nickName: event.target.value });
    }

    handleChangeAge = (event) => {
        this.setState({ age: event });
    }

    handleChangeCheck = (event) => {
        this.setState({ agreeCheck: !this.state.agreeCheck });
    }
    handleGenderChange = (gender) => {
        this.setState({ gender: gender });
    }

    handleSelectBank = (e, id) => {
        const label = e.label;
        var new_cards = this.state.cards;

        new_cards[id].options = this.state.allCards.filter(card => card.cardBank === label).map((i, index) => (
            { label: i.cardName, value: index }
        ));
        new_cards[id].bank = label;
        new_cards[id].selectedBank = e;
        this.setState({ cards: new_cards });
    }
    handleSelectCard = (e, id) => {
        const label = e.label;
        var new_cards = this.state.cards;
        new_cards[id].selectedCard = e;
        new_cards[id].card = label;
        this.setState({ cards: new_cards });
    }
    handleCancel = (e, id) => {
        // this.setState(prevState => ({
        //     cards: prevState.cards.splice(id,1)
        // }))
        var new_cards = this.state.cards;
        new_cards.splice(id, 1)
        this.setState({ cards: new_cards })
        // console.log(e)
        console.log(id)
    }
    handleAddCard = () => {
        this.setState(prevState => ({
            cards: [...prevState.cards, { bank: '', card: '', options: [] }]
        }))
    }
    render() {
        const _options = [{ label: "Albania", value: 355 }];
        const bankList = this.state.bankList.map((i, index) => (
            { label: i, value: index }
        ))

        const cardLists = this.state.cards.map((i, index) => (
            <div className="card">
                <div className="selcet-bank-container">
                    <Select options={bankList} onChange={(e) => this.handleSelectBank(e, index)} value={i.selectedBank} isSearchable={false} />
                </div>
                <div className="selcet-card-container">
                    <Select options={i.options} onChange={(e) => this.handleSelectCard(e, index)} value={i.selectedCard} isSearchable={false} />
                </div>
                <button className="cancel-button" onClick={(e) => this.handleCancel(e, index)}>
                    <img src={cancel} className="cancel"></img>
                </button>
            </div>
        ));
        if (this.state.IDregistered) {
            return (
                <div className="register chineese-font">
                    <div id="cardbo-register-data" className="row">
                        <div className="register-title-wrapper">卡伯會員中心</div>
                        <div className="register-title-info" >{this.state.displayName}，您可以在這裡修改您的基本資料:</div>
                    </div>

                    <div className="register-form-contaniner">
                        <div className="row nick-name">
                            <div className="nick-name-title-container">
                                <label>您希望我們如何稱呼您?</label>
                            </div>
                            <div className="nick-name-input-container">
                                <input className="nick-name-input" type="text"
                                    value={this.state.nickName} onChange={this.handleNickNameChange} />
                            </div>
                        </div>
                        <div className="row register-age">
                            <div className="age-container">
                                <div className="age">您的年齡:</div>
                                <div className="age-number">{this.state.age}</div>
                            </div>
                            <div className="age-slider-contain"> <Slider min={0} max={80} defaultValue={20} onChange={this.handleChangeAge} /></div>
                        </div>
                        <div className="row register-gender">
                            <div>您的性別:</div>
                            <div className="option-container">
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Male') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Male" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Male" ? '#ffffff' : '#000000'
                                    }}>
                                    Male
                                </button>
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Other') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Other" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Other" ? '#ffffff' : '#000000'
                                    }}>
                                    Other
                                </button>
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Female') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Female" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Female" ? '#ffffff' : '#000000'
                                    }}>
                                    Female
                                </button>
                            </div>
                        </div>
                        <div className="row manage-card">
                            <div className="my-card-title">
                                輸入您的信用卡:
                            </div>
                            <div className="card-lists-container">
                                <div className="card-lists">
                                    {cardLists}
                                </div>
                                <button className="add-card" onClick={this.handleAddCard}>
                                    + add new card
                                </button>

                            </div>
                        </div>

                        <div className="row">
                            <button className="submit-button" onClick={this.formOnSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="register chineese-font">
                    <div id="cardbo-register-data" className="row">
                        <div className="register-title-wrapper">卡伯會員註冊</div>
                        <div className="register-title-info" >{this.state.displayName}，歡迎註冊卡伯，為了提供更精準的服務，我們需要蒐集一些您的基本資料:</div>
                    </div>

                    <div className="register-form-contaniner">
                        <div className="row nick-name">
                            <div className="nick-name-title-container">
                                <label>您希望我們如何稱呼您?</label>
                            </div>
                            <div className="nick-name-input-container">
                                <input className="nick-name-input" type="text"
                                    value={this.state.nickName} onChange={this.handleNickNameChange} />
                            </div>
                        </div>
                        <div className="row register-age">
                            <div className="age-container">
                                <div className="age">您的年齡:</div>
                                <div className="age-number">{this.state.age}</div>
                            </div>
                            <div className="age-slider-contain"> <Slider min={0} max={80} defaultValue={20} onChange={this.handleChangeAge} /></div>
                        </div>
                        <div className="row register-gender">
                            <div>您的性別:</div>
                            <div className="option-container">
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Male') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Male" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Male" ? '#ffffff' : '#000000'
                                    }}>
                                    Male
                                </button>
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Other') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Other" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Other" ? '#ffffff' : '#000000'
                                    }}>
                                    Other
                                </button>
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Female') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Female" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Female" ? '#ffffff' : '#000000'
                                    }}>
                                    Female
                                </button>
                            </div>
                        </div>
                        <div className="row manage-card">
                            <div className="my-card-title">
                                輸入您的信用卡:
                            </div>
                            <div className="card-lists-container">
                                <div className="card-lists">
                                    {cardLists}
                                </div>
                                <button className="add-card" onClick={this.handleAddCard}>
                                    + add new card
                                </button>

                            </div>
                        </div>
                        <div className="row">
                            <input id="agree" type="checkbox" name="checkbox" value="check" defaultChecked={this.state.agreeCheck} onChange={this.handleChangeCheck} />
                            我已閱讀並同意<a href="#">使用者服務條款</a>
                        </div>
                        <div className="row">
                            <button className="submit-button" onClick={this.formOnSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            );
        }

    }
}
export default App;
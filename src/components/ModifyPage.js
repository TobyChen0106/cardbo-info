import React, { Component } from 'react';
import './register.css'
//slider
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

// Liff
const liff = window.liff;

// mongoose
const mongoose = require('mongoose');
const User = require('../models/User');
// import User from '../models/User.js'



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '??',
            userId: '888',

            nickName: "",
            age: 20,
            gender: "Other",
            cards: [],

            agreeCheck: false,

        };
        liff.init(async (data) => {
            let profile = await liff.getProfile();
            this.setState({
                displayName: profile.displayName,
                userId: profile.userId
            });
        });
    }


    formOnSubmit = () => {
        if (this.state.age === 0) {
            alert('請輸入年齡!');
        }
        else if (!this.state.agreeCheck) {
            alert('請閱讀並同意使用者服務條款!');
        } else {
            const newUser = {
                lineID: this.state.userId,
                displayName: this.state.displayName,
                nickName: this.state.nickName,
                age: this.state.age,
                gender: this.state.gender,
                cards: this.state.cards
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
                liff.sendMessages([{
                    type: 'text',
                    text: "我填完囉!"
                }])
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
    handleChangeGender = (event) => {
        if (event === 0) {
            this.setState({ gender: "Male" });
        } else if (event === 1) {
            this.setState({ gender: "Other" });
        } else if (event === 2) {
            this.setState({ gender: "Female" });
        }
    }
    handleGenderChange = (e) => {
        this.setState({ gender: e.target.value })
    }
    render() {
        return (
            <div className="register chineese-font">
                <div id="cardbo-register-data" className="row">
                    <div className="register-title-wrapper">會員資料修改</div>
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
                        <div className="age-slider-contain"> <Slider min={20} max={80} defaultValue={20} onChange={this.handleChangeAge} /></div>
                    </div>
                    <div className="row register-gender">
                        <div>性別</div>
                        <div className="option-container">
                            <div className="radio">
                                <label>
                                    <input type="radio" value="Male" checked={this.state.gender === 'Male'} onChange={this.handleGenderChange} />
                                    Male
                            </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="Other" checked={this.state.gender === 'Other'} onChange={this.handleGenderChange} />
                                    Other
                            </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="Female" checked={this.state.gender === 'Female'} onChange={this.handleGenderChange} />
                                    Female
                            </label>
                            </div>
                        </div>
                        {/* {this.state.gender}
                        <div className="gender-slider-contain"> <Slider min={0} max={2} defaultValue={1} onChange={this.handleChangeGender} /></div> */}
                    </div>
                    <div className="row manage-card">
                        <div className="my-card-title">"todo 選擇信用卡"</div>
                        <div className="card-lists">

                        </div>
                    </div>
                    <div className="row">
                        <input id="agree" type="checkbox" name="checkbox" value="check" defaultChecked={this.state.agreeCheck} onChange={this.handleChangeCheck} />
                        我已閱讀並同意<a href="#">使用者服務條款</a>
                    </div>
                    <div className="row">
                        <button onClick={this.formOnSubmit}>Submit</button>
                    </div>
                </div>

            </div>
        );
    }
}
export default App;
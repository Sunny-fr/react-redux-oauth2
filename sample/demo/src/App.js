import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {setup, OAuthSignin} from '../../../lib'
import {Provider} from 'react-redux'
import store from './store'

setup(store, {test: '2'})

const Signin = OAuthSignin(class extends Component{
    render(){
        return <button {...this.props} >Sign in</button>
    }
})

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">

                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Demo Oauth2</h2>
                    </div>
                    <p className="App-intro">

                        <Signin provider="github" />
                    </p>
                </div>
            </Provider>
        );
    }
}

export default App;

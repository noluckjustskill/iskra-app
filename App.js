import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage, Keyboard} from 'react-native';

import Splash from './src/components/splash';
import Login from './src/components/login';
import MainScreen from './src/components/main';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currView: 0,
      login: null,
      pass: null,
      inAuth: false,
      badAuth: false,
      authData: {
        key: null,
        auth: null,
        keyInfo: {}
      }
    };
  }

  getAuth = async () => {
    const login = await AsyncStorage.getItem('login'),
      pass = await AsyncStorage.getItem('pass');

    return new Promise(resolve => {
      if (login && pass) {
        this.getKeyAuth(login, pass).then(res => {
          resolve(res);
        });
      }else{
        resolve(false);
      }
    });
  }

  doField(field, data) {
    if (field === "login") {
      const nextState = Object.assign(this.state, {login: data});
      this.setState(nextState);
    } else if (field === "pass") {
      const nextState = Object.assign(this.state, {pass: data});
      this.setState(nextState);
    }
  }

  doAuth = async () => {
    let login = this.state.login;
    let pass = this.state.pass;

    if(login && pass){
      Keyboard.dismiss();

      this.setState(Object.assign(this.state, {inAuth: true}));

      this.getKeyAuth(login, pass).then(data => {
        let nextState;

        if(data){
          nextState = Object.assign(this.state, {currView: 2}, data);

          AsyncStorage.setItem('login', login);
          AsyncStorage.setItem('pass', pass);
        }else{
          nextState = Object.assign(this.state, {currView: 3, badAuth: true});
        }

        this.setState(nextState);
      });
    }
  }

  getKeyAuth = async (login, pass) => {
    return new Promise(resolve => {
      const authFetchParams = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({login: login, password: pass})
      }

      fetch("https://lk.iskra-lab.com/stcl/cm/auth", authFetchParams).then(response => {
        if(response.status === 200){
          return response.json();
        }else{
          return false;
        }
      }).then(data => {
        if(data){
          const keyFetchParams = {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "cookie": "stcl-admin-auth=" + data.auth,
            },
            credentials: "omit"
          }

          fetch("https://lk.iskra-lab.com/stcl/cm/key", keyFetchParams).then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              return false;
            }
          }).then(authData => {
            if(authData){
              const mainFetchParams = {
                method: "GET",
                headers: {
                  "Accept": "text/html",
                  "Content-Type": "text/html; charset=UTF-8",
                  "cookie": "stcl-admin-auth=" + data.auth + "; stcl-admin-key=" + authData.key,
                },
                credentials: "omit"
              }

              fetch("https://lk.iskra-lab.com/start/home/", mainFetchParams).then(response => {
                return response.text();
              }).then(html => {
                const start = html.search("window.iskraKeyInfo = ");
                const stop = html.search("window.iskraRole");

                const json = html.slice(start + 22, stop);

                resolve({
                  authData: {
                    key: authData.key,
                    auth: data.auth,
                    keyInfo: JSON.parse(json.trim().slice(0, -1))
                  }
                });
              });
            }else{
              resolve(false);
            }
          });
        }else{
          resolve(false);
        }
      });
    });
  }

  logOut() {
    AsyncStorage.removeItem('login');
    AsyncStorage.removeItem('pass');

    this.setState({
      currView: 1,
      authData: {
        key: null,
        auth: null,
        keyInfo: {}
      }
    });
  }

  render() {

    if(this.state.authData.key === null && !this.state.badAuth){

      this.getAuth().then(info => {
        if(this.state.inAuth) return;

        let nextState;

        if(info){
          nextState = Object.assign(this.state, {currView: 2}, info);
        }else{
          nextState = Object.assign(this.state, {currView: 1});
        }

        this.setState(nextState);
      });
    }

    if(this.state.currView === 0){

      return (<Splash />);

    }else if(this.state.currView === 1){

      return (<Login isBad={false} doField={this.doField.bind(this)} doAuth={this.doAuth.bind(this)} />);

    }else if(this.state.currView === 2){

      return (<MainScreen keyVal={this.state.authData.key} authVal={this.state.authData.auth} userInfo={this.state.authData.keyInfo} logOut={this.logOut.bind(this)} />);

    }else if(this.state.currView === 3){

      return (<Login isBad={true} doField={this.doField.bind(this)} doAuth={this.doAuth.bind(this)} />);

    }
  }
}

import React, {Component} from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, Image, ActivityIndicator} from 'react-native';

import LoginForm from './loginForm';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      during: false
    };
  }

  proccess() {
    this.props.doAuth();

    this.setState({during: true});
  }

  render() {
    let text = <Text style={styles.text}>Пожалуйста, авторизуйтесь</Text>;
    let form = <LoginForm style={styles.form} doField={this.props.doField} doAuth={this.proccess.bind(this)} />;
    let indicator = <View />;

    if(this.props.isBad){
      text = <Text style={styles.red}>Неверный логин или пароль</Text>
    }else if(this.state.during){
      text = <Text style={styles.text}>Подождите несколько секунд...</Text>;
      form = <View />;
      indicator = <ActivityIndicator style={styles.indicator} size="large" color="white" />
    }

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../images/logo-banner.png')} style={styles.logo} resizeMode="contain" />
          {text}
          {indicator}
        </View>
        
        <View>
          {form}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f3f4e',
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    marginBottom: 5
  },
  loading: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.8)'
  },
  red: {
    textAlign: 'center',
    color: 'red'
  },
  indicator: {
    marginTop: 40
  }
});

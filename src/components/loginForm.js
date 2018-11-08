import React, {Component} from 'react';
import {StyleSheet, Text, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';

export default class Splash extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput 
          placeholder={'Логин'}
          autoCorrect={true}
          onChangeText={(text) => {this.props.doField('login', text)}}
          style={styles.input}
        />
        
        <TextInput 
          placeholder={'Пароль'}
          autoCorrect={true}
          onChangeText={(text) => {this.props.doField('pass', text)}}
          secureTextEntry={true}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={this.props.doAuth}>
          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 5,
    color: 'black',
    marginBottom: 20,
    borderRadius: 3
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc1f25',
    color: 'white',
    marginBottom: 50,
    height: 40,
    borderRadius: 3
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});
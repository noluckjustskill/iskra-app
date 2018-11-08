import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/logo-banner.png')} style={styles.logo} resizeMode="contain" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f3f4e',
  },
  logo: {
    width: '80%'
  }
});

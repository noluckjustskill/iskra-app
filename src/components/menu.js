import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';

const window = Dimensions.get('window');

export default function Menu({ onItemSelected, userInfo, logOut }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.infoContainer}>
        <Text style={[styles.info, {fontWeight: '900'}]}>{userInfo.name}</Text>
        <Text style={styles.info}>{userInfo.title}</Text>
        <Text style={styles.info}>{userInfo.url}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => onItemSelected('Home')} style={[styles.itemButton, styles.itemButtonFirst]}>
          <Image source={require('../images/home.png')} style={styles.icon} />
          <Text style={styles.item}>Домой</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onItemSelected('Stats')} style={styles.itemButton}>
          <Image source={require('../images/performance.png')} style={styles.icon} />
          <Text style={styles.item}>Основные показатели</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onItemSelected('Recommendations')} style={styles.itemButton}>
          <Image source={require('../images/quality.png')} style={styles.icon} /> 
          <Text style={styles.item}>Система рекомендаций</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onItemSelected('Mail')} style={styles.itemButton}>
          <Image source={require('../images/envelope.png')} style={styles.icon} /> 
          <Text style={styles.item}>Почтовая рассылка</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onItemSelected('Interests')} style={styles.itemButton}>
          <Image source={require('../images/interest.png')} style={styles.icon} /> 
          <Text style={styles.item}>Интересы</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={logOut} style={[styles.itemButton, styles.itemButtonLast]}>
          <Image source={require('../images/logout.png')} style={styles.icon} /> 
          <Text style={styles.item}>Выход</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
    menu: {
      flex: 1,
      width: window.width,
      height: window.height,
      backgroundColor: '#212121'
    },
    infoContainer: {
      backgroundColor: 'black',
      paddingVertical: 20,
      borderBottomColor: 'rgb(259,54,36)',
      borderBottomWidth: 2,
      marginBottom: 20
    },
    info: {
      color: 'white',
      fontSize: 14,
      fontWeight: '300',
      paddingTop: 5,
      marginLeft: 15
    },
    itemButton: {
      flexDirection: 'row',
      height: 40,
      paddingHorizontal: 15,
      borderTopColor: '#666',
      borderTopWidth: 1,
      borderBottomColor: '#666',
      borderBottomWidth: 1,
    },
    itemButtonFirst: {
      borderTopColor: '#666',
      borderTopWidth: 2
    },
    itemButtonLast: {
      borderBottomColor: '#666',
      borderBottomWidth: 2
    },
    item: {
      color: 'white',
      marginVertical: 10,
      textAlignVertical: 'center',
    },
    icon: {
      width: 25,
      height: 25,
      marginRight: 10,
      marginTop: 7,
      resizeMode: 'contain'
    }
});

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
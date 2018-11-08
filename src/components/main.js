import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import SideMenu from 'react-native-side-menu';

import Menu from './menu';

export default class MainScreen extends Component {
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.updateMenuState = this.updateMenuState.bind(this);
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this);

        this.state = {
            isOpen: false,
            selectedItem: 'Home',
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({
            isOpen
        });
    }

    onMenuItemSelected(item) {
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    }

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} userInfo={this.props.userInfo} logOut={this.props.logOut} />;

        return (
            <SideMenu menu={menu} style={styles.side} isOpen={this.state.isOpen} onChange={isOpen => this.updateMenuState(isOpen)} >
                <View style={styles.container}>
                    <Text>Страница: {this.state.selectedItem}</Text>

                    <TouchableOpacity onPress={this.props.logOut}>
                        <Text>Выйти</Text>
                    </TouchableOpacity>
                </View>
            </SideMenu>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';

import SideMenu from 'react-native-side-menu';
import DatePicker from 'react-native-date-ranges';

import Menu from './menu';
import Charts from './charts';

const screenHeight = Dimensions.get('window').height;

export default class MainScreen extends Component {
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.updateMenuState = this.updateMenuState.bind(this);
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this);

        this.state = {
            isOpen: false,
            selectedItem: 'Главная',
            itemNum: 1
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
        this.setState(prev => ({
            isOpen: false,
            selectedItem: item,
            itemNum: prev.itemNum + 1
        }));
    }

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} userInfo={this.props.userInfo} logOut={this.props.logOut} />;

        return (
            <SideMenu menu={menu} style={styles.side} isOpen={this.state.isOpen} onChange={isOpen => this.updateMenuState(isOpen)} >
                <View style={styles.container}>
                    <View style={styles.header} elevation={5}>
                        <TouchableOpacity onPress={this.toggle} style={styles.menuButton}>
                            <Image source={require('../images/menu.png')} style={styles.menuButtonImage} /> 
                        </TouchableOpacity> 

                        <Text style={styles.page}>{this.state.selectedItem}</Text>
                    </View>

                    <CurrView page={this.state.selectedItem} keyVal={this.props.keyVal} authVal={this.props.authVal} data={this.props.userInfo} newPage={this.state.itemNum} />
                </View>
            </SideMenu>
        );
    }
}

class CurrView extends Component {
    constructor(props){
        super(props);

        const now = new Date();

        this.state = {
            start: now.getUTCFullYear() + "-" + now.getUTCMonth() + "-" + now.getUTCDate(),
            end: now.getUTCFullYear() + "-" + (now.getUTCMonth()  + 1) + "-" + now.getUTCDate(),
            renew: 1
        };
    }

    setDate(obj) {
        const s = obj.startDate;
        const e = obj.endDate;

        this.setState(prev => (
            {
                start: s,
                end: e,
                renew: prev.renew + 1
            }
        ));
    }

    render() {
        const data = this.props.data;

        if (this.props.page === 'Главная') {
            return (
                <View style={styles.area} elevation={5}>
                    <Text style={styles.title}>{"Добро пожаловать"}</Text>

                    <View style={styles.line}>
                        <Text style={{ fontWeight: '600' }}>{"Клиент: "}</Text><Text>{data.title}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={{ fontWeight: '600' }}>{"Ключ: "}</Text><Text>{this.props.keyVal}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={{ fontWeight: '600' }}>{"Администратор: "}</Text><Text>{data.name}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={{ fontWeight: '600' }}>{"Активен: "}</Text><Text>{!data.disabled ? "Да" : "Нет"}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={{ fontWeight: '600' }}>{"Интеграция: "}</Text><Text>{data.integrated ? "Да" : "Нет"}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={{ fontWeight: '600' }}>{"Баланс: "}</Text><Text>{data.balance ? data.balance : "-"}</Text>
                    </View>
                    <View style={[styles.line, styles.lastLine]}>
                        <Text style={{ fontWeight: '600' }}>{"URL сайта: "}</Text><Text>{data.url}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <ScrollView style={styles.scroll} contentContainerStyle={styles.area} scrollsToTop={false}>
                    <DatePicker
                        style = {styles.picker}
                        customStyles = {{
                            placeholderText: {
                                fontSize: 14,
                                color: '#24292e'
                            },
                            headerStyle: {
                                backgroundColor: '#2f3f4e'
                            },
                            headerMarkTitle: {
                                fontSize: 20,
                                color: 'white'
                            }
                        }}
                        returnFormat = {'YYYY-MM-DD'}
                        outFormat = {'YYYY-MM-DD'}
                        placeholder = { '📅 ' + this.state.start + ' 一 ' + this.state.end }
                        markText = {'Выберете дату'}
                        ButtonText = {'Применить'}
                        mode = {'range'}
                        onConfirm = {this.setDate.bind(this)}
                    />

                    <Charts from={this.state.start} to={this.state.end} keyVal={this.props.keyVal} authVal={this.props.authVal} type={this.props.page} renew={this.state.renew + this.props.newPage} />
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'black',
        borderBottomColor: 'rgb(259,54,36)',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    menuButton: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    menuButtonImage: {
        width: 30,
        height: 30,
        margin: 5,
        resizeMode: 'contain'
    },
    page: {
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: '800'
    },
    scroll: {
        flex: 1,
        width: '100%',
        height: screenHeight - 70,
    },
    area: {
        position: 'relative',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 10
    },
    line: {
        flexDirection: 'row',
        marginBottom: 5
    },
    lastLine: {
        paddingBottom: 20,
        borderBottomColor: 'rgba(24,54,84,0.85)',
        borderBottomWidth: 1
    },
    picker: {
        height: 40,
        borderColor: '#2f3f4e',
        borderRadius: 5
    }
});

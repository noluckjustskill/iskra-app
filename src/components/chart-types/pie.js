import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width ;

export default class PieChartView extends Component {
    render() {
        const chartConfig = {
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(47, 63, 78, ${opacity})`,
            decimalPlaces: 0
        };

        const colors = ['rgb(62, 141, 210)', 'rgb(18, 80, 134)', 'rgb(255, 23, 23)', '#082e50'];
        const vals = {};
        const list = Object.values(this.props.chartData);

        list.forEach(val => {
            let arr = val.split(",");

            arr.forEach((val, i) => {
                if(vals[i]){
                    vals[i] += Math.floor(parseFloat(val));
                } else {
                    vals[i] = Math.floor(parseFloat(val));
                }
            });
        });

        let visible = true;

        const data = Object.values(vals).map((val, index) => {
            visible = visible && val > 0;

            return { name: this.props.chartInfo.layers[index], population: val/list.length, color: colors[index], legendFontColor: '#666', legendFontSize: 13 }
        });


        return (
            <View style={styles.chartArea} elevation={5}>
                {visible ?
                    <PieChart style={styles.chart} data={data} width={screenWidth - 40} height={250} chartConfig={chartConfig} accessor={"population"} backgroundColor={"transparent"} paddingLeft={"30"} />
                : <Text style={styles.empty}>{"Нет данных"}</Text>}

                <Text style={styles.title}>{this.props.chartInfo.name || ""}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chartArea: {
        marginBottom: 20,
        height: 290
    },
    chart: {
        height: 240,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5
    },
    title: {
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '800',
        color: '#2f3f4e',
        borderBottomWidth: 1,
        borderBottomColor: '#2f3f4e',
        width: screenWidth - 40
    },
    empty: {
        fontSize: 17,
        color: '#2f3f4e',
        textAlign: 'center',
        height: 40,
        alignSelf: 'center',
        marginVertical: 100
    }
});
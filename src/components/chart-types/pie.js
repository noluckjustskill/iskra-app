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
        }

        let val1 = 0, val2 = 0, val3 = 0;
        const list = Object.values(this.props.chartData);

        list.forEach(val => {
            let arr = val.split(",");

            val1 += parseInt(arr[0]);
            val2 += parseInt(arr[1]);
        });

        val1 = Math.round(val1/list.length);
        val2 = Math.round(val2/list.length);
        val3 = 100 - val2 - val1;

        const data = [
            { name: 'Ушли', population: val1, color: 'rgb(62, 141, 210)', legendFontColor: '#666', legendFontSize: 13 },
            { name: 'До цели', population: val2, color: 'rgb(18, 80, 134)', legendFontColor: '#666', legendFontSize: 13 },
            { name: 'Купили', population: val3, color: 'rgb(255, 23, 23)', legendFontColor: '#666', legendFontSize: 13 },
        ]

        return (
            <View style={styles.chartArea} elevation={5}>
                <PieChart style={styles.chart} data={data} width={screenWidth - 40} height={250} chartConfig={chartConfig} accessor={"population"} backgroundColor={"transparent"} paddingLeft={"30"} />      

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
        color: '#2f3f4e',
        borderBottomWidth: 1,
        borderBottomColor: '#2f3f4e'
    }
});
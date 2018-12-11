import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default class InterestsChartView extends Component {
    render() {
        const chartConfig = {
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(47, 63, 78, ${opacity})`,
            decimalPlaces: 0,
            horizontalLines: true
        }

        const group = this.props.chartInfo.group;
        const labels = [], dataSet = [];
        let result = 0;
        
        this.props.chartData.slice(0, group).forEach(val => {
            labels.push(val[0]);

            const sense = Math.round(parseFloat(val[1]));
            result += sense;
            dataSet.push(sense);
        });

        let other = 0;
        this.props.chartData.forEach((val, i) => {
            if(i > group) other += parseFloat(val[1]);
        });

        labels.push("Другое");
        dataSet.push(Math.round(other));

        const data = {
            labels: labels,
            datasets: [{
                data: dataSet
            }]
        }

        const calc = !this.props.chartInfo.noCalc;

        if (this.props.chartInfo.average){
            result = result / Object.keys(this.props.chartData).length;
        }

        return (
            <View style={styles.chartArea}>
                <BarChart style={styles.chart} data={data} width={screenWidth - 30} height={250} chartConfig={chartConfig} />

                <View style={styles.title}>
                    <Text style={[styles.titleText, {fontWeight: '800'}]}>{this.props.chartInfo.name + (calc ? ": " : "")}</Text>
                    {calc && <Text style={styles.titleText}>{Math.round(result) + " за период"}</Text>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chartArea: {
        height: 290,
        overflow: 'hidden'
    },
    chart: {
        height: 240,
        marginLeft: -30,
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 15,
        color: '#2f3f4e'
    }
});
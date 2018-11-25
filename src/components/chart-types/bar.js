import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default class BarChartView extends Component {
    render() {
        const chartConfig = {
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(47, 63, 78, ${opacity})`,
            decimalPlaces: 0
        }

        let labels = Object.keys(this.props.chartData).map(d => { return d.slice(5) });
        const indexes = [];

        if(labels.length > 5){
            labels = labels.filter((l, i, self) => {
                if( (i + 1) % Math.ceil(self.length / 5) == 0 || i == 0 || (i + 1) == labels.length ) {
                    indexes.push(i);

                    return true;
                } else {
                    return false;
                }
            });
        }

        let result = 0;
        const data = {
            labels: labels,
            datasets: [{
                data: Object.values(this.props.chartData).map(v => { 
                    const val = parseInt(v);
                    result += val;
                    
                    return val;
                }).filter((v, i) => {
                    if(indexes.length){
                        return indexes.indexOf(i) !== -1;
                    } else {
                        return true;
                    }
                })
            }]
        }

        return (
            <View style={styles.chartArea} elevation={5}>
                <BarChart style={styles.chart} data={data} width={screenWidth} height={250} chartConfig={chartConfig} />

                <View style={styles.title}>
                    <Text style={[styles.titleText, {fontWeight: '800'}]}>{this.props.chartInfo.name + ": "}</Text>
                    <Text style={styles.titleText}>{Math.round(result) + " за период"}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chartArea: {
        marginBottom: 20,
        height: 290,
        overflow: 'hidden'
    },
    chart: {
        height: 240,
        marginLeft: -40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#2f3f4e'
    },
    titleText: {
        fontSize: 15,
        color: '#2f3f4e'
    }
});
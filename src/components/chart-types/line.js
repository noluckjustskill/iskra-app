import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {LineChart} from '../../libs/react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default class LineChartView extends Component {
    render() {
        const chartConfig = {
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(47, 63, 78, ${opacity})`,
            decimalPlaces: 0,
            verticalLines: false,
            horizontalLines: true
        }

        let labels = Object.keys(this.props.chartData);
        
        if (this.props.chartInfo.slice) {
            if(this.props.chartInfo.slice > 0)
                labels = labels.map(d => { return d.slice(this.props.chartInfo.slice) });
            else
                labels = labels.map(d => { return d.slice(0, (-1) * this.props.chartInfo.slice) });
        }

        const group = typeof this.props.chartInfo.group === "number" ? this.props.chartInfo.group : 0;
        const indexes = [];

        if (group > 0){
            if(labels.length > group){
                labels = labels.filter((l, i, self) => {
                    return (i + 1) % Math.ceil(self.length / group) == 0 || i == 0 || (i + 1) == labels.length
                });
            }
        } else if (group < 0) {
            labels = labels.filter((l, i) => {
                if(i < -group){
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
                    const valRaw = typeof v === "string" ? parseFloat(v.length ? v.split(",")[0] : 0) : v;
                    const val = Math.round(valRaw);

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

        const calc = !this.props.chartInfo.noCalc;

        if (this.props.chartInfo.average){
            result = result / Object.keys(this.props.chartData).length;
        }

        return (
            <View style={styles.chartArea}>
                <LineChart style={styles.chart} data={data} width={screenWidth - 30} height={250} chartConfig={chartConfig} bezier />

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
        height: 290
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
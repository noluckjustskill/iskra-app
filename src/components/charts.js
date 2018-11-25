import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';

import BarChartView from './chart-types/bar';
import LineChartView from './chart-types/line';
import PieChartView from './chart-types/pie';

const chartTypes = require('../../config/chart-types');

export default class Charts extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            blocks: false,
        }
    }

    fetchData = async (item, from, to) => { 
        const url = "https://lk.iskra-lab.com/statistics/general/cgi/timechart.php?from=" + from +"&to=" + to + "&group=day&item=" + item;

        const params = {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "cookie": "stcl-admin-auth=" + this.props.authVal + "; stcl-admin-key=" + this.props.keyVal,
            },
            credentials: "omit"
        }

        return new Promise(resolve => {
            fetch(url, params).then(response => {
                if(response.status == 200)
                    return response.json();
                else
                    return {};
            }).then(data => {
                resolve(data);
            });
        });
    }

    genCharts = async (page) => {
        const all = (chartTypes[this.props.type] || []).map((chart, i) => {
            return new Promise(resolve => {
                this.fetchData(chart.item, this.props.from, this.props.to).then(data => {
                    if(chart.type === 'line'){
                        resolve(<LineChartView key={i} style={styles.chart} chartData={data} chartInfo={chart.info} />);
                    }else if(chart.type === 'pie'){
                        resolve(<PieChartView key={i} style={styles.chart} chartData={data} chartInfo={chart.info} />);
                    }else if(chart.type === 'columns'){
                        resolve(<BarChartView key={i} style={styles.chart} chartData={data} chartInfo={chart.info} />);
                    }
                });
            });
        });

        Promise.all(all).then(views => {
            this.setState({ blocks: views, renew: this.props.renew });
        });
    }

    render() {
        if( !this.state.blocks || this.state.renew < this.props.renew){
            setTimeout(this.genCharts, 1000);

            return (
                <View style={styles.container}>
                    <ActivityIndicator styles={styles.loader} size="large" color="#2f3f4e" />
                </View>
            );
        } else {
            return (
                <View style={styles.chartsContainer}>
                    {this.state.blocks}
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 50
    },
    chartsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginTop: 20
    },
});
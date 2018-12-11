import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';

import CardView from 'react-native-cardview';
import BarChartView from './chart-types/bar';
import LineChartView from './chart-types/line';
import PieChartView from './chart-types/pie';
import InterestsChartView from './chart-types/interests';

const chartTypes = require('../../config/chart-types');

export default class Charts extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            blocks: false,
        }
    }

    fetchData = async (item, from, to, mode) => { 
        const url = "https://lk.iskra-lab.com/statistics/general/cgi/" + (mode || "timechart") + ".php?from=" + from +"&to=" + to + (!mode ? "&group=day" : "") + (item ? ("&item=" + item) : "");

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
                this.fetchData(chart.item, this.props.from, this.props.to, chart.mode).then(data => {
                    if(chart.type === 'line'){
                        resolve(
                            <CardView key={i} cardElevation={5} cardMaxElevation={5} cornerRadius={3} style={styles.chart}>
                                <LineChartView chartData={data} chartInfo={chart.info} />
                            </CardView>
                        );
                    }else if(chart.type === 'pie'){
                        resolve(
                            <CardView key={i} cardElevation={5} cardMaxElevation={5} cornerRadius={3} style={styles.chart}>
                                <PieChartView chartData={data} chartInfo={chart.info} />
                            </CardView>    
                        );
                    }else if(chart.type === 'columns'){
                        resolve(
                            <CardView key={i} cardElevation={5} cardMaxElevation={5} cornerRadius={3} style={styles.chart}>
                                <BarChartView chartData={data} chartInfo={chart.info} />
                            </CardView>
                        );
                    }else if(chart.type === 'interests'){
                        resolve([
                            <CardView key={Math.random()} cardElevation={5} cardMaxElevation={5} cornerRadius={3} style={styles.chart}>
                                <InterestsChartView chartData={Object.values(data)[0]} chartInfo={chart.info.catalog} />
                            </CardView>,
                            <CardView key={Math.random()} cardElevation={5} cardMaxElevation={5} cornerRadius={3} style={styles.chart}>
                                <InterestsChartView chartData={Object.values(data)[1]} chartInfo={chart.info.cost} />
                            </CardView>
                        ]);
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
    chart: {
        marginBottom: 20,
        padding: 10
    }
});
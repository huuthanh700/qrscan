import React from 'react';
import { StackNavigator } from 'react-navigation';
import QrScan from './screen/QrScan';
import ResultScan from './screen/ResultScan';

export const QrScanStack = StackNavigator({
    QrScan: { screen: QrScan, navigationOptions: { title: null, header: null } },
    ResultScan: { screen: ResultScan, navigationOptions: { title: null, header: null } }
})

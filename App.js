/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { QrScanStack } from './src/Router';


export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <QrScanStack />
      </View>
    );
  }
}

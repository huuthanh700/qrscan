import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';

const width = Dimensions.get('window').width;

class Header extends Component {
    constructor(props) {

    }

    render() {
        return (
            <View
                style={{ width, height: 50 }}>
            </View>
        )
    }
}
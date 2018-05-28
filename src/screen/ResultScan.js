import React, { Component } from 'react'
import { View, Text } from 'react-native';
import Headers from '../Header'

export default class ResultScan extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <Headers title='QrScan' backIcon={true} navigation={this.props.navigation} />
                <Text>
                    ResultScan
                    </Text>
            </View>
        )
    }
}
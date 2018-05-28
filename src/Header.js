import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';

const width = Dimensions.get('window').width;

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <StatusBar backgroundColor="#D3D3D3" translucent={false} barStyle="light-content" />
                {this.props.title ?
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.0)', width, alignItems: 'center', justifyContent: 'center', paddingTop: 15, paddingBottom: 15 }}>
                        <Text style={{ fontSize: 16 }}>{this.props.title}</Text>
                    </View>
                    : null}
                {this.props.backIcon ?
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 35, left: 5 }}
                        onPress={() => this.props.navigation.goBack()}>
                        <SimpleLineIcons
                            name='arrow-left'
                            style={{ color: 'black', fontSize: 20, width: 50, height: 30, backgroundColor: 'transparent' }} />
                    </TouchableOpacity>
                    : null}
            </View>

        )
    }
}
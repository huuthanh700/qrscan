import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
const width = Dimensions.get('window').width;

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <StatusBar backgroundColor="#03A9F4" translucent={false} barStyle="light-content" />
                {this.props.title ?
                    <View style={{ backgroundColor: '#03A9F4', width, alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 16, color: 'white' }}>{this.props.title}</Text>
                    </View>
                    : null}
                {this.props.backIcon ?
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 10, left: 5 }}
                        onPress={() => this.props.navigation.goBack()}>
                        <View
                            style={{ flexDirection: 'row' }}>
                            <SimpleLineIcons
                                name='arrow-left'
                                style={{ color: 'white', fontSize: 20, width: 50, height: 30, backgroundColor: 'transparent' }}
                            />
                        </View>
                    </TouchableOpacity>
                    : null}
            </View>

        )
    }
}
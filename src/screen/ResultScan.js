import React, { Component } from 'react'
import { View, Text, Clipboard, TouchableOpacity, Alert, StyleSheet, Dimensions, Linking } from 'react-native';
import Headers from '../Header'

const width = Dimensions.get('window').width;

export default class ResultScan extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    copyToClipboard(content) {
        Clipboard.setString(content);
        Alert.alert('Notification', 'Copied', [{ text: 'Cancel' }]);
    }

    openBrowser(url) {
        Linking.canOpenURL(url).then((supported) => {
            console.log(supported)
            if (supported) {
                Linking.openURL(url)
            } else {
                Alert.alert('Notification', 'Device not supported for open: (' + url + ') in browser', [{ text: 'Cancel' }]);
            }
        })
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={{ flex: 1 }}>
                <Headers title='Scan result' backIcon={true} navigation={this.props.navigation} />
                <Text
                    style={{ fontSize: 18, padding: 10 }}>
                    {params.result}
                </Text>
                <View
                    style={{ width, position: 'absolute', bottom: 0, flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={style.button}
                        onPress={() => this.copyToClipboard(params.result + '')}>
                        <Text style={style.textButton}>Copy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.button}
                        onPress={() => { this.openBrowser(params.result) }}>
                        <Text style={style.textButton}>Open With Browser</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'OpenSans-Semibold',
        backgroundColor: '#03A9F4',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#03A9F4',
        margin: 5,
        padding: 5
    },
    textButton: {
        fontSize: 16,
        color: 'white',
    }
})
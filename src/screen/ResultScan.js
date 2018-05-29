import React, { Component } from 'react'
import { View, Text, Clipboard, TouchableOpacity, Alert, StyleSheet, Dimensions, Linking } from 'react-native';
import Headers from '../Header'
import { AdMobBanner } from 'react-native-admob'
const width = Dimensions.get('window').width;

export default class ResultScan extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    copyToClipboard(content) {
        Clipboard.setString(content);
        Alert.alert('Notification', 'Copied', [{ text: 'Ok' }]);
    }

    openBrowser(url) {
        Linking.canOpenURL(url).then((supported) => {
            console.log(supported)
            if (supported) {
                Linking.openURL(url)
            } else {
                Alert.alert('Notification', 'Device not supported for open: (' + url + ') in browser', [{ text: 'Ok' }]);
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
                <View style={{ width }}>
                    <AdMobBanner
                        adSize="smartBannerLandscape"
                        // adUnitID="ca-app-pub-3940256099942544/6300978111"
                        // adUnitID="ca-app-pub-5240213001950699/8246735508"
                        adUnitID="ca-app-pub-4614657181481018/5479480678"
                    />
                </View>
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
            </View >
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
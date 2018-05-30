import React, { Component } from 'react'
import { View, Text, Clipboard, TouchableOpacity, Alert, StyleSheet, Dimensions, Linking, AsyncStorage } from 'react-native';
import Headers from '../Header';
import { AdMobBanner } from 'react-native-admob';
import Share from 'react-native-share';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ResultScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAds: false
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

    shareResult = async (result) => {
        try {
            const value = await AsyncStorage.getItem('shareIndex');
            console.log(value)
            if (value !== null) {
                valueInt = parseInt(value);
                if (valueInt >= 2) {
                    valueInt = 0;
                    await AsyncStorage.setItem('shareIndex', valueInt + '');
                    this.openShare(result);
                    this.setState({ showAds: true })
                } else {
                    valueInt = valueInt + 1;
                    await AsyncStorage.setItem('shareIndex', valueInt + '');
                    this.openShare(result);
                    this.setState({ showAds: false })
                }
            } else {
                try {
                    await AsyncStorage.setItem('shareIndex', '0');
                    this.openShare(result);
                } catch (error) {
                    // Error saving data
                    this.openShare(result);
                }
            }
        } catch (error) {
            this.openShare(result);
        }
    }

    openShare(result) {
        Share.open({
            title: "QrScan-TruthTeam",
            message: result,
        }).then((respone) => {
            console.log(respone)
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
                <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
                    <AdMobBanner
                        adSize="mediumRectangle"
                        adUnitID="ca-app-pub-4614657181481018/5479480678"
                    // adUnitID="ca-app-pub-3940256099942544/6300978111" //google ads test
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
                    <TouchableOpacity
                        style={style.button}
                        onPress={() => { this.shareResult(params.result) }}>
                        <Text style={style.textButton}>Share</Text>
                    </TouchableOpacity>
                </View>

                {this.state.showAds ?
                    <View style={{
                        backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', top: 0, left: 0, right: 0,
                        width, height, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                                position: 'absolute', top: 10, right: 10, padding: 5,
                                backgroundColor: '#03A9F4', borderWidth: 1,
                                borderRadius: 10, borderColor: '#03A9F4', justifyContent: 'center', alignItems: 'center'
                            }}
                            onPress={() => { this.setState({ showAds: false }) }}>
                            <Text style={{ color: 'white' }}>Close Ads</Text>
                        </TouchableOpacity>
                        <AdMobBanner
                            adSize="mediumRectangle"
                            // adUnitID="ca-app-pub-3940256099942544/6300978111"
                            adUnitID="ca-app-pub-4614657181481018/5479480678" />
                    </View>
                    : null
                }
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
        textAlign: 'center'
    }
})
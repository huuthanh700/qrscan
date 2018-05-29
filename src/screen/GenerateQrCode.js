import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Headers from '../Header';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import QRCode from 'react-native-qrcode-svg';

const width = Dimensions.get('window').width;

export default class GenerateQrCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            genQR: false
        }
    }

    saveRef(data) {
        this.svg = data;
    }

    render() {
        let logoFromFile = require('../assets/QRAppIcon.png');

        return (
            <View style={{ flex: 1 }}>
                <Headers title='Generate QR code' backIcon={true} navigation={this.props.navigation} />
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                            <TextInput
                                style={{ height: 100, padding: 10, backgroundColor: 'white', borderRadius: 5, fontSize: 16 }}
                                underlineColorAndroid='transparent'
                                placeholder="Enter value for gen QR code here"
                                placeholderTextColor={'#50666'}
                                onChangeText={(value) => {
                                    this.setState({ genQR: false, value: value })
                                }}
                                multiline={true}
                                value={this.state.value}
                                returnKeyType='go'
                                maxLength={300}>
                            </TextInput>
                        </TouchableWithoutFeedback>
                    </View>
                    <View
                        style={{ alignItems: 'center' }}>
                        <Ionicons name='md-arrow-round-down'
                            style={{ color: '#03A9F4', width: 30, height: 40, fontSize: 40, backgroundColor: 'transparent' }} />
                    </View>
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: "OpenSans-Semibold" }}>QR code generate here</Text>
                        {this.state.genQR ?
                            <View
                                style={{
                                    flex: 1, marginTop: 10, backgroundColor: 'white', padding: 5,
                                }}>
                                <QRCode
                                    value={this.state.value}
                                    logo={logoFromFile}
                                    logoBackgroundColor='#536DFE'
                                    logoSize={25}
                                    logoBorderRadius={40}
                                    logoMargin={10}
                                    size={250}
                                    color='#03A9F4'
                                    getRef={(data) => { this.saveRef(data) }}
                                />
                            </View>
                            : <View
                                style={{
                                    flex: 1,
                                    width: 250, height: 250, marginTop: 10, backgroundColor: 'white', padding: 5
                                }}>

                            </View>}
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={style.button}
                    onPress={() => { this.setState({ genQR: true }) }}>
                    <Text style={style.buttonText}>Generate</Text>
                </TouchableOpacity>
            </View >
        )
    }
}

const style = StyleSheet.create({
    buttonText: {
        paddingVertical: 12,
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "OpenSans-Semibold",
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'OpenSans-Semibold',
        backgroundColor: '#03A9F4',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        borderColor: '#03A9F4',
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10
    }

});
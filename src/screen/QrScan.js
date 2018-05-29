import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, Alert, Platform, PermissionsAndroid } from 'react-native';
import Headers from '../Header'
import Camera from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import QRCodeReadImage from '../module/QrCodeReadImage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class QrScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flash: false,
            permission: false
        }
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            this.requestCameraPermission();
        }
    }
    
    componentWillUnmount() {
        this.camera = null;
    }
    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            )

            if (granted || granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({ permission: true })
            } else {
                this.setState({ permission: false })
                Alert.alert('Notification', 'This app need permission camera for scan QR code.', [{ text: 'Ok' }]);
            }
        } catch (err) {
            console.warn(err)
        }
    }

    flashMode(flash) {
        if (flash) {
            this.setState({
                flash: false
            })
        } else {
            this.setState({
                flash: true
            })
        }
    }

    pickImageGallery() {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
        }).then(image => {
            var path = '';
            if (Platform.OS === 'ios') {
                path = image.path;
            } else {
                path = image.path.substr(7);
            }

            QRCodeReadImage.decode(path, (error, result) => {
                console.log("READ", error + '-' + result)
                if (result) {
                    this.onBarCodeLocalRead(result);
                } else {
                    Alert.alert('Notification', 'Cannot read QR code from local image, try again !!', [{ text: 'Ok' }]);
                }
            });
        }).catch(error => {

        });
    }

    onBarCodeLocalRead(result) {
        this.props.navigation.navigate('ResultScan', { result: result });
    }

    onBarCodeScan = (e) => {
        var scanData = e.data;
        this.props.navigation.navigate('ResultScan', { result: scanData });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Headers backIcon={false} navigation={this.props.navigation} />
                {this.state.permission ?
                    <Camera
                        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
                        onBarCodeRead={this.onBarCodeScan}
                        ref={cam => this.camera = cam}
                        flashMode={Camera.constants.FlashMode.on}>
                        <Image style={{ position: 'absolute', width: width, height: height }}
                            source={require('../assets/bgQRcode.png')} />
                    </Camera>
                    : null}
                <TouchableOpacity
                    style={{
                        position: 'absolute', position: 'absolute', top: 0, left: 10, marginTop: 20,
                        backgroundColor: this.state.flash ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.1)',
                        padding: 10,
                        borderRadius: 25,
                        borderWidth: 0.3,
                        borderColor: 'white', alignItems: 'center', justifyContent: 'center'
                    }}
                    onPress={() => this.flashMode(this.state.flash)}>
                    <Image style={{ width: 20, height: 20 }} source={require('../assets/Flash.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 0, right: 10, marginTop: 25, justifyContent: 'center', alignItems: 'center'
                }}
                    onPress={() => { this.props.navigation.navigate('GenerateQrCode') }}>
                    <Ionicons name="ios-qr-scanner-outline"
                        style={{ color: 'white', fontSize: 30, width: 30, height: 30, backgroundColor: 'transparent' }} />
                    <Text style={{ fontSize: 14, color: 'white' }}>Generate QR code</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10 }}>
                    <TouchableOpacity style={{
                        borderWidth: 0.3,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: 25,
                        borderColor: 'white', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                    }}
                        onPress={() => { this.pickImageGallery() }}>
                        <Image style={{ width: 20, height: 20 }} source={require('../assets/Image.png')} />
                        <Text style={[styles.buttonTextTransparent, styles.textRegular]}>
                            GALERY</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    buttonTextTransparent: {
        paddingVertical: 12,
        color: '#fff',
        fontSize: 13,
        textAlign: 'center',
        overflow: 'hidden',
        fontFamily: "OpenSans-Semibold",
        marginLeft: 10
    }
});
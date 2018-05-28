import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import Headers from '../Header'
import Camera from 'react-native-camera';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class QrScan extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Headers title='QrScan' backIcon={false} navigation={this.props.navigation} />
                <Camera
                    style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
                    ref={cam => this.camera = cam}>
                    <Image style={{ position: 'absolute', width: width, height: height }}
                        source={require('../assets/bgQRcode.png')} />
                </Camera>
                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10 }}>
                    <TouchableOpacity style={{
                        borderWidth: 0.3,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: 25,
                        borderColor: 'white', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Image style={{ width: 20, height: 20 }} source={require('../assets/Flash.png')} />
                        <Text style={[styles.buttonTextTransparent, styles.textRegular]}>FLASH</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        borderWidth: 0.3,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: 25,
                        borderColor: 'white', flex: 1, marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                    }}
                        onPress={() => { this.pickImageGallery() }}>
                        <Image style={{ width: 20, height: 20 }} source={require('../assets/Image.png')} />
                        <Text style={[styles.buttonTextTransparent, styles.textRegular]}>
                            THƯ VIỆN ẢNH</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
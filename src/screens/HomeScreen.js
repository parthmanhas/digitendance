import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const HomeScreen = props => {

    const goToQRCodeScanScreen = () => {
        props.navigation.navigate('QRScan');
    }

    return (

        <View style={styles.container}>
            <Button title='Scan QR' onPress={goToQRCodeScanScreen} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#efefef'

    }
});

export default HomeScreen;
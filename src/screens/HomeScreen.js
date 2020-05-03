import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Spinner } from 'native-base'
import * as firebaseWrapper from '../components/firebaseWrapper';
import * as colors from '../constants/color';

const HomeScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);

    const loginUser = (email, password) => {
        //add email validation
        //dislay error when validation goes wrong
        setShowActivityIndicator(true);
        firebaseWrapper.Login(email, password, props, setShowActivityIndicator);
    }

    return (
        <Container style={styles.screen}>
            <View style={styles.logo}>
                <Image source={require('../assets/logo.png')} style={{ width: 150, height: 150 }} />
            </View>
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Item>
                <Spinner animating={showActivityIndicator} />
                <View>
                    <Button
                        full
                        success
                        disabled={showActivityIndicator}
                        style={showActivityIndicator ? { borderRadius: 6, backgroundColor: '#bdbdbd' } : { borderRadius: 6, backgroundColor: '#009688' }}
                        onPress={() => loginUser(email, password)}
                    >
                        <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
                    </Button>
                </View>

                <View>
                    <Button
                        onPress={() => props.navigation.navigate('SignUpScreen')}
                        style={showActivityIndicator ? { marginTop: 10, borderRadius: 6, backgroundColor: '#bdbdbd' } : { marginTop: 10, borderRadius: 6, backgroundColor: '#4db6ac' }}
                        full
                        primary
                        disabled={showActivityIndicator}
                    >
                        <Text style={{ color: 'white', fontSize: 18 }}>Sign Up</Text>
                    </Button>
                </View>
            </Form>
        </Container>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: colors.BACKGROUND
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        alignItems: 'center',
    },

});

export default HomeScreen;
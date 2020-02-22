import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, YellowBox } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Spinner } from 'native-base'
import * as firebaseWrapper from '../components/firebaseWrapper';

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
            <View style={styles.title}>
                <Text style={{ fontSize: 22 }}>Digitendance Student</Text>
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
                        style={{ borderRadius: 6 }}
                        onPress={() => loginUser(email, password)}
                    >
                        <Text style={{ color: 'white' }}>Login</Text>
                    </Button>
                </View>

                <View>
                    <Button
                        onPress={() => props.navigation.navigate('SignUp')}
                        style={{ marginTop: 10, borderRadius: 6 }}
                        full
                        primary
                        disabled={showActivityIndicator}
                    >
                        <Text style={{ color: 'white' }}>Sign Up</Text>
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
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default HomeScreen;
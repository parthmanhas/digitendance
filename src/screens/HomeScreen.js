import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Spinner } from 'native-base'
import * as firebase from 'firebase';

const HomeScreen = props => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);

    const loginUser = (email, password) => {
        //add email validation
        //dislay error when validation goes wrong
        setShowActivityIndicator(true);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                setShowActivityIndicator(false);
                props.navigation.navigate('EnterDetails');
            })
            .catch(error => {
                Alert.alert(error.message);
            });
    }

    

    



    return (

        <Container style={styles.screen}>
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
                        rounded
                        success
                        disabled={showActivityIndicator}
                        onPress={() => loginUser(email, password)}
                    >
                        <Text style={{ color: 'white' }}>Login</Text>
                    </Button>
                </View>

                <View>
                    <Button
                        onPress={() => props.navigation.navigate('SignUp')}
                        style={{ marginTop: 10 }}
                        full
                        rounded
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
        justifyContent: 'center'
    }
});

export default HomeScreen;
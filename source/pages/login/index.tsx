import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import RNAccountKit from 'react-native-facebook-account-kit';

interface ComponentProps {
}

interface ComponentState {
    token: any
}


export default class Login extends Component<ComponentProps, ComponentState> {
    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            token: {}
        }
    }

    componentDidMount() {
        this.configureAccountKit();
    }

    configureAccountKit = () => {
        RNAccountKit.configure({
            responseType: 'code',
            titleType: 'login',
            initialAuthState: '',
            facebookNotificationsEnabled: true, // true by default
            readPhoneStateEnabled: true, // true by default,
            defaultCountry: 'IN',
            viewControllerMode: 'show',
            getACallEnabled: true,
            initialPhoneCountryPrefix: '+91',
            setEnableInitialSmsButton: true, // true by default
        })
    }
    loginUser = () => {
        RNAccountKit.loginWithPhone()
        .then((token: any) => {
            if (!token) {
            console.log('Login cancelled')
            } else {
                console.log(`Logged with phone. Token: ${JSON.stringify(token)}`)
                this.setState({token})
            }
        })
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title='Login' onPress={this.loginUser} />
                <Text>{JSON.stringify(this.state.token)}</Text>
            </View>
        )
    }
}
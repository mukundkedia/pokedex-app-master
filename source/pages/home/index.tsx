import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }

    handleLinkOpen = async () => {
        await Linking.openURL('https://gitlab.com/void-trinity/pokedex-backend/');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>FOLLOW US ON</Text>
                <TouchableWithoutFeedback onPress={this.handleLinkOpen}>
                    <View style={styles.gitlabContainer}>
                        <Feather name='gitlab' color='tomato' size={100} style={{ marginTop: 50, marginBottom: 20 }}/>
                        <Text style={{ color: 'tomato' }}>GitLab</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    gitlabContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default createStackNavigator({ Home });
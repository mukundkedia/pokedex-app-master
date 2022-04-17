import React from 'react';
import { StyleSheet, Picker, View, ActivityIndicator, Image, Button, Alert } from 'react-native';
import { createStackNavigator, ScrollView } from 'react-navigation';
import Axios from 'axios';
import Sound from 'react-native-sound';
import Feather from 'react-native-vector-icons/Feather';

interface ComponentProps {
    navigation: any
}

interface ComponentState {
    data: any,
    loaded: boolean,
    refreshing: boolean,
    form: number,
    imageLoaded: Array<boolean>
}

class Details extends React.Component<ComponentProps, ComponentState> {
    static navigationOptions = ({ navigation }: any) => ({
            title: navigation.state.params.name,
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
    })

    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            loaded: false,
            refreshing: false,
            data: {},
            form: 0,
            imageLoaded: []
        }
    }

    handleLoad = (index: number) => {
        let array = this.state.imageLoaded;
        array[index] = true;
        this.setState({ imageLoaded: array });
    }

    renderImage = () => {
        if(this.state.data.forms.length) {
            return (
                <>
                    <Image source={require('../../../assets/loader.gif')} style={this.state.imageLoaded[this.state.form] ? styles.invisible: styles.imageStyle}/>
                    {this.state.data.forms.map((item: string, index: number) => {
                        let imageurl = '';
                        if (index === 0) {
                            imageurl = `https://pokedex-another-dimension.herokuapp.com${this.state.data.image}`
                        } else {
                            imageurl = `https://pokedex-another-dimension.herokuapp.com/assets/images/${this.state.data.id}_f${index+1}.png`;
                        }
                        return (
                            <Image key={index} source={{ uri: imageurl}} onLoad={() => this.handleLoad(index)} style={this.state.imageLoaded[index] === true && this.state.form === index ? styles.imageStyle: styles.invisible}/>
                        )
                    })}
                </>
            )
        } else {
            let imageurl = `https://pokedex-another-dimension.herokuapp.com${this.state.data.image}`;
            return (
                <>
                    <Image source={require('../../../assets/loader.gif')} style={this.state.imageLoaded[this.state.form] ? styles.invisible: styles.imageStyle}/>
                    <Image source={{ uri: imageurl}} onLoad={() => this.handleLoad(0)} style={this.state.imageLoaded[0] === true && this.state.form === 0 ? styles.imageStyle: styles.invisible}/>
                </>
            )
        } 
    }

    componentDidMount() {
        this.fetchPokemonDetails();
    }

    fetchPokemonDetails = () => {
        let { id } = this.props.navigation.state.params;
        Axios.get(`https://pokedex-another-dimension.herokuapp.com/api/pokemon/${id}`)
            .then(({ data }) => {
                let array = [false];
                data.data[0].forms.map(() => array.push(false));
                this.setState({ data: data.data[0], loaded: true, imageLoaded: array });
            })
            .catch(error => {
                this.setState({ loaded: false })
                console.log('error')
            })
    }

    renderSelector = () => {
        if(this.state.data.forms.length) {
            return (
                <View style={styles.formSelectorContainer}>
                    <Picker
                        mode='dropdown'
                        selectedValue={this.state.form}
                        style={styles.formSelector}
                        onValueChange={(item, index) =>
                            this.setState({form: index})
                        }>
                        {this.state.data.forms.map((item: any, index: number) => <Picker.Item key={index} label={item} value={index} />)}
                    </Picker>
                </View>
            )
        } else {
            return (
                <></>
            )
        }
    }

    playSound = () => {
        let { name, forms } = this.state.data, fname = '';
        let url;
        if (forms.length && !forms[this.state.form].includes(name)) {
            fname = `${forms[this.state.form]} ${name}`;
            url = encodeURI(`https://pokedex-another-dimension.herokuapp.com/assets/cries/${fname.toLowerCase()}.mp3`);
        } else if(forms.length) {
            fname = forms[this.state.form];
            url = encodeURI(`https://pokedex-another-dimension.herokuapp.com/assets/cries/${fname.toLowerCase()}.mp3`);
        } else {
            fname = this.state.data.cry;
            url = encodeURI(`https://pokedex-another-dimension.herokuapp.com${fname.toLowerCase()}`);
        }
        console.log(url);
        let sound = new Sound(url, '', (error) => {
            if (error) {
                fname = this.state.data.cry;
                url = encodeURI(`https://pokedex-another-dimension.herokuapp.com${fname.toLowerCase()}`);
                let newSound = new Sound(url, '', (error) => {
                    if(error) {
                        Alert.alert('Error', 'Problem playing the sound');
                    } else {
                        newSound.play();
                    }
                })
            } else {
                sound.play(() => {
                    sound.release();
                });
            }
        });
    }

    render() {
        if (this.state.loaded === false) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' color='tomato' />
                </View>
            )
        } else {
            const { data } = this.state;
            return (
                <ScrollView style={styles.scrollContainer} scrollEnabled={true}>
                    {this.renderSelector()}
                    <View style={styles.imageContainer}>
                        {this.renderImage()}
                    </View>
                    <Feather onPress={this.playSound} name={'play-circle'} size={20} />
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        width: 200,
        height: 200
    },
    invisible: {
        display: 'none'
    },
    scrollContainer: {
        backgroundColor: 'white',
        padding: 10,
    },
    imageContainer: {
        backgroundColor: '#e2e2e2',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10
    },
    formSelectorContainer: {
        borderRadius: 5,
        backgroundColor: '#dddddd',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#e2e2e2',
    },
    formSelector: {
        width: '100%'
    },
    formHeading: {
        fontSize: 12,
        color: '#494949',
        marginLeft: 8,
        marginBottom: 0
    }
});

export default createStackNavigator({ Details });
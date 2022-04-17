import React from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';
import PokemonCard from './pokemoncard';

interface ComponentProps {
    navigation: any
}

interface ComponentState {
    data: any,
    loaded: boolean,
    refreshing: boolean
}

class Pokedex extends React.Component<ComponentProps, ComponentState> {
    offset: number;
    static navigationOptions = {
        title: 'Pokedex',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
    
    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            loaded: false,
            data: [],
            refreshing: false
        };
        this.offset = 1;
    }
 

    componentDidMount = () => {
        this.fetchPokemons();
    }

    fetchPokemons = () => {
        let { offset } = this;
        axios.post('https://pokedex-another-dimension.herokuapp.com/api/pokemons/', { offset })
            .then(({ data }) => {
                this.setState({ data: [...this.state.data, ...data.data.docs]  , loaded: true });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loaded: true });
            });

    }

    handleClick = (item: any) => {
        this.props.navigation.navigate('Details', {
            name: item.name,
            id: item.id
        })
    }

    endReached = () => {
        this.offset++;
        this.fetchPokemons()
    }

    refreshList = () => {
        this.setState({ refreshing: false });
        this.offset = 1;
        axios.post('https://pokedex-another-dimension.herokuapp.com/api/pokemons/', { offset: 1 })
            .then(({ data }) => {
                this.setState({ data: data.data.docs });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (this.state.loaded === false) {
            return(
                <View style={styles.container}>
                    <ActivityIndicator size='large' color='tomato' />
                </View>
            );
        } else {
            return(
                <View style={styles.container}>
                    <FlatList
                        ref='list'
                        contentContainerStyle={{ width: '100%' }}
                        refreshing={this.state.refreshing}
                        onRefresh={this.refreshList}
                        showsVerticalScrollIndicator={false}
                        onEndReached={this.endReached}
                        extraData={this.state}
                        data={this.state.data}
                        numColumns={2}
                        keyExtractor={(item: any, index) => item.id.toString()}
                        renderItem={({item, index}) => {
                            return (
                                <PokemonCard handleClick={() => this.handleClick(item)} key={index} data={item}/>
                            )
                        }}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default createStackNavigator({ Pokedex });
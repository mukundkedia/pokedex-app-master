import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import globalStyles from '../helpers/styles';
import getColor from '../helpers/getcolor';
import idFormatter from '../helpers/idFormatter';

interface ComponentProps {
    data: any,
    handleClick: Function
}

interface ComponentState {
    imageLoaded: boolean
}


export default class PokemonCard extends Component <ComponentProps, ComponentState> {
    constructor(props:ComponentProps) {
        super(props);
        this.state = {
            imageLoaded: false
        }
    }

    renderTypes = (types: Array<string>): any => {
        return types.map((item: string, index: number) => {
            return (
                <View key={index} style={[ globalStyles.typeBadgeBase, { backgroundColor: getColor(item)}]}>
                    <Text style={globalStyles.badgeTextStyle}>{item}</Text>
                </View>
            );
        })
    }

    handleLoad = () => {
        this.setState({ imageLoaded: true })
    }


    renderImage = () => {
            return (
                <>
                    <Image source={require('../../../assets/loader.gif')} style={this.state.imageLoaded ? styles.invisible: styles.imageStyle}/>
                    <Image source={{ uri: `https://pokedex-another-dimension.herokuapp.com${this.props.data.thumb}`}} onLoad={this.handleLoad} style={this.state.imageLoaded === false ? styles.invisible: styles.imageStyle}/>
                </>
            ) 
    }


    render() {
        const { props } = this;
        return (
            <View style={styles.overallContainer}>
                <TouchableHighlight style={{ borderRadius: 5 }} onPress={() => props.handleClick()}>
                    <View style={styles.cardContainer}>
                        <View style={styles.imageContainer}>
                            {this.renderImage()}
                        </View>
                        <View style={styles.detailContainer}>
                            <View style={styles.seperator} />
                            <Text style={styles.nameStyle}>{props.data.name}</Text>
                            <Text style={styles.idStyle}>{idFormatter(props.data.id)}</Text>
                            <View style={styles.badgeContainer}>
                                {this.renderTypes(props.data.type[0])}
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    invisible: {
        display: 'none'
    },
    imageStyle: {
        height: 80,
        width: 80
    },
    overallContainer: {
        width: '50%',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    cardContainer: {
        backgroundColor: '#edeeef',
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: '5%',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    imageContainer: {
        width: '100%',
        backgroundColor: 'white',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 5
    },
    detailContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 5
    },
    infoContainer: {
        backgroundColor: 'white',
        width: '100%'
    },
    nameStyle: {
        marginTop: 10,
        color: '#636262',
        fontSize: 17
    },
    seperator: {
        height: 0,
        borderWidth: 1,
        marginTop: 10,
        borderColor: 'tomato',
        width: '40%'
    },
    idStyle: {
        fontWeight: '600',
        fontSize: 14,
        color: '#686868',
        marginTop: 10
    },
    badgeContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    }
});
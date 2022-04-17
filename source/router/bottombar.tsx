import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';

import Home from '../pages/home';
import Pokedex from '../pages/pokedex';

const BottomBar = createBottomTabNavigator(
    {
        Home,
        Pokedex
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Icon;
                let iconName = '';
                if (routeName === 'Home') {
                    iconName = `home`;
                } else if (routeName === 'Pokedex') {
                    iconName = `life-buoy`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor? tintColor: 'black'} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

export default createAppContainer(BottomBar);
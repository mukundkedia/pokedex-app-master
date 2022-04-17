import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    typeBadgeBase: {
        borderRadius: 2,
        width: 60,
        height: 20,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    }
})

export default globalStyles;
import { createStackNavigator, createAppContainer } from 'react-navigation';

import BottomBar from './bottombar';
import Details from '../pages/details';
import Login from '../pages/login';

const AppNavigator = createStackNavigator({
    BottomBar,
    Details,
    Login
}, {
    headerMode: 'none',
    initialRouteName: 'Login'
});

export default createAppContainer(AppNavigator);
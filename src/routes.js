import { createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(

    createStackNavigator({
        Main : {
            screen : Main,
            navigationOptions : {
                title : 'UserRadar'
            }
        },
        Profile : {
            screen : Profile,
            navigationOptions : {
                title : ' User Profile'
            }
        },         
        // SignIn : {
        //     screen : FacebookLogin,
        //     headerTintColor : '#FFF',
        //     headerBackTitleVisible : false,
        //     headerStyle : {
        //         backgroundColor : '#7D40E7'

        //     }
        // }
    }, {
        defaultNavigationOptions : {
            headerTintColor : '#FFF',
            // esconde o back para iOS
            headerBackTitleVisible : false,
            headerStyle : {
                backgroundColor : '#7D40E7'
            }
        },
    })
);

export default Routes;
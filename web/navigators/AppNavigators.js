import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import WelcomePage from '../views/WelcomePage'
import HomePage from '../views/HomePage'
import DetailPage from '../views/DetailPage'
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from "react-navigation-redux-helpers";
export const rootCom = 'Init' // 定义根路由

const InitialNavigator = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                header: null
            }
        }
    }
)

const MainNavigator = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                // headerStyle: {
                //     backgroundColor: 'cyan'
                // }
                header: null
            }
        },
        DetailPage: {
            screen: DetailPage,
            navigationOptions: {
                //header: null
            }
        }
    }
)

export const RootNavigator =  createSwitchNavigator(
    {
        Init: InitialNavigator,
        Main: MainNavigator
    },
    {
        navigationOptions: {
            header: null
        }
    }
)

export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
  );
  

import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import WelcomePage from '../views/WelcomePage'
import HomePage from '../views/HomePage'
import DetailPage from '../views/DetailPage'
import AboutPage from '../views/About/AboutPage'
import AboutMePage from '../views/About/AboutMePage'
import WebViewPage from '../views/WebViewPage'
import CustomPage from  '../views/CustomPage'
import CustomThemePage from  '../views/CustomThemePage'
import SortPage from  '../views/SortPage'
import CodePushPage from '../views/CodePushPage'
import HotLibraries from '../views/Awesomes/HotLibraries'
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from "react-navigation-redux-helpers";
export const rootCom = 'HomePage' // 定义根路由

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

export const MainNavigator = createStackNavigator(
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
        AboutPage: {
            screen: AboutPage,
            navigationOptions: {
                header: null,
            }
        },
        AboutMePage: {
            screen: AboutMePage,
            navigationOptions: {
                header: null,
            }
        },
        CustomPage: {
            screen: CustomPage,
            navigationOptions: {
                header: null,
            }
        },
        CustomThemePage: {
            screen: CustomThemePage,
            navigationOptions: {
                header: null,
            }
        },
        SortPage: {
            screen: SortPage,
            navigationOptions: {
                header: null,
            }
        },
        WebViewPage: {
            screen: WebViewPage,
            navigationOptions: {
                header: null
            }
        },
        DetailPage: {
            screen: DetailPage,
            navigationOptions: {
                header: null
            }
        },
        CodePushPage: {
            screen: CodePushPage,
            navigationOptions: {
                header: null
            }
        },
        HotLibraries: {
            screen: HotLibraries,
            navigationOptions: {
                header: null
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
  

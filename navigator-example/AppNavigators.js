import React from 'react'
import { Button, Platform, ScrollView, SafeAreaView } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator,
     createBottomTabNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomePage from '../pages/HomePage'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'
import Page4 from '../pages/Page4'
import Page5 from '../pages/Page5'
import Login from '../pages/Login'
const AppDrawerNavigator = createDrawerNavigator(
    // routerConfig
    {
        Page2: {
            screen: Page2,
            navigationOptions: {
                drawerLabel: 'hello page2',
                drawerIcon: ({ tintColor }) => (
                    <MaterialIcons 
                        name={'move-to-inbox'}
                        size={24}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        Page4: {
            screen: Page4,
            navigationOptions: {
                drawerLabel: 'hello page4',
                //title: '中',
                drawerIcon: ({ tintColor }) => (
                    <MaterialIcons 
                        name={'move-to-inbox'}
                        size={24}
                        style={{color: tintColor}}
                    />
                )
            }
        }
    },
    // DrawerNavigatorConfig
    {
        initialRouteName: 'Page2',
        contentOptions: {
            activeTintColor: 'hotpink',
            inactiveTintColor: '#fff',
            labelStyle: {
                fontSize: 16
            }
        },
        contentComponent: (props) => (
            <ScrollView style={{backgroundColor: '#789', flex: 1}}>
                <SafeAreaView 
                    forceInset={{top: 'always', horizontal: 'never'}}
                >
                    <DrawerItems {...props} />
                </SafeAreaView>
            </ScrollView>
        )
    }
)
const AppTopNavigator = createMaterialTopTabNavigator(
    {
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: 'all'
            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                tabBarLabel: 'ios'
            }
        },
        Page3: {
            screen: Page3,
            navigationOptions: {
                tabBarLabel: 'React'
            }
        },
        Page4: {
            screen: Page4,
            navigationOptions: {
                tabBarLabel: 'RN'
            }
        },
        Page5: {
            screen: Page5,
            navigationOptions: {
                tabBarLabel: 'vue'
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: 'hotpink'// tabBar背景颜色
            },
            tabStyle: {
                minWidth: 50,
                upperCaseLabel: false, // 标签是否大写，默认为true
                scrollEnable: true,// 是否支持选项卡滚动，默认为false
                
                indicatorStyle: {
                    height: 2,
                    backgroundColor: 'white'
                },
                labelStyle: {
                    fontSize: 16,
                    marginTop: 6,
                    marginBottom: 6
                }
            }
        }
    }
)
const AppBottomNavigator = createBottomTabNavigator(
    {
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: '最热',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name='ios-home'
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                tabBarLabel: '趋势',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={'ios-people'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        Page3: {
            screen: Page3,
            navigationOptions: {
                tabBarLabel: '收藏',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={'ios-chatboxes'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        Page4: {
            screen: Page4,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={'ios-airplane'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? 'hotpink' : '#fff'
        }
    }
)
const AppStackNavigator = createStackNavigator(
    {
        HomePage: {
            screen: HomePage
        },
        Page1: {
            screen: Page1,
            navigationOptions: ({navigation}) => (
                {title: `页面名：${navigation.state.params.name}`}
            )// 动态配置
        },
        Page2: {
            screen: Page2,
            navigationOptions: {// 静态配置
                title: '这是Page2啊'
            }
        },
        Page3: {
            screen: Page3,
            navigationOptions: (props) => {// 动态配置
                const { navigation } = props
                const { state, setParams } = navigation
                const { params } = state
                return {
                    title: params.title ? params.title : '原来是Page3啊，哈哈',
                    headerRight: ( 
                        <Button
                            title={params.mode === 'edit' ? '保存' : '编辑'}
                            onPress={() => setParams({mode: params.mode === 'edit' ? '' : 'edit'})}
                        />
                    )
                }
            }
        },
        Page4: {
            screen: Page4
        },
        Page5: {
            screen: Page5
        },
        TopNavigator: {
            screen: AppTopNavigator,
            navigationOptions: {
                title: 'topNavigator'
            }
        },
        BottomNavigator: {
            screen: AppBottomNavigator,
            navigationOptions: {
                title: 'bottomNavigator'
            }
        },
        drawerNavigator: {
            screen: AppDrawerNavigator,
            navigationOptions: {
                title: 'drawerNavigator'
            }
        }
    },
    {
        // defaultNavigationOptions: {
        //     headerTintColor: 'hotpink',
        //     headerStyle: {
        //         backgroundColor: '#666'
        //     }
        // }
    }
)

const AppStack = createStackNavigator({
    HomePage: {
        screen: HomePage
    }
})
const AuthStack = createStackNavigator(
    {
        Login: {
            screen: Login
        }
    },
    {
        navigationOptions: {
            header: null //禁用navigation Bar
        }
    }
)
const AppSwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthStack,
        AppStack: AppStack
    },
    {
        initialRouteName: 'Auth'
    }
)
export { AppStackNavigator, AppSwitchNavigator }
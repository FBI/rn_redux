export default class NavigationUtils {
    static toTargetPage(targetRouteName, params) {
        const { navigation } = NavigationUtils
        if(!navigation) {
            console.log('Navigation can not be null')
            return
        }
        navigation.navigate(targetRouteName, { ...params })
    }

    static goBack(navigation) {
        navigation.goBack()
    }

    static resetToHomePage({ navigation }) {
        navigation.navigate('Main')
    }
}
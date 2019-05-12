import React from 'react'
import { View, Text, StyleSheet, Platform, DeviceInfo, StatusBar, ViewPropTypes } from 'react-native'
import { PropTypes }  from 'prop-types'

const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;//状态栏的高度

const StatusBarShape = {//设置状态栏所接受的属性
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};

export default class NavigationBar extends React.Component {
     //设置属性检查
     static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
    };
    //设置状态默认属性
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        }
    };
    getButtonElement(element) {
        return (
            <View style={styles.navBarButton}>
                {element ? element : null}
            </View>
        )

    }
    render() {
        const { statusBar, title, titleView, hide, leftButton, rightButton, titleLayoutStyle, style } = this.props
        // 定义状态栏
        let statusBarBox = !statusBar.hidden ?
                            <View style={styles.statusBarBox}>
                                <StatusBar {...statusBar} />
                            </View> : null;
        // 定义导航栏标题
        let titleViewBox = titleView ? titleView :
                            <Text ellipsizeMode="head" numberOfLines={1} style={styles.titleBox}>{title}</Text>;
        // 定义导航栏内容
        let navContent = hide ? null :
                        <View style={styles.navBarBox}>
                            {this.getButtonElement(leftButton)}
                            <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>
                                {titleViewBox}
                            </View>
                            {this.getButtonElement(rightButton)}
                        </View>;
        return (
            <View style={[styles.container, style]}>
                {statusBarBox}
                {navContent}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2196f3'
    },
    navBarButton: {
        alignItems: 'center'
    },
    navBarBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    titleBox: {
        fontSize: 20,
        color: 'white',
    },
    statusBarBox: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    }
});
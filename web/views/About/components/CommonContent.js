import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, Platform, DeviceInfo } from 'react-native'
import viewsUtil from '../../../utils/viewsUtil'
import BackPressUtil from '../../../utils/BackPressUtil'
import navigationUtil from '../../../navigators/NavigationUtils'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import globalStyle from '../../../styles/globalStyle'
const CONFIG_UTL = 'http://www.devio.org/io/GitHubPopular/json/github_app_config.json'

export default class CommonContent {
    constructor(props, callback) {
        this.props = props
        this.setState = callback
        this.backPress = new BackPressUtil({backPress: () => this.onBackPress()});
    }
    componentDidMount() {
        this.backPress.componentDidMount();
        fetch(CONFIG_UTL)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Network Error');
            })
            .then(config => {
                if (config) {
                    this.setState({
                        data: config
                    })
                }
            })
            .catch(e => {
                console(e);
            })
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        navigationUtil.goBack(this.props.navigation);
        return true;
    }
    onShare() {
        console.log('分享个锤子')
    }
    getParallaxRenderConfig(params) {
        let config = {};
        let avatar = typeof(params.avatar) === 'string' ? {uri: params.avatar} : params.avatar;
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.backgroundImg,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        );
        config.renderForeground = () => (
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Image style={styles.avatar}
                       source={avatar}/>
                <Text style={styles.sectionSpeakerText}>
                    {params.name}
                </Text>
                <Text style={styles.sectionTitleText}>
                    {params.description}
                </Text>
            </View>
        );
        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        );
        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {viewsUtil.getLeftBackButton(() => navigationUtil.goBack(this.props.navigation))}
                {viewsUtil.getShareButton(() => this.onShare())}
            </View>
        );
        return config;

    }
    render(contentView, params) {
        const renderConfig = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView
                backgroundColor={this.props.theme.themeColor}
                contentBackgroundColor={globalStyle.backgroundColor}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                backgroundScrollSpeed={10}
                {...renderConfig}>
                {contentView}
            </ParallaxScrollView>
        )
    }
}

const window = Dimensions.get('window');
const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 270;
const TOP = (Platform.OS === 'ios') ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 0;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? globalStyle.nav_bar_height_ios + TOP : globalStyle.nav_bar_height_android;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        alignItems: 'center',
        paddingTop:TOP
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop:TOP
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5,
        marginBottom: 10
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10
    },
});
import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import NavigationBar from '../../commons/NavigationBar'
import viewsUtil from "../../utils/viewsUtil";
import NavigationUtil from "../../navigators/NavigationUtils";
import BackPressUtil from "../../utils/BackPressUtil";
import SafeAreaViewPlus from '../../commons/SafeaAreaViewPlus'
import HotLibraryItem from './components/HotLibraryItem'

export default class HotLibraries extends Component {
    constructor(props) {
        super(props);
        const { title, theme } = this.props.navigation.state.params;
        this.theme = theme
        this.state = {
            title,
            canGoBack: false,
            listData: [
                {
                    title: '30-seconds-of-code',
                    star: 47845,
                    fork: 5439,
                    desc: '一个有用的JavaScript片段集合...',
                    avatar_url: 'https://img.awesomes.cn/thumbs/told/1513353045832-1-4826.png',
                    url: 'https://www.awesomes.cn/repo/30-seconds/30-seconds-of-code'
                },
                {
                    title: 'eruda',
                    star: 6332,
                    fork: 590,
                    desc: '手机网页前端调试面板...',
                    avatar_url: 'https://img.awesomes.cn/ts/j0/574360223.png',
                    url: 'https://www.awesomes.cn/repo/liriliri/eruda'
                },
                {
                    title: 'wxa-plugin-canvas',
                    star: 1417,
                    fork: 240,
                    desc: '生成朋友圈分享海报并生...',
                    avatar_url: 'https://img.awesomes.cn/ts/r2/3743844886.jpg',
                    url: 'https://www.awesomes.cn/repo/jasondu/wxa-plugin-canvas'
                },
                {
                    title: 'we-croppe',
                    star: 1415,
                    fork: 292,
                    desc: '微信小程序图片裁剪工具...',
                    avatar_url: 'https://img.awesomes.cn/ts/t4/4500412720.png',
                    url: 'https://www.awesomes.cn/repo/we-plugin/we-cropper'
                },
                {
                    title: 'wux-weapp',
                    star: 3651,
                    fork: 720,
                    desc: '微信小程序 UI 组件库...',
                    avatar_url: 'https://img.awesomes.cn/ts/d3/8152251591.png',
                    url: 'https://www.awesomes.cn/repo/wux-weapp/wux-weapp'
                },
                {
                    title: 'atom-design',
                    star: 103,
                    fork: 28,
                    desc: '基于Vue.js的移动端UI库...',
                    avatar_url: 'https://img.awesomes.cn/ts/n4/5655346410.png',
                    url: 'https://www.awesomes.cn/repo/reming0227/atom-design'
                },
                {
                    title: 'mall-admin-web',
                    star: 103,
                    fork: 28,
                    desc: '基于Vue实现的电商管理系统...',
                    avatar_url: 'https://img.awesomes.cn/ts/f1/7860544410.png',
                    url: 'https://www.awesomes.cn/repo/macrozheng/mall-admin-web'
                },
                {
                    title: 'matrixChange',
                    star: 137,
                    fork: 21,
                    desc: '基于Vue和MD实现的UI组件库...',
                    avatar_url: 'https://img.awesomes.cn/ts/k8/8872386583.jpg',
                    url: 'https://www.awesomes.cn/repo/acccco/matrixChange'
                },
                {
                    title: 'muse-ui',
                    star: 7643,
                    fork: 886,
                    desc: '基于Vue和MD实现的UI组件库...',
                    avatar_url: 'https://img.awesomes.cn/ts/b7/7689070560.png',
                    url: 'https://www.awesomes.cn/repo/museui/muse-ui'
                },
                {
                    title: 'Charts for WeChat small app',
                    star: 3683,
                    fork: 1155,
                    desc: '微信小程序图表charts组件...',
                    avatar_url: 'https://img.awesomes.cn/ts/z3/2365864272.jpg',
                    url: 'https://www.awesomes.cn/repo/xiaolin3303/wx-charts'
                },
                {
                    title: 'iview-weapp',
                    star: 4825,
                    fork: 891,
                    desc: '高质量微信小程序UI组件库...',
                    avatar_url: 'https://img.awesomes.cn/thumbs/told/1528640799129-1-617.png',
                    url: 'https://www.awesomes.cn/repo/TalkingData/iview-weapp'
                },
                {
                    title: 'vant-weapp',
                    star: 10086,
                    fork: 2038,
                    desc: 'vant 小程序版本',
                    avatar_url: 'https://img.awesomes.cn/ts/d3/8152251591.png',
                    url: 'https://www.awesomes.cn/repo/youzan/vant-weapp'
                },
                {
                    title: 'wepy',
                    star: 18643,
                    fork: 2729,
                    desc: '腾讯团队出品小程序框架',
                    avatar_url: 'https://img.awesomes.cn/thumbs/told/1512479791316-1-5725.png',
                    url: 'https://www.awesomes.cn/repo/Tencent/wepy'
                },
                {
                    title: 'weui-wxss',
                    star: 10646,
                    fork: 3686,
                    desc: '一个微信官方设计团队开发的UI库',
                    avatar_url: 'https://img.awesomes.cn/ts/d4/3140603226.png',
                    url: 'https://www.awesomes.cn/repo/Tencent/weui-wxss'
                },
            ]
        };
        this.backPress = new BackPressUtil({backPress: () => this.onBackPress()});
    }
    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
        return true;
    }
    render() {
        let navigationBar = <NavigationBar
            title={this.state.title}
            style={this.theme.styles.navBar}
            leftButton={viewsUtil.getLeftBackButton(() => this.onBackPress())}
        />;
        return (
            <SafeAreaViewPlus
                topColor={this.theme.themeColor}
            >
                {navigationBar}
                <View style={styles.container}>
                    <ScrollView>
                        {
                            this.state.listData.map( item => (
                                <HotLibraryItem item={item} theme={this.theme} />
                            ))
                        }
                    </ScrollView>
                </View>
            </SafeAreaViewPlus>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    }
})
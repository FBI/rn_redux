import React, { Component } from 'react'
import { View, Clipboard } from 'react-native'
import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonContent from './components/CommonContent'
import config from '../../config/config'
import viewsUtil from '../../utils/viewsUtil'
import navigationUtil from '../../navigators/NavigationUtils'
import globalStyle from '../../styles/globalStyle'

class AboutMePage extends Component {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this.commonContent =  new CommonContent({
            ...this.params,
            navigation: this.props.navigation,
            flag: 'about_me'
        }, data => this.setState({ ...data }))
        this.state = {
            data: config,
            showTutorial: true,
            showBlog: false,
            showQQ: false,
            showContact: false
        }
    }
    onClick(tab) {
        if (!tab) return;
        const { url, title, account } = tab
        if (url) {// url存在，则跳转到WebViewPage页面.否则打开邮箱或者复制联系方式
            navigationUtil.toTargetPage('WebViewPage', { title, url });
            return;
        }
        if (account && account.indexOf('@') > -1) {
            let url = 'mailto://' + account;
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
            return;
        }
        if (account) {
            Clipboard.setString(account);
            this.toast.show(title + account + '已复制到剪切板。');
        }
    }
    renderItem(data, isShow, key) {
        const { theme } = this.props
        return viewsUtil.getSettingItem(() => {
            this.setState({
                [key]: !this.state[key]
            });
        }, data.name, theme.themeColor, Ionicons, data.icon, isShow ? 'ios-arrow-up' : 'ios-arrow-down')
    }
    /**
     * 显示列表数据
     * @param items
     * @param isShowAccount
     */
    renderSecondItem(items, isShowAccount) {
        const { theme } = this.props
        if (!items) return null;
        let views = [];
        for (let i in items) {
            let title = isShowAccount ? items[i].title + ':' + items[i].account : items[i].title;
            views.push(
                <View key={i}>
                    {viewsUtil.getSettingItem(() => this.onClick(items[i]), title, theme.themeColor)}
                    <View style={globalStyle.line}/>
                </View>
            )
        }
        return views;
    }
    render() {
        const { showTutorial, showBlog, showQQ, showContact } = this.state
        const { Tutorial, Blog, QQ, Contact } = this.state.data.aboutMe
        const content = <View>
                            {this.renderItem(Tutorial, showTutorial, 'showTutorial')}
                            <View style={globalStyle.line}/>
                            {showTutorial ? this.renderSecondItem(Tutorial.items) : null}

                            {this.renderItem(Blog, showBlog, 'showBlog')}
                            <View style={globalStyle.line}/>
                            {showBlog ? this.renderSecondItem(Blog.items) : null}

                            {this.renderItem(QQ, showQQ, 'showQQ')}
                            <View style={globalStyle.line}/>
                            {showQQ ? this.renderSecondItem(QQ.items, true) : null}

                            {this.renderItem(Contact, showContact, 'showContact')}
                            <View style={globalStyle.line}/>
                            {showContact ? this.renderSecondItem(Contact.items, true) : null}
                        </View>;
        return <View style={{flex: 1}}>
                    {this.commonContent.render(content, this.state.data.author)}
                    <Toast ref={toast => this.toast = toast}
                        position={'center'}
                    />
               </View>
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})
export default connect(mapStateToProps, null)(AboutMePage)
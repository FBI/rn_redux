import React, { Component } from 'react'
import { View, Linking } from 'react-native'
import { connect } from 'react-redux'
import CommonContent from './components/CommonContent'
import config from '../../config/config'
import moreMenuUtil from '../../utils/moreMenuUtil';
import navigationUtil from '../../navigators/NavigationUtils'
import viewsUtil from '../../utils/viewsUtil'
import globalStyle from '../../styles/globalStyle'

class AboutPage extends Component {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this.commonContent = new CommonContent({
            ...this.params,
            navigation: this.props.navigation,
            flagAbout: 'about'
        }, data => this.setState({...data}))
        this.state = {
            data: config
        }
    }
    onClick(menu) {
        const { theme } = this.props
        let routeName = ''
        let params = {}
        switch(menu) {
            case moreMenuUtil.Tutorial: 
                    routeName = 'WebViewPage';
                    params.title = '教程';
                    params.theme = theme
                    params.url = 'https://github.com/Solido/awesome-flutter';
                    break;
            case moreMenuUtil.About_Author:
                    routeName = 'AboutMePage';
                    break;
            case moreMenuUtil.Feedback:
                    const url = 'mailto://18311433156@163.com';
                    Linking.canOpenURL(url)
                        .then(support => {
                            if (!support) {
                                console.log('Can\'t open email: ' + url);
                            } else {
                                Linking.openURL(url);
                            }
                        }).catch(e => {
                            console.error('哈哈哈哈，打不开邮箱啊', e);
                    });
                    break;
        }
        if(routeName) navigationUtil.toTargetPage(routeName, params);
    }
    renderItem(menu) {
        const { theme } = this.props
        return viewsUtil.getMenuItem(() => this.onClick(menu), menu, theme.themeColor);
    }
    render() {
        const content = <View>
                            {this.renderItem(moreMenuUtil.Tutorial)}
                            <View style={globalStyle.line}/>
                            {this.renderItem(moreMenuUtil.About_Author)}
                            <View style={globalStyle.line}/>
                            {this.renderItem(moreMenuUtil.Feedback)}
                        </View>;
        return this.commonContent.render(content, this.state.data.app);
    }
}
const mapStateToProps = state => ({
    theme: state.theme.theme
})
export default connect(mapStateToProps, null)(AboutPage)
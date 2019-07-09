import React, { Component } from 'react';
import { SafeAreaView } from 'react-native'
import { WebView }from 'react-native-webview';
import NavigationBar from '../commons/NavigationBar'
import viewsUtil from "../utils/viewsUtil";
import NavigationUtil from "../navigators/NavigationUtils";
import BackPressUtil from "../utils/BackPressUtil";
import globalStyle from '../styles/globalStyle';

export default class WebViewPage extends Component {
    constructor(props) {
        super(props);
        const { title, url, theme } = this.props.navigation.state.params;
        this.theme = theme
        this.state = {
            title,
            url,
            canGoBack: false,
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

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    render() {
        let navigationBar = <NavigationBar
            title={this.state.title}
            style={this.theme.styles.navBar}
            leftButton={viewsUtil.getLeftBackButton(() => this.onBackPress())}
        />;

        return (
            <SafeAreaView
                style={globalStyle.root_container}
            >
                {navigationBar}
                <WebView
                    ref={webView => this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}
                />
            </SafeAreaView>
        );
    }
}
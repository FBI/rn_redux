import React, { Component } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import CheckBox from 'react-native-check-box'
import Ionicons from 'react-native-vector-icons/Ionicons'
import BackPressUtil from "../utils/BackPressUtil";
import NavigationUtil from '../navigators/NavigationUtils'
import LabelLanguageUtil from '../utils/labelLanguageUtil'
import viewsUtil from '../utils/viewsUtil'
import NavigationBar from '../commons/NavigationBar'
import actions from '../action'

class CustomPage extends Component {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this.changeValues = []
        this.isRemoveLabel = !!this.params.isRemoveLabel
        this.labelLanguageUtil = new LabelLanguageUtil(this.params.flag)
        this.backPress = new BackPressUtil({backPress: () => this.onBackPress()});
        this.state = {
            data: []
        }
    }
    /**
     * 获取标签
     * @param props
     * @param original 移除标签时使用，是否从props获取原始对的标签
     * @param state 移除标签时使用
     * @returns {*}
     * @private
     */
    static getLabelLanguage(props, original, state) {
        const {flag, isRemoveLabel} = props.navigation.state.params;
        let key = flag === 'label' ? "labels" : "languages";
        if (isRemoveLabel && !original) {
            return state && state.data && state.data.length !== 0 && state.data || props.labelLanguage[key].map(val => {
                return {//不直接修改props，copy一份
                    ...val,
                    checked: false
                };
            });
        } else {
            return props.labelLanguage[key];
        }
    }
    componentDidMount() {
        this.backPress.componentDidMount();
        //如果props中标签为空则从本地存储中获取标签
        if (CustomPage.getLabelLanguage(this.props).length === 0) {
            let { loadData } = this.props;
            loadData(this.params.flag);
        }
        this.setState({
            data: CustomPage.getLabelLanguage(this.props),
        })
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }
    onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }
    onSave() {
        console.log('onSage ddddd')
    }
    onClick() {
        console.log('hahaha click')
    }
    _checkedImage(checked) {
        return <Ionicons
            name={checked ? 'ios-checkbox' : 'md-square-outline'}
            size={20}
            style={{
                color: 'hotpink',
            }}/>
    }
    renderCheckBox(data, index) {
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => this.onClick(data, index)}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={this._checkedImage(true)}
            unCheckedImage={this._checkedImage(false)}
        />
    }
    renderView() {
        let dataArray = this.state.data;
        if (!dataArray || dataArray.length === 0) return;
        let len = dataArray.length;
        let views = [];
        for (let i = 0, l = len; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(dataArray[i], i)}
                        {i + 1 < len && this.renderCheckBox(dataArray[i + 1], i + 1)}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return views;
    }
    render() {
        let title = this.isRemoveLabel ? '标签移除' : '自定义标签';
        title = this.params.flag === 'language' ? '自定义语言' : title;
        let rightButtonTitle = this.isRemoveLabel ? '移除' : '保存';
        let navigationBar = <NavigationBar
            title={title}
            style={{backgroundColor: 'hotpink'}}
            leftButton={viewsUtil.getLeftBackButton(() => this.onBack())}
            rightButton={viewsUtil.getRightButton(rightButtonTitle, () => this.onSave())}
        />;
        return <View
                    style={styles.container}
                >
                    {navigationBar}
                    <ScrollView>
                        {this.renderView()}
                    </ScrollView>
                </View>
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    }
})
const mapStateToProps = ({ labelLanguage }) => ({
    labelLanguage
})
const mapDispatchToProps = dispatch => ({
    loadData(flag) {
        dispatch(actions.onLoadLanguageLabel(flag))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomPage)
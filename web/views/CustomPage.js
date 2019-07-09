import React, { Component } from 'react'
import { View, Alert, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import CheckBox from 'react-native-check-box'
import Ionicons from 'react-native-vector-icons/Ionicons'
import viewsUtil from '../utils/viewsUtil'
import arrayaUtil from '../utils/arrayUtil'
import BackPressUtil from "../utils/BackPressUtil";
import navigationUtil from '../navigators/NavigationUtils'
import LabelLanguageUtil from '../utils/labelLanguageUtil'
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
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== CustomPage.getLabelLanguage(nextProps, null, prevState)) {
            return {
                data: CustomPage.getLabelLanguage(nextProps, null, prevState),
            }
        }
        return null;
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
        if (this.changeValues.length > 0) {
            Alert.alert('提示', '要保存修改吗？',
                [
                    {
                        text: '否', onPress: () => {
                            navigationUtil.goBack(this.props.navigation)
                        }
                    }, 
                    {
                        text: '是', onPress: () => {
                            this.onSave();
                        }
                    }
                ])
        } else {
            navigationUtil.goBack(this.props.navigation)
        }
    }
    onSave() {
        if (!this.changeValues.length) {
            navigationUtil.goBack(this.props.navigation);
            return;
        }
        let data;
        if (this.isRemoveLabel) {//移除标签的特殊处理
            for (let i = 0, l = this.changeValues.length; i < l; i++) {
                arrayaUtil.remove(data = CustomPage.getLabelLanguage(this.props, true), this.changeValues[i], "name");
            }
        }
        //更新本地数据
        this.labelLanguageUtil.save(data || this.state.data);
        const { loadData } = this.props;
        //更新store
        loadData(this.params.flag);
        navigationUtil.goBack(this.props.navigation);
    }
    onClick(data, index) {
        data.checked = !data.checked;
        arrayaUtil.updateArray(this.changeValues, data);
        this.state.data[index] = data;//更新state以便显示选中状态
        this.setState({
            data: this.state.data
        })
    }
    _checkedImage(checked) {
        const { theme } = this.props
        return <Ionicons
            name={checked ? 'ios-checkbox' : 'md-square-outline'}
            size={20}
            style={{
                color: theme.themeColor,
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
        const { theme } = this.props
        let title = this.isRemoveLabel ? '标签移除' : '自定义标签';
        title = this.params.flag === 'language' ? '自定义语言' : title;
        let rightButtonTitle = this.isRemoveLabel ? '移除' : '保存';
        let navigationBar = <NavigationBar
            title={title}
            style={theme.styles.navBar}
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
const mapStateToProps = state => ({
    labelLanguage: state.labelLanguage,
    theme: state.theme.theme
})
const mapDispatchToProps = dispatch => ({
    loadData(flag) {
        dispatch(actions.onLoadLanguageLabel(flag))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomPage)
import React, { Component } from 'react'
import { View, Text, Alert, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SortableListView from 'react-native-sortable-listview'
import viewsUtil from '../utils/viewsUtil'
import arrayaUtil from '../utils/arrayUtil'
import BackPressUtil from "../utils/BackPressUtil";
import navigationUtil from '../navigators/NavigationUtils'
import LabelLanguageUtil from '../utils/labelLanguageUtil'
import NavigationBar from '../commons/NavigationBar'
import actions from '../action'
import globalStyle from '../styles/globalStyle'

class SortPage extends Component {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this.labelLanguageUtil = new LabelLanguageUtil(this.params.flag)
        this.backPress = new BackPressUtil({backPress: () => this.onBackPress()});
        this.state = {
            checkedArray: SortPage.getLabelLanguage(this.props),
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const checkedArray = SortPage.getLabelLanguage(nextProps, null, prevState);
        if (prevState.keys !== checkedArray) {
            return {
                keys: checkedArray,
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
    static getLabelLanguage(props, state) {
        //如果state中有checkedArray则使用state中的checkedArray
        if (state && state.checkedArray && state.checkedArray.length) {
            return state.checkedArray;
        }
        //否则从原始数据中获取checkedArray
        const flag = SortPage._flag(props);
        let dataArray = props.labelLanguage[flag] || [];
        let keys = [];
        for (let i = 0, j = dataArray.length; i < j; i++) {
            let data = dataArray[i];
            if (data.checked) keys.push(data);
        }
        return keys;
    }
    static _flag(props) {
        const { flag } = props.navigation.state.params;
        return flag === 'label' ? "labels" : "languages";
    }
    componentDidMount() {
        this.backPress.componentDidMount();
        //如果props中标签为空则从本地存储中获取标签
        if (SortPage.getLabelLanguage(this.props).length === 0) {
            let { loadData } = this.props;
            loadData(this.params.flag);
        }
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }
    onBack() {
        if (!arrayaUtil.isEqual(SortPage.getLabelLanguage(this.props), this.state.checkedArray)) {
            Alert.alert('提示', '要保存修改吗？',
                [
                    {
                        text: '否', onPress: () => {
                            navigationUtil.goBack(this.props.navigation)
                        }
                    }, {
                    text: '是', onPress: () => {
                        this.onSave(true);
                    }
                }
                ])
        } else {
            navigationUtil.goBack(this.props.navigation)
        }
    }
    onSave(hasChecked) {
        if (!hasChecked) {
            //如果没有排序则直接返回
            if (arrayaUtil.isEqual(SortPage.getLabelLanguage(this.props), this.state.checkedArray)) {
                navigationUtil.goBack(this.props.navigation);
                return;
            }
        }
        //保存排序后的数据
        //获取排序后的数据
        //更新本地数据
        this.labelLanguageUtil.save(this.getSortResult());

        //重新加载排序后的标签，以便其他页面能够及时更新
        const { loadData } = this.props;
        //更新store
        loadData(this.params.flag);
        navigationUtil.goBack(this.props.navigation);
    }
    getSortResult() {
        const flag = SortPage._flag(this.props);
        //从原始数据中复制一份数据出来，以便对这份数据进行进行排序
        let sortResultArray = arrayaUtil.clone(this.props.labelLanguage[flag]);
        //获取排序之前的排列顺序
        const originalCheckedArray = SortPage.getLabelLanguage(this.props);
        //遍历排序之前的数据，用排序后的数据checkedArray进行替换
        for (let i = 0, j = originalCheckedArray.length; i < j; i++) {
            let item = originalCheckedArray[i];
            //找到要替换的元素所在位置
            let index = this.props.labelLanguage[flag].indexOf(item);
            //进行替换
            sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        }
        return sortResultArray;
    }
    onClick(data, index) {
        data.checked = !data.checked;
        arrayaUtil.updateArray(this.changeValues, data);
        this.state.data[index] = data;//更新state以便显示选中状态
        this.setState({
            data: this.state.data
        })
    }
    render() {
        const { theme } = this.props
        let title = this.params.flag === 'language' ? '语言排序' : '标签排序';
        let navigationBar = <NavigationBar
            title={title}
            leftButton={viewsUtil.getLeftBackButton(() => this.onBack())}
            style={theme.styles.navBar}
            rightButton={viewsUtil.getRightButton('保存', () => this.onSave())}
        />;
        return <View
                    style={[globalStyle.root_container,styles.container]}
                >
                    {navigationBar}
                    <SortableListView
                        data={this.state.checkedArray}
                        order={Object.keys(this.state.checkedArray)}
                        onRowMoved={e => {
                            this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                            this.forceUpdate()
                        }}
                        renderRow={row => <SortCell data={row} theme={theme} {...this.params}/>}
                    />
                </View>
    }
}
class SortCell extends Component {
    render() {
        const { theme } = this.props
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={this.props.data.checked ? styles.item : styles.hidden}
            {...this.props.sortHandlers}>
            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <MaterialCommunityIcons
                    name={'sort'}
                    size={16}
                    style={{marginRight: 10, color: theme.themeColor}}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    hidden: {
        height: 0
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
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
export default connect(mapStateToProps, mapDispatchToProps)(SortPage)
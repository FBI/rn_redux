import React, { Component } from 'react'
import { View, Text, Modal, TouchableHighlight, StyleSheet, DeviceInfo, Platform, ScrollView }  from 'react-native'
import { connect } from 'react-redux'
import actions from '../action'
import ThemeUtil from '../utils/themeUtil'
import ThemeFactory, { ThemeFlags } from '../config/themeConfig'
import globleStyle from '../styles/globalStyle'

class CustomThemePage extends Component {
    constructor(props) {
        super(props)
        this.themeUtil = new ThemeUtil()
    }
    onSelectTheme(color) {
        const { onThemeChange, onClose } = this.props
        onClose();
        this.themeUtil.save(ThemeFlags[color]);
        onThemeChange(ThemeFactory.createTheme(ThemeFlags[color]));
    }
    getThemeItem(color) {
        return <TouchableHighlight
                    style={{flex: 1}}
                    underlayColor='white'
                    onPress={() => this.onSelectTheme(color)}
                >
                    <View style={[{backgroundColor: ThemeFlags[color]}, styles.themeItem]}>
                        <Text style={styles.themeText}>{color}</Text>
                    </View>
                </TouchableHighlight>
    }
    renderThemeItems() {
        const views = [];
        for (let i = 0, colors = Object.keys(ThemeFlags), l = colors.length; i < l; i += 3) {
            const color1 = colors[i], color2 = colors[i + 1], color3 = colors[i + 2];
            views.push(<View key={i} style={{flexDirection: 'row'}}>
                {this.getThemeItem(color1)}
                {this.getThemeItem(color2)}
                {this.getThemeItem(color3)}
            </View>)
        }
        return views;
    }
    renderContentView() {
        const { visible, onClose } = this.props
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={visible}
                onRequestClose={() => onClose()}
            >
                <View style={styles.modalContainer}>
                    <ScrollView>
                        {this.renderThemeItems()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    render() {
        return this.props.visible ? <View style={globleStyle.root_container}>
                                        {this.renderContentView()}
                                    </View> : null;
    }
}

const styles = StyleSheet.create({
    themeItem: {
        flex: 1,
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        margin: 10,
        marginBottom: 10 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
        marginTop: Platform.OS === 'ios' ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 10,
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3
    },
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }
})

const mapDispatchToProps = dispatch => ({
    onThemeChange(theme) {
        dispatch(actions.onThemeChange(theme))
    }
})
export default connect(null,mapDispatchToProps)(CustomThemePage)
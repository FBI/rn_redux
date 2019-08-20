import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import navigationUtils from '../../../navigators/NavigationUtils'

export default class HotLibraryItem extends Component {
    toWebViewPage(item,theme) {
        navigationUtils.toTargetPage('WebViewPage', {...item,theme})
    }
    render() {
        const { item, theme } = this.props
        return <TouchableOpacity
                    onPress={() => this.toWebViewPage(item,theme)}
               >
                    <View style={styles.item}>
                        <Image style={styles.img} source={{uri: item.avatar_url}} />
                        <View style={styles.detail}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.desc}>{item.desc}</Text>
                            <View style={styles.tags}>
                                <Text style={styles.tag}>前端</Text>
                                <Text style={styles.tag}>star:{item.star}</Text>
                                <Text style={styles.tag}>fork:{item.fork}</Text>
                            </View>
                        </View>
                        <Text style={styles.author}>作者：隔壁老王</Text>
                    </View>
                </TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    item: {
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: '#ffffff',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 2,
        paddingRight: 2,
        marginLeft: 4,
        marginRight: 4,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: .5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: .5, height: .5},
        shadowOpacity: .4,
        shadowRadius: 1,
        elevation: 2
    },
    img: {
        width: 60,
        height: 60
    },
    detail: {
   
    },
    title: {
        fontWeight: '600',
        fontSize: 16
    },
    desc: {
        color: '#666',
        overflow: 'hidden',
        height: 20,
        marginTop: 4,
        marginBottom: 4
    },
    tags: {
        flexDirection: 'row',

    },
    tag: {
        color: '#999',
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 10,
        marginRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 6,
        paddingRight: 6
    },
    author: {
        color: '#7b7676',
        fontSize: 12
    }
})
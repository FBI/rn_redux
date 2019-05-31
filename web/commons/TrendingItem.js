import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import HTMLView from 'react-native-htmlview';
//import console = require('console');

export default class TrendingItem extends React.Component {
    render() {
        const { projectModel, onSelect } = this.props
        const { fullName, description, meta, contributors } = projectModel
        let descriptionHTML = '<p>' + description + '</p>';
        return (
            <TouchableOpacity
                onPress={() => onSelect()}
            >
                <View style={styles['item-container']}>
                    <Text style={styles.autorName}>{fullName}</Text>
                    <HTMLView
                        value={descriptionHTML}
                        onLinkPress={(url) => {
                        }}
                        stylesheet={{
                            p: styles.description,
                            a: styles.description,
                        }}
                    />
                    <Text style={styles.description}>
                        {meta}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Built by: </Text>
                            {
                                contributors.map((item, i, arr) => {
                                    return <Image
                                        key={i}
                                        style={{height: 22, width: 22, margin: 2}}
                                        source={{uri: item}}
                                    />
                                })
                            }

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles =  StyleSheet.create({
    'item-container': {
        backgroundColor: '#fff',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2 // 设置Z轴方向高度
    },
    autorName: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    }
})
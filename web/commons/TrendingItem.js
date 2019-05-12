import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import HTMLView from 'react-native-htmlview';

export default class TrendingItem extends React.Component {
    render() {
        const { projectModel } = this.props
        console.log(projectModel)
        const { item } = projectModel
        if(!item) return null
        const { fullName, description, meta, contributors } = item
        let descriptionHTML = '<p>' + description + '</p>';
        return (
            <TouchableOpacity>
                <View className={styles['item-container']}>
                    <Text class={styles['author-name']}>{fullName}</Text>
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
                                contributors.map((result, i, arr) => {
                                    return <Image
                                        key={i}
                                        style={{height: 22, width: 22, margin: 2}}
                                        source={{uri: arr[i]}}
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
        backgroundColor: 'white',
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
    'author-name': {
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
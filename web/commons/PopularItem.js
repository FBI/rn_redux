import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import BaseItem from './BaseItem'

export default class PopularItem extends BaseItem {
    render() {
        const { projectModel } = this.props
        const { item } = projectModel
        if(!item || !item.owner) return null
        const { full_name, description, stargazers_count, owner } = item
        return (
            <TouchableOpacity
                onPress={() => this.onItemClick()}
            >
                <View style={styles.container}>
                    <Text style={styles.fullName}>{full_name}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.authorInfo}>
                        <View style={styles.autorImg}>
                            <Text>Author:</Text>
                            <Image 
                                style={styles.img} 
                                source={{url: owner.avatar_url}}
                            />
                        </View>
                        <View style={styles.starBox}>
                            <Text>Stars:</Text>
                            <Text>{stargazers_count}</Text>
                        </View>
                        { this._favoriteIcon() }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
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
    fullName: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    autorImg: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        width: 22,
        height: 22,
        marginLeft: 2
    },
    starBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    authorInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class viewUtil {
    static getLeftBackButton(callback) { 
        return <TouchableOpacity
                    onPress={callback}
                    style={{padding: 6,paddingLeft: 12}}
               >
                    <Ionicons
                        name={'ios-undo'}
                        size={26}
                        style={{color: '#fff'}}
                    />
               </TouchableOpacity>
    }
}
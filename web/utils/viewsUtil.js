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
    static getShareButton(callBack) {
        return <TouchableOpacity
                    underlayColor={'transparent'}
                    onPress={callBack}
               >
                    <Ionicons
                        name={'md-share'}
                        size={20}
                        style={{opacity: 0.9, marginRight: 10, color: 'white'}}
                    />
               </TouchableOpacity>
    }
}
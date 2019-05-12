// 数据请求离线缓存设计框架
//import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Trending from 'GitHubTrending';
export const FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'}

export default class DataSource {
    // 保存数据
    saveData(url, data , callback) {
        if(!url || !data) return
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
    }

    _wrapData(data) {
        return { data, timestamp: new Date().getTime()}
    }

    //  获取本地数据
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem( url, (error, result) => {
                if(!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e)
                        console.log(e)
                    }
                }else {
                    reject(error)
                    console.error(error)
                }
            })
        })
    }

    // 获取网络数据
    fetchNetData( url, flag ) {
        return new Promise((resolve, reject) => {
            if(flag !== FLAG_STORAGE.flag_trending) {
                fetch( url )
                    .then( res => {
                        if(res.ok) return res.json();
                        throw new Error('Network request is not ok')
                    })
                    .then( res => {
                        this.saveData(url, res)
                        resolve(res)
                    })
                    .catch( err => {
                        reject(err)
                    })
            }else {
                new Trending().fetchTrending(url)
                    .then(items => {
                        if (!items) {
                            throw new Error('responseData is null');
                        }
                        this.saveData(url, items);
                        resolve(items);
                    })
                    .catch(error => {
                        reject(error);
                    })
            }
        })
    }
    // 数据请求接口入口
    fetchData( url, flag ) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url)
                .then( wrapData => {
                    if(wrapData && DataSource.checkTimestampValid(wrapData.timestamp)) {
                        // 如果本地数据存在并且数据在有效期范围内就直接返回数据
                        resolve(wrapData);
                    }else {
                        this.fetchNetData( url, flag ).then( data => {
                            resolve(this._wrapData(data))
                        }).catch( err => {
                            reject(err)
                        })
                    }
                })
                .catch( err => {
                    this.fetchNetData( url, flag ).then( data => {
                        resolve(this._wrapData(data))
                    }).catch( err => {
                        reject(err)
                    })
                })
        })
    }

    // 数据有效期检查方法
    static checkTimestampValid(timestamp) {
        let currentData = new Date()
        let targetDate = new Date()
        targetDate.setTime(timestamp)
        if(currentData.getMonth() !== targetDate.getMonth()) return false;
        if(currentData.getDate() !== targetDate.getDate()) return false;
        if(currentData.getHours() - targetDate.getHours() > 4) return false;// 时间差大于4小时，则数据无效
        return true
    }
}
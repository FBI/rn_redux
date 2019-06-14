import {AsyncStorage,} from 'react-native';
import labels from '../config/labels'
import languages from '../config/languages'

export default class LabelLanguageUtil {
    constructor(flag) {
        this.flag = flag;
    }

    /**
     * 获取语言或标签
     * @returns {Promise<any> | Promise}
     */
    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {// 如果本地不存在，则获取配置文件里的初始化ovwx
                    let data = this.flag === 'language' ? languages : labels;
                    this.save(data);
                    resolve(data);
                } else {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                }
            });
        });
    }

    /**
     * 保存语言或标签
     * @param objectData
     */
    save(objectData) {
        let stringData = JSON.stringify(objectData);
        AsyncStorage.setItem(this.flag, stringData, (error, result) => {

        });
    }
}

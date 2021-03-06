import { combineReducers } from 'redux'
import theme from './theme'
import popular from './popular'
import trending from './trending'
import favorite from './favorite'
import labelLanguage from './labels-languages'
import {rootCom, MainNavigator} from '../navigators/AppNavigators';

//1.指定默认state
const navState = MainNavigator.router.getStateForAction(MainNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2.创建自己的 navigation reducer，
 */
const navReducer = (state = navState, action) => {
    const nextState = MainNavigator.router.getStateForAction(action, state);
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
    nav: navReducer,
    theme,
    popular,
    trending,
    favorite,
    labelLanguage
});

export default index;
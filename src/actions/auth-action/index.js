import * as types from './types'
import * as config from '../../web-service/config'
import * as constants from '../../Constants'
import {Actions} from 'react-native-router-flux'
import {instance} from '../../web-service/axiosClient'
import AsyncStorage from '@react-native-community/async-storage';

export const emailChangedAction = (text) => {
    return{
        type: types.EMAIL_CHANGED,
        payload: text
    }
}

export const stopLoadingAction = (text) => {
    return{
        type: types.LOGIN_LOADING,
        payload: false
    }
}

export const passwordChangedAction = (text) => {
    return{
        type: types.PASSWORD_CHANGED,
        payload: text
    }
}

export const loginAction = (email, password) =>
{
    return async (dispatch) => {
        dispatch({type: types.LOGIN_LOADING , payload: true})
        try
        {
            let deviceToken = 'xxxxxx'
            const body = {
                mobileNumber: email,
                password: password,
                deviceToken: deviceToken
            }

            let user = await instance.post(config.LOGIN , body)
            console.log('user: ' + user)
            await AsyncStorage.setItem(constants.mobile_key, email);
            await AsyncStorage.setItem(constants.password_key, password);
            loginSuccess(dispatch,user.data);
        } 
        catch (e)
        {
            console.log('error : ->>>>> ' + e)
            loginFailed(dispatch, 'Login Failed')
        }
    }
}

const loginSuccess = (dispatch, user) => {
    dispatch({type: types.USER_SUCCESS , payload: user})
    Actions.main();
    
}

const loginFailed = (dispatch, e) => {
    dispatch({type: types.USER_FAILED, payload: e})
}
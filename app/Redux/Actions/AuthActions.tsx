import { USER_LOGIN, USER_LOGOUT, LOGIN_ERROR, TOKEN_GENRATE, FORGOT_PASSWORD, FORGOT_ERROR, OTPVERIFY, OTPVERIFY_ERROR, UPDATEPASSWORD, UPDATEPASSWORD_ERROR, RESENDOTP, RESENDOTP_ERROR, CHANGEPASSWORD, CHANGEPASSWORD_ERROR, USERREGISTER, USERREGISTER_ERROR } from '../types'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiEndPoints from '../../components/utilities/apiEndPoints';
import { apiCall } from '../../components/utilities/httpClient';
import { handleApiError } from 'app/components/ErrorMessage/HandleApiErrors';

export const userLogin = (loginDetail: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.LOGIN, loginDetail);
        console.log('res: ', res?.data);
        if (res.data.status === 200) {
            await AsyncStorage.setItem("AuthToken", res?.data?.token);
            await AsyncStorage.setItem("userData", JSON.stringify(res?.data?.data));
            console.log('res?.data: ', res?.data);
            dispatch({
                type: USER_LOGIN,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: LOGIN_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: LOGIN_ERROR,
            payload: console.log(e),
        })
    }
}

export const forgotemailverify = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.FORGOTPASSWORD, params);
        if (res.data.status === 200) {
            /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
            dispatch({
                type: FORGOT_PASSWORD,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: FORGOT_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: FORGOT_ERROR,
            payload: 'Server Error',
        })
    }
}

export const otpVerify = (params: any) => async (dispatch: any) => {
    console.log('params: ', params);
    try {
        const res = await apiCall("post", apiEndPoints.OTPVERIFY, params);
        if (res.data.status === 200) {
            /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
            dispatch({
                type: OTPVERIFY,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: OTPVERIFY_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: OTPVERIFY_ERROR,
            payload: 'Server Error',
        })
    }
}
export const Resendotp = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.RESENDOTP, params);
        if (res.data.status === 200) {
            /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
            dispatch({
                type: RESENDOTP,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: OTPVERIFY_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: OTPVERIFY_ERROR,
            payload: 'Server Error',
        })
    }
}


export const updatepassword = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.UPDATEPASSWORD, params);
        if (res.data.status === 200) {
            /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
            dispatch({
                type: UPDATEPASSWORD,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: UPDATEPASSWORD_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: UPDATEPASSWORD_ERROR,
            payload: 'Server Error',
        })
    }
}

export const changePassword = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.CHANGEPASSWORD, params);
        console.log('res ====: ', res);
        if (res.data.status === 200) {
            console.log('res.data.status: ', res.data.status);
            /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
            dispatch({
                type: CHANGEPASSWORD,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: CHANGEPASSWORD_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: UPDATEPASSWORD_ERROR,
            payload: 'Server Error',
        })
    }
}

export const userLogout = () => async (dispatch: any) => {
    try {
        await AsyncStorage.removeItem("persistantState");
        await AsyncStorage.removeItem("AuthToken");
        await AsyncStorage.removeItem('userData')
        dispatch({
            type: USER_LOGOUT,
            payload: null
        })
    }
    catch (e) {
        dispatch({
            type: LOGIN_ERROR,
            payload: console.log(e),
        })
    }
}

export const jwtTokenGenrate = () => async (dispatch: any) => {
    try {
        const res = await apiCall("get", apiEndPoints.JWTTOKEN, {});
        // console.log('res TKEN API: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: TOKEN_GENRATE,
                payload: res.data
            })
        } else {
            return null;
        }

    }
    catch (e) {
        dispatch({
            type: LOGIN_ERROR,
            payload: console.log(e),
        })
    }
}
export const userRegister = (item: any) => async (dispatch: any) => {
    console.log('item: ', item);
    try {
        const res = await apiCall("post", apiEndPoints.REGISTERANDADDUSER, item);
        console.log('res REGISTERANDADDUSER: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: USERREGISTER,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: USERREGISTER_ERROR,
                payload: []
            })
        }

    }
    catch (e) {
        dispatch({
            type: USERREGISTER_ERROR,
            payload: console.log(e),
        })
    }
}

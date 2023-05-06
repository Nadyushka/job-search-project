import {AppThunk} from "./store";
import {authApi} from "../1-DAL/authApi";
import axios from "axios";
import {errorHandler} from "../3-UI/u2-assets/utilits/error";


const initialState = {
    isAuthorised: false,
    isLoading: false,
    error: '',
    userAuthData: {
        "access_token": '',
        "refresh_token": '',
        "ttl": null,
        "expires_in": null,
        "token_type": '',
    } as userAuthDataType,
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "job-search/auth/isLoading":
            return {...state, isLoading: action.isLoading}
        case "job-search/auth/isAuthorised":
            return {...state, isAuthorised: action.isAuthorised}
        case "job-search/auth/setError":
            return {...state, error: action.error}
        case "job-search/auth/setUserData":
            return {...state, userAuthData: {...action.userAuthData}, isAuthorised: true}
        default:
            return state
    }
}


export const authorisedWithPasswordTC = (login: string, password: string, client_id: number, client_secret: string, hr: number = 0): AppThunk => async (dispatch) => {
    dispatch(isLoadingAC(true))
    dispatch(setErrorAC(''))
    try {
        let res = await authApi.authorisedWithPassword(login, password, client_id, client_secret, hr)
        dispatch(setUserDataAC(res.data))
    } catch (e) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

//actions

export const isLoadingAC = (isLoading: boolean) => ({type: 'job-search/auth/isLoading', isLoading} as const)
export const isAuthorisedAC = (isAuthorised: boolean) => ({type: 'job-search/auth/isAuthorised', isAuthorised} as const)
export const setErrorAC = (error: string) => ({type: 'job-search/auth/setError', error} as const)
export const setUserDataAC = (userAuthData: userAuthDataType) => ({
    type: 'job-search/auth/setUserData',
    userAuthData
} as const)

//types

type ActionsTypes = isLoadingACType | isAuthorisedACType | setErrorType | setAuthUserDataType

type isLoadingACType = ReturnType<typeof isLoadingAC>
type isAuthorisedACType = ReturnType<typeof isAuthorisedAC>
type setErrorType = ReturnType<typeof setErrorAC>
type setAuthUserDataType = ReturnType<typeof setUserDataAC>

type userAuthDataType = {
    "access_token": string,
    "refresh_token": string,
    "ttl": number | null,
    "expires_in": number | null,
    "token_type": string,
}

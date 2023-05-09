import {AppThunk} from "../store";
import {authApi} from "../../1-DAL/authApi";
import {errorHandler} from "../../3-UI/u2-assets/utilits/error";


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
        case "job-search/auth/refreshToken":
            return {...state, userAuthData: {...state.userAuthData, access_token: action.access_token, refresh_token: action.refresh_token}}
        default:
            return state
    }
}

// thunk creators

export const authorisedWithPasswordTC = (login: string, password: string, client_id: number, client_secret: string, hr: number = 0): AppThunk => async (dispatch) => {
    dispatch(isLoadingAC(true))
    dispatch(setErrorAuthAC(''))
    try {
        let res = await authApi.authorisedWithPassword(login, password, client_id, client_secret, hr)
        dispatch(setUserDataAC(res.data))
    } catch (e) {
        errorHandler(e, dispatch, setErrorAuthAC)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

export const refreshTokenTC = (): AppThunk => async (dispatch, getState) => {
    dispatch(isLoadingAC(true))
    dispatch(setErrorAuthAC(''))
    const refreshToken = getState().auth.userAuthData.refresh_token
    try {
        let res = await authApi.refreshToken(refreshToken)
        dispatch(setUserDataAC(res.data))
    } catch (e) {
        errorHandler(e, dispatch, setErrorAuthAC)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

//actions creators

const isLoadingAC = (isLoading: boolean) => ({type: 'job-search/auth/isLoading', isLoading} as const)
const isAuthorisedAC = (isAuthorised: boolean) => ({type: 'job-search/auth/isAuthorised', isAuthorised} as const)
export const setErrorAuthAC = (error: string) => ({type: 'job-search/auth/setError', error} as const)
const setUserDataAC = (userAuthData: userAuthDataType) => ({
    type: 'job-search/auth/setUserData',
    userAuthData
} as const)
const refreshTokenAC = (access_token: string, refresh_token:string) => ({
    type: 'job-search/auth/refreshToken',
    access_token,
    refresh_token
} as const)

//types

type ActionsTypes = isLoadingACType | isAuthorisedACType | setErrorType | setAuthUserDataType | refreshTokenDataType

type isLoadingACType = ReturnType<typeof isLoadingAC>
type isAuthorisedACType = ReturnType<typeof isAuthorisedAC>
type setErrorType = ReturnType<typeof setErrorAuthAC>
type setAuthUserDataType = ReturnType<typeof setUserDataAC>
type refreshTokenDataType = ReturnType<typeof refreshTokenAC>

type userAuthDataType = {
    "access_token": string,
    "refresh_token": string,
    "ttl": number | null,
    "expires_in": number | null,
    "token_type": string,
}

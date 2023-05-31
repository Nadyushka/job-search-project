import {AppThunk} from "../store";
import {authApi} from "1-DAL/authApi";
import {errorHandler} from "3-UI/u2-assets/utilits/error";


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

type InitialStateAuthReducerType = typeof initialState

export const authReducer = (state: InitialStateAuthReducerType = initialState, action: ActionsAuthTypes): InitialStateAuthReducerType => {
    switch (action.type) {
        case "job-search/auth/isLoading":
            return {...state, isLoading: action.isLoading}
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
    dispatch(isLoadingAuthAC(true))
    dispatch(setErrorAuthAC(''))
    try {
        let res = await authApi.authorisedWithPassword({login, password, client_id, client_secret, hr})
        dispatch(setUserDataAuthAC(res.data))
    } catch (e) {
        errorHandler(e, dispatch, setErrorAuthAC)
    } finally {
        dispatch(isLoadingAuthAC(false))
    }
}

export const refreshTokenTC = (): AppThunk => async (dispatch, getState) => {
    dispatch(isLoadingAuthAC(true))
    dispatch(setErrorAuthAC(''))
    const refreshToken = getState().auth.userAuthData.refresh_token
    try {
        let res = await authApi.refreshToken(refreshToken)
        dispatch(setUserDataAuthAC(res.data))
    } catch (e) {
        errorHandler(e, dispatch, setErrorAuthAC)
    } finally {
        dispatch(isLoadingAuthAC(false))
    }
}


//actions creators

export const isLoadingAuthAC = (isLoading: boolean) => ({type: 'job-search/auth/isLoading', isLoading} as const)
export const setErrorAuthAC = (error: string) => ({type: 'job-search/auth/setError', error} as const)
export const setUserDataAuthAC = (userAuthData: userAuthDataType) => ({
    type: 'job-search/auth/setUserData',
    userAuthData
} as const)
export const refreshTokenAC = (access_token: string, refresh_token:string) => ({
    type: 'job-search/auth/refreshToken',
    access_token,
    refresh_token
} as const)

//types

export type ActionsAuthTypes = isLoadingACType  | setErrorType | setAuthUserDataType | refreshTokenDataType

type isLoadingACType = ReturnType<typeof isLoadingAuthAC>
type setErrorType = ReturnType<typeof setErrorAuthAC>
type setAuthUserDataType = ReturnType<typeof setUserDataAuthAC>
type refreshTokenDataType = ReturnType<typeof refreshTokenAC>

type userAuthDataType = {
    "access_token": string,
    "refresh_token": string,
    "ttl": number | null,
    "expires_in": number | null,
    "token_type": string,
}

import {AppThunk} from "./store";
import {ResponseTypeCatalogues, ResponseTypeVacancies, vacancyApi, VacancyInfo} from "1-DAL/vacanciesAPI";
import {errorHandler} from "../3-UI/u2-assets/utilits/error";

const initialState = {
    isLoading: false,
    error: '',
    catalogueData: [] as ResponseTypeCatalogues[],
    vacanciesData: {
        "objects": [] as VacancyInfo[],
        "total": 0,
        "corrected_keyword": '',
        "more": false
    },
    vacancyData: {
        "id": 0,
        "payment_from": 0,
        "payment_to": 0,
        "profession": '',
        "currency": 'rub',
        "type_of_work": {
            "id": 0,
            "title": '',
        },
        "town": {
            "id": 0,
            "title": '',
            "declension": '',
            "genitive": '',
        },
        "firm_name": '',
        "vacancyRichText": '',
    } as VacancyInfo,
    currentPage: 1,
    pageCount: 3,
}

type InitialStateType = typeof initialState

export const vacanciesReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "job-search/auth/isLoading":
            return {...state, isLoading: action.isLoading}
        case "job-search/auth/setError":
            return {...state, error: action.error}
        case "job-search/vacancies/setCatalogueData":
            return {...state, catalogueData: action.catalogueData}
        case "job-search/vacancies/setVacanciesData":
            return {
                ...state,
                vacanciesData: {...action.vacanciesData, objects: action.vacanciesData.objects.map(v => ({...v}))}
            }
        case "job-search/vacancies/setVacancyData":
            return {
                ...state,
                vacancyData: {...action.vacancyData}
            }
        case "job-search/vacancies/setPageInfo":
            return {
                ...state,
                currentPage: action.page
            }
        default:
            return state
    }
}


export const setCatalogueDataTC = (): AppThunk => async (dispatch) => {
    dispatch(isLoadingAC(true))
    try {
        let res = await vacancyApi.getCatalogues()
        dispatch(setCatalogueDataAC(res.data))
    } catch (e) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

export const setVacanciesDataTC = (currentPage: number, count: number, published?: number, keyword?: string, payment_from?: string, payment_to?: string, catalogues?: string): AppThunk => async (dispatch, getState) => {
    dispatch(isLoadingAC(true))
    console.log(currentPage)
    const token = getState().auth.userAuthData.access_token
    try {
        let res = await vacancyApi.getVacancies(token, currentPage, count, published, keyword, payment_from, payment_to, catalogues)
        dispatch(setVacanciesDataAC(res.data))
    } catch (e) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

export const setVacancyDataTC = (id: number): AppThunk => async (dispatch, getState) => {
    dispatch(isLoadingAC(true))
    const token = getState().auth.userAuthData.access_token
    try {
        let res = await vacancyApi.getVacancy(id, token)
        dispatch(setVacancyDataAC(res.data))
    } catch (e) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

// actions

export const isLoadingAC = (isLoading: boolean) => ({type: 'job-search/auth/isLoading', isLoading} as const)
export const setErrorAC = (error: string) => ({type: 'job-search/auth/setError', error} as const)
export const setCatalogueDataAC = (catalogueData: ResponseTypeCatalogues[]) => ({
    type: 'job-search/vacancies/setCatalogueData',
    catalogueData
} as const)
export const setVacanciesDataAC = (vacanciesData: ResponseTypeVacancies) => ({
    type: 'job-search/vacancies/setVacanciesData',
    vacanciesData
} as const)
export const setVacancyDataAC = (vacancyData: VacancyInfo) => ({
    type: 'job-search/vacancies/setVacancyData',
    vacancyData
} as const)
export const setPageInfoAC = (page: number) => ({
    type: 'job-search/vacancies/setPageInfo',
    page
} as const)

// types

type ActionsTypes =
    isLoadingACType
    | setErrorType
    | setCatalogueDataType
    | setVacanciesDataType
    | setVacancyDataType
    | setPageInfoType

type isLoadingACType = ReturnType<typeof isLoadingAC>
type setErrorType = ReturnType<typeof setErrorAC>
type setCatalogueDataType = ReturnType<typeof setCatalogueDataAC>
type setVacanciesDataType = ReturnType<typeof setVacanciesDataAC>
type setVacancyDataType = ReturnType<typeof setVacancyDataAC>
type setPageInfoType = ReturnType<typeof setPageInfoAC>
import {AppThunk} from "../store";
import {
    ResponseTypeCatalogues,
    ResponseTypeVacancies,
    SelectedVacancyInfo,
    vacancyApi,
    VacancyInfo
} from "1-DAL/vacanciesAPI";
import {errorHandler} from "3-UI/u2-assets/utilits/error";

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
        "payment_from": '',
        "payment_to": '',
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
    payment_from: '' as number | '',
    payment_to: '' as number | '',
    jobArea: '',
    keyWord: '',
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
        case "job-search/vacancies/setFilters":
            return {
                ...state,
                payment_to: action.payment_to!,
                payment_from: action.payment_from!,
                keyWord: action.keyword!,
                jobArea: action.catalogues!,
                currentPage: 1,
            }
        default:
            return state
    }
}

// thunk creators

export const setCatalogueDataTC = (): AppThunk => async (dispatch) => {

    dispatch(isLoadingAC(true))
    try {
        let res = await vacancyApi.getCatalogues()
        dispatch(setCatalogueDataAC(res.data))
    } catch (e) {
        errorHandler(e, dispatch, setErrorVacancyAC)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

export const setVacanciesDataTC = (currentPage: number, count: number,): AppThunk => async (dispatch, getState) => {
    dispatch(isLoadingAC(true))
    const token = getState().auth.userAuthData.access_token

    const selectedVacanciesLS = localStorage.getItem('selectedVacancies')
    let selectedVacancies: number[]
    if (selectedVacanciesLS) {
        selectedVacancies = JSON.parse(localStorage.getItem('selectedVacancies')!).selectedVacanciesArray.map((v: SelectedVacancyInfo) => v.id)
    } else {
        selectedVacancies = []
    }

    try {
        let res = await vacancyApi.getVacancies(token, currentPage, count)
        let vacancies = {...res.data,
            objects: res.data.objects.map(v => selectedVacancies.includes(v.id) ? {...v, marked: true} : {
                ...v,
                marked: false
            })
        }
        dispatch(setVacanciesDataAC(vacancies))
    } catch (e) {
        errorHandler(e, dispatch, setErrorVacancyAC)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

export const setFiltredVacanciesDataTC = (currentPage: number, count: number, published?: number, keyword?: string | '', payment_from?: number | '', payment_to?: number | '', catalogues?: string | ''): AppThunk => async (dispatch, getState) => {
    dispatch(isLoadingAC(true))
    const token = getState().auth.userAuthData.access_token

    const selectedVacanciesLS = localStorage.getItem('selectedVacancies')
    let selectedVacancies: number[]
    if (selectedVacanciesLS) {
        selectedVacancies = JSON.parse(localStorage.getItem('selectedVacancies')!).selectedVacanciesArray.map((v: SelectedVacancyInfo) => v.id)
    } else {
        selectedVacancies = []
    }

    const catalogueID = getState().vacancies.catalogueData.find(c => c.title_rus === catalogues)!.key.toString()
    try {
        let res = await vacancyApi.getFiltredVacancies(token, {
            page: currentPage,
            count,
            published,
            keyword,
            payment_from,
            payment_to,
            catalogues: catalogueID
        })
        dispatch(setFiltersAC(keyword, payment_from, payment_to, catalogues))
        let vacancies = {...res.data,
            objects: res.data.objects.map(v => selectedVacancies.includes(v.id) ? {...v, marked: true} : {
                ...v,
                marked: false
            })
        }
        dispatch(setVacanciesDataAC(vacancies))
    } catch (e) {
        errorHandler(e, dispatch, setErrorVacancyAC)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

export const setVacancyDataTC = (id: number): AppThunk => async (dispatch, getState) => {
    dispatch(isLoadingAC(true))
    const token = getState().auth.userAuthData.access_token

    const selectedVacanciesLS = localStorage.getItem('selectedVacancies')
    let selectedVacancies: number[]
    if (selectedVacanciesLS) {
        selectedVacancies = JSON.parse(localStorage.getItem('selectedVacancies')!).selectedVacanciesArray.map((v: SelectedVacancyInfo) => v.id)
    } else {
        selectedVacancies = []
    }

    try {
        let res = await vacancyApi.getVacancy(id, token)
        let vacancies = {...res.data, marked: selectedVacancies.includes(res.data.id)}
        dispatch(setVacancyDataAC(vacancies))
    } catch (e) {
        errorHandler(e, dispatch, setErrorVacancyAC)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

// actions

const isLoadingAC = (isLoading: boolean) => ({type: 'job-search/auth/isLoading', isLoading} as const)
export const setErrorVacancyAC = (error: string) => ({type: 'job-search/auth/setError', error} as const)
const setCatalogueDataAC = (catalogueData: ResponseTypeCatalogues[]) => ({
    type: 'job-search/vacancies/setCatalogueData',
    catalogueData
} as const)
const setVacanciesDataAC = (vacanciesData: ResponseTypeVacancies) => ({
    type: 'job-search/vacancies/setVacanciesData',
    vacanciesData
} as const)
const setVacancyDataAC = (vacancyData: VacancyInfo) => ({
    type: 'job-search/vacancies/setVacancyData',
    vacancyData
} as const)
const setPageInfoAC = (page: number) => ({
    type: 'job-search/vacancies/setPageInfo',
    page
} as const)
export const setFiltersAC = (keyword?: string | '', payment_from?: number | '', payment_to?: number | '', catalogues?: string | '') => ({
    type: 'job-search/vacancies/setFilters',
    payment_from, payment_to, catalogues, keyword
} as const)


// types

type ActionsTypes =
    isLoadingACType
    | setErrorType
    | setCatalogueDataType
    | setVacanciesDataType
    | setVacancyDataType
    | setPageInfoType
    | setFiltersType

type isLoadingACType = ReturnType<typeof isLoadingAC>
type setErrorType = ReturnType<typeof setErrorVacancyAC>
type setCatalogueDataType = ReturnType<typeof setCatalogueDataAC>
type setVacanciesDataType = ReturnType<typeof setVacanciesDataAC>
type setVacancyDataType = ReturnType<typeof setVacancyDataAC>
type setPageInfoType = ReturnType<typeof setPageInfoAC>
type setFiltersType = ReturnType<typeof setFiltersAC>
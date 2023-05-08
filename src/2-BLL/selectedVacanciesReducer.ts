import {AppThunk} from "./store";
import {VacancyInfo} from "1-DAL/vacanciesAPI";
import {errorHandler} from "3-UI/u2-assets/utilits/error";

const initialState = {
    isLoading: false,
    error: '',
    vacanciesData: {
        "objects": [] as VacancyInfo[],
        "total": 0,
        "corrected_keyword": '',
        "more": false
    },
    currentPage: 1,
    pageCount: 3,
}

type InitialStateType = typeof initialState

export const selectedVacanciesReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "job-search/auth/isLoading":
            return {...state, isLoading: action.isLoading}
        case "job-search/auth/setError":
            return {...state, error: action.error}
        case "job-search/selectedVacancies/setSelectedVacanciesData":
            return {
                ...state,
                currentPage: action.currentPage,
                pageCount: action.count,
                vacanciesData: {
                    ...state.vacanciesData,
                    total: action.objects.length,
                    objects: action.objects.map(v => ({...v}))
                }
            }
        default:
            return state
    }
}


export const setSelectedVacanciesDataTC = (currentPage: number, count: number): AppThunk => async (dispatch) => {
    dispatch(isLoadingAC(true))
    const localStorageSelectedVacancies = localStorage.getItem('selectedVacancies') ? localStorage.getItem('selectedVacancies') : '{selectedVacanciesArray:[]}'
    try {
        let selectedItems: VacancyInfo[] = JSON.parse(localStorageSelectedVacancies!).selectedVacanciesArray
        dispatch(setSelectedVacanciesDataAC(selectedItems, currentPage, count))
    } catch (e) {
        errorHandler(e, dispatch, setErrorVacancyAC)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

export const removeVacancyFromSelectionTC = (id: number, currentPage: number, count: number): AppThunk => async (dispatch, getState) => {
    dispatch(isLoadingAC(true))
    const selectedVacancies = getState().selectedVacancies.vacanciesData.objects.filter(v => v.id !== id)
    localStorage.removeItem('selectedVacancies')
    localStorage.setItem('selectedVacancies', JSON.stringify({selectedVacanciesArray: selectedVacancies}))

    try {
        dispatch(setSelectedVacanciesDataAC(selectedVacancies, currentPage, count))
    } catch (e) {
        errorHandler(e, dispatch, setErrorVacancyAC)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

export const addVacancyToSelectedTC = (id: number, professionName: string, salary: number | "", curruncy: string, type: { id: number, title: string, declension: string, genitive: string }, place: {}): AppThunk => async (dispatch, getState) => {
    dispatch(isLoadingAC(true))
    const selectedVacancies = getState().selectedVacancies.vacanciesData.objects.filter(v => v.id !== id)
    localStorage.removeItem('selectedVacancies')
    localStorage.setItem('selectedVacancies', JSON.stringify({selectedVacanciesArray: selectedVacancies}))

    try {
        dispatch(setSelectedVacanciesDataAC(selectedVacancies, currentPage, count))
    } catch (e) {
        errorHandler(e, dispatch, setErrorVacancyAC)
    } finally {
        dispatch(isLoadingAC(false))
    }
}


// actions

const isLoadingAC = (isLoading: boolean) => ({type: 'job-search/auth/isLoading', isLoading} as const)
const setErrorVacancyAC = (error: string) => ({type: 'job-search/auth/setError', error} as const)
const setSelectedVacanciesDataAC = (objects: VacancyInfo[], currentPage: number, count: number) => ({
    type: 'job-search/selectedVacancies/setSelectedVacanciesData',
    objects,
    count,
    currentPage
} as const)


// types

type ActionsTypes =
    isLoadingACType
    | setErrorType
    | setSelectedVacanciesDataType


type isLoadingACType = ReturnType<typeof isLoadingAC>
type setErrorType = ReturnType<typeof setErrorVacancyAC>
type setSelectedVacanciesDataType = ReturnType<typeof setSelectedVacanciesDataAC>


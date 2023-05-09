import {AppThunk} from "../store";
import {SelectedVacancyInfo, VacancyInfo} from "1-DAL/vacanciesAPI";
import {errorHandler} from "3-UI/u2-assets/utilits/error";

const initialState = {
    isLoading: false,
    error: '',
    vacanciesData: {
        "objects": [] as SelectedVacancyInfo[],
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

// thunk creators

export const setSelectedVacanciesDataTC = (currentPage: number, count: number): AppThunk => async (dispatch) => {
    dispatch(isLoadingAC(true))
    const localStorageSelectedVacancies = localStorage.getItem('selectedVacancies') ? localStorage.getItem('selectedVacancies') : '{selectedVacanciesArray:[]}'
    try {
        let selectedItems: VacancyInfo[] = JSON.parse(localStorageSelectedVacancies!).selectedVacanciesArray
        dispatch(setSelectedVacanciesDataAC(selectedItems, currentPage, count))
    } catch (e) {
        errorHandler(e, dispatch, setErrorSelectedVacancyAC)
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
        errorHandler(e, dispatch, setErrorSelectedVacancyAC)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

export const addVacancyToSelectedTC = (id: number, professionName: string, salary: number | "", currency: "rub" | "uah" | "uzs", type_of_work: string, town: string): AppThunk => async (dispatch, getState) => {
    dispatch(isLoadingAC(true))
    const pageCount = getState().selectedVacancies.pageCount
    const selectedVacanciesSaved = getState().selectedVacancies.vacanciesData.objects
    const newVacancy = {
        id,
        profession: professionName,
        currency: currency,
        payment_from: salary,
        type_of_work: {title: type_of_work},
        town: {title: town},
        marked: true
    }

    const selectedVacancies = [...selectedVacanciesSaved, newVacancy]
    localStorage.removeItem('selectedVacancies')
    localStorage.setItem('selectedVacancies', JSON.stringify({selectedVacanciesArray: selectedVacancies}))

    try {
        dispatch(setSelectedVacanciesDataAC(selectedVacancies, 1, pageCount))
    } catch (e) {
        errorHandler(e, dispatch, setErrorSelectedVacancyAC)
    } finally {
        dispatch(isLoadingAC(false))
    }
}


// actions

const isLoadingAC = (isLoading: boolean) => ({type: 'job-search/auth/isLoading', isLoading} as const)
export const setErrorSelectedVacancyAC = (error: string) => ({type: 'job-search/auth/setError', error} as const)
const setSelectedVacanciesDataAC = (objects: SelectedVacancyInfo[], currentPage: number, count: number) => ({
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
type setErrorType = ReturnType<typeof setErrorSelectedVacancyAC>
type setSelectedVacanciesDataType = ReturnType<typeof setSelectedVacanciesDataAC>


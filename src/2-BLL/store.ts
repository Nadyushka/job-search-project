import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {authReducer} from "./authReucer/authReducer";
import {vacanciesReducer} from "./vacancyReducer/vacanciesReducer";
import {selectedVacanciesReducer} from "./selectedVacanciesReducer/selectedVacanciesReducer";


// store
const rootReducer = combineReducers({
    auth: authReducer,
    vacancies: vacanciesReducer,
    selectedVacancies: selectedVacanciesReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//custom hooks
export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//@ts-ignore
window.store = store

// types
export type AppRootStateType = ReturnType<typeof rootReducer>

// export type AppRootActionsType = AppActionsType
//     // | PacksActionsType
//     // | CardsActionsType
//     // | AuthActionsType

export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AnyAction
>
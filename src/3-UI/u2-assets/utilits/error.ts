import axios from "axios";
import {setErrorAC} from "../../../2-BLL/vacanciesReducer";
import {Dispatch} from "react";

export const errorHandler = (e: any, dispatch: Dispatch<any>, setErrorAC: (error: string) => void) => {
    if (axios.isAxiosError<ErrorType>(e)) {
        const error = e.response?.data ? e.response.data.error.message : e.message
        dispatch(setErrorAC(error))
    } else {
        dispatch(setErrorAC('Some error'))
    }
}

type ErrorType = {
    error: {
        code: string,
        message: string
    }
}
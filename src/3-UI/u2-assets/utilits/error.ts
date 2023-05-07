import axios from "axios";
import {Dispatch} from "react";

export const errorHandler = (e: any, dispatch: Dispatch<any>, setErrorAC: (error: string) =>  { type: string, error: string }) => {
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
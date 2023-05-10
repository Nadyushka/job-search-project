import {SelectedVacancyInfo} from "../../../1-DAL/vacanciesAPI";

export const getDataFromLocalStorage = (): number[] => {
    const selectedVacanciesLS = localStorage.getItem('selectedVacancies')
    if (selectedVacanciesLS) {
        debugger
        return JSON.parse(localStorage.getItem('selectedVacancies')!).selectedVacanciesArray.map((v: SelectedVacancyInfo) => v.id)
    } else {
        return []
    }
}
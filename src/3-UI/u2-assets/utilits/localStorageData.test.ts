import {getDataFromLocalStorage} from "./localStorageData";

test('should return array with ID all selected vacancies', () => {

    let selectedVacanciesInLocalStorage = [{
        id: 1,
        payment_from: 150000,
        profession: 'Manager',
        currency: "rub",
        type_of_work: {title: 'remote'},
        town: {title: 'Minsk'},
        marked: true
    } , {
        id: 15,
        payment_from: 150000,
        profession: 'Manager',
        currency: "rub",
        type_of_work: {title: 'remote'},
        town: {title: 'Minsk'},
        marked: true
    }, {
        id: 78,
        payment_from: 150000,
        profession: 'Manager',
        currency: "rub",
        type_of_work: {title: 'remote'},
        town: {title: 'Minsk'},
        marked: true
    }]

    localStorage.setItem('selectedVacancies', JSON.stringify({selectedVacanciesArray: selectedVacanciesInLocalStorage}))

    let finalVacanciesArray = getDataFromLocalStorage()

    expect(finalVacanciesArray.length).toBe(3)
    expect(finalVacanciesArray).toEqual([1, 15, 78])

})


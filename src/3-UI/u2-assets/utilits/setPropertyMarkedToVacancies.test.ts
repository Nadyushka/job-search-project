import {setPropertyMarkedToVacancies} from "./setPropertyMarkedToVacancies";
import {ResponseTypeVacancies} from "../../../1-DAL/vacanciesAPI";

test('should update to each vacancy property marked depending local storage info', () => {

    let testSavedVacancies: ResponseTypeVacancies = {
        objects: [{
            id: 1,
            payment_from: 150000,
            payment_to: 200000,
            profession: '',
            currency: "rub",
            type_of_work: {id: 1, title: 'remote'},
            town: {id: 2, title: 'Minsk', declension: '', genitive: ''},
            firm_name: '',
            vacancyRichText: '',
            marked: false
        },
            {
                id: 11,
                payment_from: 150000,
                payment_to: 200000,
                profession: 'Manager',
                currency: "rub",
                type_of_work: {id: 1, title: 'remote'},
                town: {id: 2, title: 'Minsk', declension: '', genitive: ''},
                firm_name: '',
                vacancyRichText: '',
                marked: false
            }],
        total: 10, corrected_keyword: '', more: true
    }

    let selectedVacancyInLS = [{
        id: 11,
        payment_from: 150000,
        profession: 'Manager',
        currency: "rub",
        type_of_work: {title: 'remote'},
        town: {title: 'Minsk'},
        marked: true
    }]

    localStorage.setItem('selectedVacancies', JSON.stringify({selectedVacanciesArray: selectedVacancyInLS}))

    let finalVacanciesArray = setPropertyMarkedToVacancies(testSavedVacancies)

    expect(finalVacanciesArray.objects.length).toBe(2)
    expect(finalVacanciesArray.objects[0].marked).toBeFalsy()
    expect(finalVacanciesArray.objects[1].marked).toBeTruthy()

})


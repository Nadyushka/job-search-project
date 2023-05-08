import {Container, createStyles, Pagination, rem} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {VacancyItem} from "../../p1-jobSearch/j1-jobSearchFiltersAndOffers/j1-vacancyItem/VacancyItem";
import {NoSavedVacancies} from "../s2-noSavedVacancies/NoSavedVacancies";
import {PATH} from "../../../../c3-commonComponents/routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../../../../2-BLL/store";
import {useNavigate} from "react-router-dom";
import {setSelectedVacanciesDataTC} from "../../../../../../2-BLL/selectedVacanciesReducer";
import {LoaderComponent} from "../../../../c3-commonComponents/loader/Loader";
import {ErrorComponent} from "../../../../c3-commonComponents/error/ErrorComponent";

export const SavedVacancy = () => {

    const {classes, cx} = useStyles();


    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isAuthorised = useAppSelector((state) => state.auth.isAuthorised)
    const isLoading = useAppSelector((state) => state.selectedVacancies.isLoading)
    const error = useAppSelector((state) => state.selectedVacancies.error)
    const selectedVacancies = useAppSelector((state) => state.selectedVacancies.vacanciesData.objects)
    const totalVacancies = useAppSelector((state) => state.selectedVacancies.vacanciesData.total)
    const pageCount = useAppSelector((state) => state.selectedVacancies.pageCount)
    const currentPage = useAppSelector((state) => state.selectedVacancies.currentPage)

    const [activePage, setPage] = useState<number>(currentPage);

    let totalPages = Math.ceil(totalVacancies / pageCount)
    let firstValueOfCurrentPage = activePage > totalPages ? activePage * pageCount - 2 * pageCount : activePage * pageCount - pageCount
    let lastValueOfCurrentPage = firstValueOfCurrentPage + pageCount


    useEffect(() => {
        dispatch(setSelectedVacanciesDataTC(1, 3))

        if (selectedVacancies.length === 0) {
            navigate(PATH.NO_SELECTED_VACANCIES)
        }

    }, [])

    // if (!isAuthorised) {
    //     navigate(PATH.LOGIN)
    // }

    if (isLoading) {
        return <LoaderComponent/>
    }

    return (
        <Container className={classes.selectedVacancyContainer}>
            {selectedVacancies.length !== 0 && selectedVacancies.slice(firstValueOfCurrentPage, lastValueOfCurrentPage).map(v => {
                return (
                    <VacancyItem key={v.id} id={v.id} professionName={v.profession} curruency={v.currency}
                                 salary={v.payment_from} type={v.type_of_work.title} place={v.town.title}
                                 showSelectedVacancy={true} marked={true}/>
                )
            })}
            <Pagination className={classes.jobSearchPagination}
                        value={activePage}
                        onChange={setPage}
                        total={totalPages}
            />
            <ErrorComponent errorMessage={error}/>
        </Container>
    );
};

const useStyles = createStyles((theme) => ({
    selectedVacancyContainer: {
        maxWidth: `773px`,
        backgroundColor: '#F7F7F8',
        margin: '0px auto',
        padding: '20px 0px 0px 0px',
        height: '100%',
        position: 'relative',
    },

    jobSearchPagination: {
        justifyContent: 'center',
        marginTop: '40px',
        marginBottom: '44px',

        [`@media (max-width: ${rem(400)})`]: {
            flexDirection: 'column',
        },
    }
}))

// const i = JSON.stringify(
//     {
//         'selectedVacanciesArray': [
//             {
//                 id: 1,
//                 profession: 'manager',
//                 currency: 'rub',
//                 payment_from: 10000,
//                 type_of_work: {title: 'full-time'},
//                 town: {title: 'minsk'}
//             },
//             {
//                 id: 2,
//                 profession: 'manager 1c',
//                 currency: 'rub',
//                 payment_from: 15000,
//                 type_of_work: {title: 'full-time'},
//                 town: {title: 'minsk'}
//             },
//             {
//                 id: 3,
//                 profession: 'manager',
//                 currency: 'rub',
//                 payment_from: 20000,
//                 type_of_work: {title: 'full-time'},
//                 town: {title: 'minsk'}
//             },{
//                 id: 3,
//                 profession: 'man',
//                 currency: 'rub',
//                 payment_from: 10000,
//                 type_of_work: {title: 'full-time'},
//                 town: {title: 'minsk'}
//             },
//             {
//                 id: 4,
//                 profession: 'man 1c',
//                 currency: 'rub',
//                 payment_from: 15000,
//                 type_of_work: {title: 'full-time'},
//                 town: {title: 'minsk'}
//             },
//             {
//                 id: 5,
//                 profession: 'man',
//                 currency: 'rub',
//                 payment_from: 20000,
//                 type_of_work: {title: 'full-time'},
//                 town: {title: 'minsk'}
//             }, {
//                 id: 6,
//                 profession: 'mar',
//                 currency: 'rub',
//                 payment_from: 10000,
//                 type_of_work: {title: 'full-time'},
//                 town: {title: 'minsk'}
//             },
//             {
//                 id: 7,
//                 profession: 'mar 1c',
//                 currency: 'rub',
//                 payment_from: 15000,
//                 type_of_work: {title: 'full-time'},
//                 town: {title: 'minsk'}
//             },
//             {
//                 id: 8,
//                 profession: 'mar',
//                 currency: 'rub',
//                 payment_from: 20000,
//                 type_of_work: {title: 'full-time'},
//                 town: {title: 'minsk'}
//             }]
//     })
//
//
// localStorage.setItem('selectedVacancies', i)
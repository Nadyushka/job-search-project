import {Container, Pagination} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {VacancyItem} from "../../../../c2-commonComponents/openVacancy/vacancyItem/VacancyItem";
import {PATH} from "../../../../c2-commonComponents/routes/Routes";
import {useAppDispatch, useAppSelector} from "2-BLL/store";
import {useNavigate} from "react-router-dom";
import {
    setErrorSelectedVacancyAC,
    setSelectedVacanciesDataTC
} from "2-BLL/selectedVacanciesReducer/selectedVacanciesReducer";
import {LoaderComponent} from "../../../../c2-commonComponents/loader/Loader";
import {ErrorComponent} from "../../../../c2-commonComponents/error/ErrorComponent";
import {useStyles} from './styleSavedVacancies';
import {isAuthorisedAuth} from "2-BLL/authReucer/selectorsAuth";
import {
    currentPageSelectedVacancies,
    errorSelectedVacancies,
    isLoadingSelectedVacancies, pageCountSelectedVacancies, vacanciesDataSelectedVacancies
} from "2-BLL/selectedVacanciesReducer/selectorsSelectedVacancies";

export const SavedVacancies = () => {

    // dispatch and selectors

    const dispatch = useAppDispatch()
    const isAuthorised = useAppSelector(isAuthorisedAuth)
    const isLoading = useAppSelector(isLoadingSelectedVacancies)
    const error = useAppSelector(errorSelectedVacancies)
    const selectedVacancies = useAppSelector(vacanciesDataSelectedVacancies).objects
    const totalVacancies = useAppSelector(vacanciesDataSelectedVacancies).total
    const pageCount = useAppSelector(pageCountSelectedVacancies)
    const currentPage = useAppSelector(currentPageSelectedVacancies)

    // hooks

    const navigate = useNavigate()

    // add styles

    const {classes, cx} = useStyles();

    // set pages

    let totalPages = Math.ceil(totalVacancies / pageCount)
    const [activePage, setPage] = useState<number>(currentPage);
    let firstValueOfCurrentPage = activePage > totalPages ? activePage * pageCount - 2 * pageCount : activePage * pageCount - pageCount
    let lastValueOfCurrentPage = firstValueOfCurrentPage + pageCount

    useEffect(() => {
        dispatch(setSelectedVacanciesDataTC(1, 3))
        if (selectedVacancies.length === 0) {
            navigate(PATH.NO_SELECTED_VACANCIES)
        }
    }, [selectedVacancies.length])

    if (!isAuthorised) {
        navigate(PATH.LOGIN)
    }

    if (isLoading) {
        return <LoaderComponent/>
    }

    return (
        <Container className={classes.selectedVacancyContainer}>
            {selectedVacancies.slice(firstValueOfCurrentPage, lastValueOfCurrentPage).map(v => {
                return (
                    <VacancyItem key={v.id} id={v.id} professionName={v.profession} curruency={v.currency}
                                 salary={v.payment_from} type={v.type_of_work.title} place={v.town.title}
                                 showSelectedVacancy={true} marked={v.marked}/>
                )
            })}
            <Pagination className={classes.jobSearchPagination}
                        value={activePage}
                        onChange={setPage}
                        total={totalPages}
            />

            <ErrorComponent errorMessage={error} setError={setErrorSelectedVacancyAC}/>

        </Container>
    );
};

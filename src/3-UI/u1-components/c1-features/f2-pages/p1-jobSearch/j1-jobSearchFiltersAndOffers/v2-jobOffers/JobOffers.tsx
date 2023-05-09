import {Button, Container, Pagination, TextInput} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {Search} from 'tabler-icons-react';
import {VacancyItem} from "../../../../../c2-commonComponents/openVacancy/vacancyItem/VacancyItem";
import {useAppDispatch, useAppSelector} from "2-BLL/store";
import {
    setCatalogueDataTC, setErrorVacancyAC, setFiltersAC,
    setFiltredVacanciesDataTC,
    setVacanciesDataTC
} from "2-BLL/vacancyReducer/vacanciesReducer";
import {LoaderComponent} from "../../../../../c2-commonComponents/loader/Loader";
import {ErrorComponent} from "../../../../../c2-commonComponents/error/ErrorComponent";
import {useStyles} from "./styleJobOffers";
import {
    currentPageVacancies,
    errorVacancies,
    isLoadingVacancies,
    jobAreaVacancies,
    keyWordVacancies,
    pageCountVacancies,
    paymentFromVacancies,
    paymentToVacancies,
    vacanciesDataVacancies
} from "2-BLL/vacancyReducer/vacancySelectors";

export const JobOffers = () => {

    // dispatch и selectors

    const dispatch = useAppDispatch()

    const vacancies = useAppSelector(vacanciesDataVacancies).objects
    const error = useAppSelector(errorVacancies)
    const isLoading = useAppSelector(isLoadingVacancies)
    const totalVacancies = useAppSelector(vacanciesDataVacancies).total
    const pagesCount = useAppSelector(pageCountVacancies)
    const paymentFrom = useAppSelector(paymentFromVacancies)
    const paymentTo = useAppSelector(paymentToVacancies)
    const jobArea = useAppSelector(jobAreaVacancies)
    const kewWord = useAppSelector(keyWordVacancies)

    // page information

    const [activePage, setPage] = useState<number>(1);
    const totalPages = totalVacancies / pagesCount
    const [kewWordValue, setKewWordValue] = useState<string>(kewWord)

    // styles

    const {classes, cx} = useStyles();

    // set data attributes

    const keyWordInputDataAttribute = {'data-elem': 'search-input'}
    const useKeyWordDataAttribute = {'data-elem': 'search-button'}

    // set filters values

    const pageOnClickHandler = () => {
        dispatch(setFiltersAC(kewWordValue, paymentFrom, paymentTo, jobArea))
    }

    useEffect(() => {
        if (jobArea.length !== 0) {
            dispatch(setFiltredVacanciesDataTC(activePage, pagesCount, 1, kewWordValue, paymentFrom, paymentTo, jobArea))
        } else {
            dispatch(setCatalogueDataTC())
            dispatch(setVacanciesDataTC(activePage, pagesCount))
        }
        kewWord === '' && setKewWordValue('')
    }, [activePage, paymentFrom, paymentTo, jobArea, kewWord])

    if (isLoading) {
        return <LoaderComponent/>
    }

    return (
        <Container className={classes.jobSearchContainer}>
            <TextInput className={classes.inputJobName}
                       value={kewWordValue}
                       onChange={(e) => setKewWordValue(e.currentTarget.value)}
                       size={'lg'}
                       placeholder="Введите название вакансии"
                       icon={<Search size="1rem"/>}
                       {...keyWordInputDataAttribute}
                       rightSection={<Button size="sm"
                                             onClick={pageOnClickHandler} {...useKeyWordDataAttribute}>Поиск</Button>}/>
            {vacancies.length > 0 && vacancies.map((j) => {
                return (
                    <VacancyItem key={j.id} id={j.id} professionName={j.profession}
                                 salary={j.payment_from}
                                 curruency={j.currency}
                                 type={j.type_of_work.title}
                                 place={j.town.title}
                                 marked={j.marked} showSelectedVacancy={false}/>
                )
            })}
            {vacancies.length > 0 &&
                <Pagination className={classes.jobSearchPagination}
                            value={activePage}
                            onChange={setPage}
                            onClick={pageOnClickHandler}
                            total={totalPages}/>}

            <ErrorComponent errorMessage={error} setError={setErrorVacancyAC}/>

        </Container>
    );
};


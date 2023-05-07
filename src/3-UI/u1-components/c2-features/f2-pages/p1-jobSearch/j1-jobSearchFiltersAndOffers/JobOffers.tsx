import {Box, Button, Container, createStyles, Pagination, rem, TextInput} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {Search} from 'tabler-icons-react';
import {VacancyItem} from "./j1-vacancyItem/VacancyItem";
import {useAppDispatch, useAppSelector} from "../../../../../../2-BLL/store";
import {
    setCatalogueDataTC, setFiltersAC,
    setFiltredVacanciesDataTC,
    setVacanciesDataTC
} from "../../../../../../2-BLL/vacanciesReducer";
import {LoaderComponent} from "../../../../c3-commonComponents/loader/Loader";
import {ErrorComponent} from "../../../../c3-commonComponents/error/ErrorComponent";

export const JobOffers = () => {

    const {classes, cx} = useStyles();
    const [activePage, setPage] = useState<number>(1);

    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(state => state.vacancies.vacanciesData.objects)
    const error = useAppSelector(state => state.vacancies.error)
    const isLoading = useAppSelector(state => state.vacancies.isLoading)
    const totalVacancies = useAppSelector(state => state.vacancies.vacanciesData.total)
    const pagesCount = useAppSelector(state => state.vacancies.pageCount)
    const paymentFrom = useAppSelector(state => state.vacancies.payment_from)
    const paymentTo = useAppSelector(state => state.vacancies.payment_to)
    const jobArea = useAppSelector(state => state.vacancies.jobArea)
    const kewWord = useAppSelector(state => state.vacancies.keyWord)
    const currentPage = useAppSelector(state => state.vacancies.currentPage)

    const totalPages = totalVacancies / pagesCount

    const [kewWordValue, setKewWordValue] = useState<string>(kewWord)
    const keyWordInputDataAttribute = {'data-elem': 'search-input'}
    const useKeyWordDataAttribute = {'data-elem': 'search-button'}

    useEffect(() => {
        dispatch(setCatalogueDataTC())
        if (jobArea) {

            dispatch(setFiltredVacanciesDataTC(activePage, pagesCount, 1, kewWordValue, paymentFrom, paymentTo, jobArea))
        } else {
            dispatch(setVacanciesDataTC(activePage, pagesCount))
        }
    }, [activePage, paymentFrom, paymentTo, jobArea, kewWord])

    const pageOnClickHandler = () => {
        dispatch(setFiltersAC(kewWordValue, paymentFrom, paymentTo, jobArea))
    }

    return (
        <Container className={classes.jobSearchContainer}>

            {isLoading && <LoaderComponent/>}

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
                                 marked={false} showSelectedVacancy={false}/>
                )
            })}
            {vacancies.length > 0 &&
                <Pagination className={classes.jobSearchPagination}
                            value={activePage}
                            onChange={setPage}
                            onClick={pageOnClickHandler}
                            total={totalPages}/>}

            <ErrorComponent errorMessage={error}/>

        </Container>
    );
};

const useStyles = createStyles((theme) => ({
    jobSearchContainer: {
        flex: '1 1 65%',
        maxWidth: `773px`,
        backgroundColor: '#F7F7F8',
        margin: '40px 0px 0px 28px',
        padding: '0px',
        position: 'relative',

        [`@media (max-width: ${rem(1160)})`]: {
            flex: '1 1 48%',
        },

    },

    inputJobName: {
        width: `100%`,
        background: '#FFFFFF',
        border: '1px solid #EAEBED',
        borderRadius: '8px',

        input: {
            width: `100%`,
            paddingLeft: '36px !important',

            '&:placeholder': {
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
            },
        },

        button: {
            position: "absolute",
            right: '8px',
            padding: '5px 20px',
            cursor: 'pointer',

            '&:hover': {
                backgroundColor: '#92C1FF',
            },

            '&:active': {
                backgroundColor: '#3B7CD3',
            },
        },

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

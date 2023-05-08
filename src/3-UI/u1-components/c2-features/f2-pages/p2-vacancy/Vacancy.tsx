import React, {useEffect} from 'react';
import {Container, createStyles, TypographyStylesProvider} from "@mantine/core";
import {VacancyItem} from "../p1-jobSearch/j1-jobSearchFiltersAndOffers/j1-vacancyItem/VacancyItem";
import {useParams} from "react-router-dom";
import {setVacancyDataTC} from "../../../../../2-BLL/vacanciesReducer";
import {useAppDispatch, useAppSelector} from "../../../../../2-BLL/store";
import {LoaderComponent} from "../../../c3-commonComponents/loader/Loader";
import {ErrorComponent} from "../../../c3-commonComponents/error/ErrorComponent";

export const Vacancy = () => {

    const dispatch = useAppDispatch()
    const itemData = useAppSelector(state => state.vacancies.vacancyData)
    const isLoading = useAppSelector(state => state.vacancies.isLoading)
    const error = useAppSelector(state => state.vacancies.error)

    const {classes, cx} = useStyles();


    const params = useParams<{ id: string }>()

    useEffect(() => {
        dispatch(setVacancyDataTC(+params.id!))
    }, [params.id])

    return (
        <Container className={classes.vacancyContainer}>
            {isLoading && <LoaderComponent/>}

            <VacancyItem id={itemData.id} professionName={itemData.profession} salary={itemData.payment_from}
                         curruency={itemData.currency} type={itemData.type_of_work.title} place={itemData.town.title}
                         marked={true}
                         showSelectedVacancy={true}/>
            <TypographyStylesProvider className={classes.vacancyInfo}>
                <div dangerouslySetInnerHTML={{ __html: itemData.vacancyRichText }} />
            </TypographyStylesProvider>

            <ErrorComponent errorMessage={error}/>
        </Container>
    );
};

const useStyles = createStyles((theme) => ({
    vacancyContainer: {
        maxWidth: `773px`,
        backgroundColor: '#F7F7F8',
        margin: '0px auto',
        padding: '20px 0px 0px 0px',
        height: '100%',
        position: 'relative',
    },

    vacancyInfo : {
        backgroundColor: 'white',
        textAlign: 'left',
        marginTop: '20px',
        maxWidth: `773px`,
        padding: '20px',
        borderRadius: '20px',

        p: {
            margin: '1px',
        }
    }
}))
import React, {useEffect} from 'react';
import {Container, TypographyStylesProvider} from "@mantine/core";
import {VacancyItem} from "../../../c2-commonComponents/openVacancy/vacancyItem/VacancyItem";
import {useParams} from "react-router-dom";
import {setErrorVacancyAC, setVacancyDataTC} from "2-BLL/vacancyReducer/vacanciesReducer";
import {useAppDispatch, useAppSelector} from "2-BLL/store";
import {LoaderComponent} from "../../../c2-commonComponents/loader/Loader";
import {ErrorComponent} from "../../../c2-commonComponents/error/ErrorComponent";
import {useStyles} from "./styleVacancy";
import {
    errorVacancies,
    isLoadingVacancies,
    vacancyDataVacancies
} from "2-BLL/vacancyReducer/vacancySelectors";

export const Vacancy = () => {

    // dispatch и selectors

    const dispatch = useAppDispatch()

    const itemData = useAppSelector(vacancyDataVacancies)
    const isLoading = useAppSelector(isLoadingVacancies)
    const error = useAppSelector(errorVacancies)

    const params = useParams<{ id: string }>()

    // add style

    const {classes, cx} = useStyles();

    useEffect(() => {
        dispatch(setVacancyDataTC(+params.id!))
    }, [params.id])


    if(isLoading) {return <LoaderComponent/>}

    return (
        <Container className={classes.vacancyContainer}>
            <VacancyItem id={itemData.id} professionName={itemData.profession} salary={itemData.payment_from}
                         curruency={itemData.currency} type={itemData.type_of_work.title} place={itemData.town.title}
                         marked={itemData.marked}
                         showSelectedVacancy={true}/>
            <TypographyStylesProvider className={classes.vacancyInfo}>
                <div dangerouslySetInnerHTML={{ __html: itemData.vacancyRichText }} />
            </TypographyStylesProvider>

            <ErrorComponent errorMessage={error} setError={setErrorVacancyAC}/>
        </Container>
    );
};


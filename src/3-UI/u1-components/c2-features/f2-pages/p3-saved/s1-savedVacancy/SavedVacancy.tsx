import {Container, createStyles, Pagination, rem} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {VacancyItem} from "../../p1-jobSearch/j1-jobSearchFiltersAndOffers/j1-vacancyItem/VacancyItem";
import {NoSavedVacancies} from "../s2-noSavedVacancies/NoSavedVacancies";
import {PATH} from "../../../../c3-commonComponents/routes/Routes";
import {useAppSelector} from "../../../../../../2-BLL/store";
import {useNavigate} from "react-router-dom";

export const SavedVacancy = () => {

    const {classes, cx} = useStyles();
    const [activePage, setPage] = useState<number>(1);

    const navigate = useNavigate()
    const isAuthorised = useAppSelector((state) => state.auth.isAuthorised)

    const selectedVacancies =   [
        {id: 1, name: 'Менеджер-дизайнер', salary: '100000', type: 'full-time', place: 'Новый Уренгой', marked: true},
        {id: 2, name: 'Менеджер', salary: '10000', type: 'part-time', place: 'Minsk', marked: false},
        {id: 3, name: 'Менеджер', salary: '10000', type: 'part-time', place: 'Minsk', marked: false}]


    useEffect(()=> {
        if (!isAuthorised) {
            navigate(PATH.LOGIN)
        }
    }, [])

    if (selectedVacancies.length === 0) {
        return <NoSavedVacancies/>
    }

    return (
        <Container className={classes.selectedVacancyContainer}>
            {selectedVacancies.map(v=> {
                return (
                    <VacancyItem key={v.id} id={v.id} professionName={v.name} curruency={'rub'} salary={1000} type={v.type} place={v.place} showSelectedVacancy={false} marked={true}/>
                )
            })}
            <Pagination className={classes.jobSearchPagination} value={activePage} onChange={setPage} total={3}/>
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
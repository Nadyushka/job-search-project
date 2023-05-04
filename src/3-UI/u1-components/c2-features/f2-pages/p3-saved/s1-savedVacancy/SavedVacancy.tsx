import {Container, createStyles, Pagination, rem} from '@mantine/core';
import React, {useState} from 'react';
import {VacancyItem} from "../../p1-jobSearch/j1-jobSearchFiltersAndOffers/j1-vacancyItem/VacancyItem";
import {NoSavedVacancies} from "../s2-noSavedVacancies/NoSavedVacancies";


type VacancyType = {
    id: number
    name: string
    salary: string
    type: string
    place: string
    marked: boolean
}

type PropsType = {
    selectedVacancies: VacancyType[]
}

export const SavedVacancy = () => {

    const {classes, cx} = useStyles();
    const [activePage, setPage] = useState<number>(1);

    const selectedVacancies =   [
        {id: 1, name: 'Менеджер-дизайнер', salary: '100000', type: 'full-time', place: 'Новый Уренгой', marked: true},
        {id: 2, name: 'Менеджер', salary: '10000', type: 'part-time', place: 'Minsk', marked: false},
        {id: 3, name: 'Менеджер', salary: '10000', type: 'part-time', place: 'Minsk', marked: false}]

    if (selectedVacancies.length === 0) {
        return <NoSavedVacancies/>
    }

    return (
        <Container className={classes.selectedVacancyContainer}>
            {selectedVacancies.map(v=> {
                return (
                    <VacancyItem key={v.id} id={v.id} name={v.name} salary={v.salary} type={v.type} place={v.place} showSelectedVacancy={false} marked={true}/>
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
import {Box, Button, Container, createStyles, Pagination, rem, TextInput} from '@mantine/core';
import React, {useState} from 'react';
import {Search} from 'tabler-icons-react';
import {VacancyItem} from "./j1-vacancyItem/VacancyItem";

export const JobSearch = () => {

    const {classes, cx} = useStyles();
    const [activePage, setPage] = useState<number>(1);

    const tempJob = [
        {id: 1, name: 'Менеджер-дизайнер', salary: '100000', type: 'full-time', place: 'Новый Уренгой', marked: true},
        {id: 2, name: 'Менеджер', salary: '10000', type: 'part-time', place: 'Minsk', marked: false},
        {id: 3, name: 'Менеджер', salary: '10000', type: 'part-time', place: 'Minsk', marked: false}]

    return (
        <Container className={classes.jobSearchContainer}>

            <TextInput className={classes.inputJobName}
                       size={'lg'}
                       placeholder="Введите название вакансии"
                       icon={<Search size="1rem"/>}
                       rightSection={<Button size="sm">Поиск</Button>}/>
            {tempJob.map((j) => {
                return (
                    <VacancyItem key={j.id} id={j.id} name={j.name} salary={j.salary} type={j.type} place={j.place}
                                 marked={j.marked}/>
                )
            })}
            <Pagination className={classes.jobSearchPagination} value={activePage} onChange={setPage} total={10}/>
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
    }
}))

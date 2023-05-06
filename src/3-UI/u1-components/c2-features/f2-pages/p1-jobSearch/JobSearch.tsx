import React, {useEffect} from 'react';
import {Filters} from "./j1-jobSearchFiltersAndOffers/Filters";
import {Container, createStyles, rem, Title} from "@mantine/core";
import {JobOffers} from './j1-jobSearchFiltersAndOffers/JobOffers';
import {useAppDispatch, useAppSelector} from "../../../../../2-BLL/store";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../c3-commonComponents/routes/Routes";


export const JobSearch = () => {

    const {classes, cx} = useStyles();



    const isAuthorised = useAppSelector((state) => state.auth.isAuthorised)

    const navigate = useNavigate()

    useEffect(()=> {
        if (!isAuthorised) {
            navigate(PATH.LOGIN)
        }

    }, [])



    return (
        <Container className={classes.jobSearchContainer}>
            <Title order={1} className={classes.mainTitle}>Job search</Title>
            <Filters/>
            <JobOffers/>
        </Container>
    );
};


const useStyles = createStyles((theme) => ({

    jobSearchContainer: {
        maxWidth: `${rem(1116)}`,
        margin: '0px auto',
        border: 'none',
        display: "flex",
        justifyContent: "space-between",
        flexWrap: 'wrap',
    },

    mainTitle: {
        display: 'none',
    }
}))


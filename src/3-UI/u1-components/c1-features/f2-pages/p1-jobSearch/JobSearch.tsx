import React, {useEffect} from 'react';
import {Filters} from "./j1-jobSearchFiltersAndOffers/v1-filters/Filters";
import {Box, Container, Title} from "@mantine/core";
import {JobOffers} from './j1-jobSearchFiltersAndOffers/v2-jobOffers/JobOffers';
import {useAppSelector} from "2-BLL/store";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../c2-commonComponents/routes/Routes";
import {useStyles} from "./styleJobSearch";
import {isAuthorisedAuth} from "2-BLL/authReucer/selectorsAuth";


export const JobSearch = () => {

    const navigate = useNavigate()

    const isAuthorised = useAppSelector(isAuthorisedAuth)

    const {classes, cx} = useStyles();

    useEffect(() => {
        if (!isAuthorised) {
            navigate(PATH.LOGIN)
        }
    }, [isAuthorised])

    return (
        <Container className={classes.jobSearchContainer}>
            <Title order={1} className={classes.mainTitle}>Job search</Title>
            <Filters/>
            <Box className={classes.jobOffers}>
                <JobOffers/>
            </Box>
        </Container>
    );
};



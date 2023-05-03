import React from 'react';
import {Filters} from "./j1-jobSearchFiltersAndOffers/Filters";
import { Container, createStyles, rem, Title} from "@mantine/core";
import {JobOffers} from './j1-jobSearchFiltersAndOffers/JobOffers';

export const JobSearch = () => {

    const {classes, cx} = useStyles();

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


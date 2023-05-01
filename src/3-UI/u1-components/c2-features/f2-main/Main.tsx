import React from 'react';
import {Filters} from "./m1-filters/Filters";
import {PageBody} from "./m2-pages/PageBody";
import {Box, Container, createStyles, rem, Title} from "@mantine/core";

export const Main = () => {

    const {classes, cx} = useStyles();

    return (
        <Container className={classes.mainContainer}>
            <Box className={classes.mainWrapper}>
                <Title order={1} className={classes.mainTitle}>Job search</Title>
                <Filters/>
                <PageBody/>
            </Box>
        </Container>
    );
};


const useStyles = createStyles((theme) => ({
    mainContainer: {
        maxWidth: `${rem(1440)}`,
        margin: '0px auto',
        borderRadius: `${rem(0)} ${rem(0)} ${theme.radius.sm} ${theme.radius.sm}`,
        border: 'none',
        backgroundColor: '#F7F7F8',
    },

    mainWrapper: {
        maxWidth: `${rem(1116)}`,
        margin: '0px auto',
        border: 'none',
        display: "flex",
        justifyContent: "space-between",
    },

    mainTitle:{
        display:'none',
    }
}))


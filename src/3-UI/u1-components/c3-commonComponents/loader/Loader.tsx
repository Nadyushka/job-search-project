import React from 'react';
import {
    Container,
    createStyles,
    Loader, rem,
} from "@mantine/core";

export const LoaderComponent = () => {

    const {classes, cx} = useStyles();

    return (
        <Container className={classes.loaderContainer}>
            <Loader variant="dots"/>
        </Container>
    );
};

const useStyles = createStyles((theme) => ({

    loaderContainer: {
        position: "absolute",
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: 'RGB(224, 224, 224, 0.5)',
        borderRadius: '5px',
    },


}))
import {Container, createStyles, rem} from '@mantine/core';
import React, {useCallback, useEffect, useState} from 'react';

type PropsType = {
    error: string
}

export const ErrorComponent = ({error}: PropsType) => {

    const {classes, cx} = useStyles();
    const [errorText, setErrorTex] = useState<string>(error)

    const closeError = useCallback(() => {
        setErrorTex('')
    }, [errorText])

    useEffect(() => {
        setTimeout(() => {
            closeError()
        }, 6000)
    }, [closeError, errorText])

    if (errorText.length === 0) return null

    return (
        <Container
            className={classes.errorContainer}
        >
            {error}
        </Container>
    );
};

const useStyles = createStyles((theme) => ({
    errorContainer: {
        borderRadius: `10px`,
        border: '1px solid red',
        backgroundColor: 'white',
        position: 'fixed',
        bottom: '20px',
        left: '50px',
        padding: '10px 20px',
        color: 'red',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center'
    },

    // errorVisible: {
    //     bottom: '50px',
    //     transition: '0.5s all',
    // }
}))

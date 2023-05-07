import {Container, createStyles, keyframes, rem} from '@mantine/core';
import React, {useCallback, useEffect, useState} from 'react';
import {errorHandler} from "../../../u2-assets/utilits/error";

type PropsType = {
    errorMessage: string
}

export const ErrorComponent = ({errorMessage}: PropsType) => {

    const {classes, cx} = useStyles();
    const [visible, setVisible] = useState<boolean>(true)

    const closeError = useCallback(() => {
        setVisible(false)
    }, [])

    useEffect(() => {
        setVisible(true)
        setTimeout(() => {
            closeError()
        }, 6000)
    }, [closeError, errorMessage])

    if (!visible) return null

    return (
        <Container className={errorMessage.length !== 0 ? classes.errorContainer : ''}>
            {errorMessage}
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
        justifyContent: 'center',
        alignItems: 'center',
        animation: `${bounce}`,
        animationDuration: '6s',
    },
}))

const bounce = keyframes({
        'from, 20%, 53%, 80%, to': {transform: 'translate3d(0, 0, 0)'},
        '0%': {
            transform: 'translateY(80px)',
            opacity: 0,
        },
        '10%': {
            transform: 'translateY(0)',
            opacity: 1,
        },
        '90%': {
            transform: 'translateY(0)',
            opacity: 1,
        },
        '100%': {
            transform: 'translateY(80px)',
            opacity: 0.3,
        }
    })
;

import React from 'react';
import {Button, Container, createStyles, Image, rem, Text} from "@mantine/core";
import noVacanciesFoundImg from '3-UI/u2-assets/noVacanciesFoundIcon.svg'

export const NoSavedVacancies = () => {

    const {classes, cx} = useStyles();

    return (
        <Container className={classes.noSelectedVacancyContainer}>
            <Image className={classes.noSelectedVacancyImg} src={noVacanciesFoundImg} width={'240px'}
                   height={'230.27px'}/>
            <Text className={classes.noSelectedVacancyText}>Упс, здесь еще ничего нет!</Text>
            <Button sx={{fontFamily: 'Open Sans, sans-serif',}}
                    className={classes.noSelectedVacancyButton}>Поиск
                Вакансий</Button>
        </Container>
    );
};


const useStyles = createStyles((theme) => ({
    noSelectedVacancyContainer: {
        maxWidth: `773px`,
        backgroundColor: '#F7F7F8',
        margin: '0px auto',
        padding: '20px 0px 0px 0px',
        height: '100vh',
    },

    noSelectedVacancyImg: {
        margin: '120px auto 0px',
    },

    noSelectedVacancyText: {
        margin: '32px auto 0px',
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '24px',
    },
    noSelectedVacancyButton: {
        margin: '32px auto 0px',
        fontFamily: 'Open Sans, sans-serif',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',

        '&:hover': {
            backgroundColor: '#92C1FF',
        },

        '&:active': {
            backgroundColor: '#3B7CD3',
        },

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
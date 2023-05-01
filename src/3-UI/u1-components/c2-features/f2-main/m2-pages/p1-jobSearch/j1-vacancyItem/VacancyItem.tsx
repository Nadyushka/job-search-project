import React from 'react';
import {Box, Container, createStyles, rem, Text, Title} from "@mantine/core";
import selectedStar from '3-UI/u2-assets/selectedStar.svg'
import notSelectedStar from '3-UI/u2-assets/notSelectedStar.svg'
import locationIcon from '3-UI/u2-assets/locationIcon.svg'

type PropsType = {
    id: number
    name: string
    salary: string
    type: string
    place: string
    marked: boolean
}

export const VacancyItem = ({id, name, salary, type, place, marked}: PropsType) => {

    const {classes, cx} = useStyles();

    return (
        <Container className={classes.vacancyItemContainer}>
            <Box className={classes.vacancyItemInfo}>
                <Title className={classes.vacancyItemContainerTitle} order={3}>{name}</Title>
                {marked ? <img className={classes.vacancyItemSelectImg} src={selectedStar}/> :
                    <img className={classes.vacancyItemSelectImg} src={notSelectedStar}/>}
            </Box>
            <Text className={classes.vacancyItemDescription} span>
                з/п от {salary} rub
                <div/>
                <Text span>{type}</Text>
            </Text>
            <Box className={classes.vacancyItemInfoPlace}>
                <img src={locationIcon}/>
                <Text>{place}</Text>
            </Box>
        </Container>
    );
};

const useStyles = createStyles((theme) => ({
    vacancyItemContainer: {
        width: `773px`,
        backgroundColor: '#FFFFFF',
        margin: '16px 0px 0px 0px',
        padding: '24px 0px',
        border: '1px solid #EAEBED',
        borderRadius: `${rem(12)}`,
        textAlign: 'left',
    },

    vacancyItemInfo: {
        marginLeft: '24px',
        display: 'flex',
        justifyContent: 'space-between',
    },

    vacancyItemContainerTitle: {
        margin: '0px',
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '20px',
        color: '#5E96FC',
    },

    vacancyItemSelectImg: {
        marginRight: '24px',
    },

    vacancyItemDescription: {
        textAlign: 'left',
        margin: '12px 0px 0px 0px',
        display: 'inline-block',
        marginLeft: '25px',
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '16px',
        color: '#232134',

        div: {
            borderRadius: '6px',
            width: '6px',
            height: '6px',
            display: 'inline-block',
            backgroundColor: '#7B7C88',
            margin: '0px 14px',
        },

        span: {
            fontWeight: 400,
        }
    },

    vacancyItemInfoPlace: {
        marginTop: '13px',
        marginLeft: '24px',
        display: 'flex',


        div: {
            display: 'inline-block',
            marginLeft: '11px',
        }

    }


}))


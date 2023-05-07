import React from 'react';
import {MouseEvent, useState} from 'react';
import {Box, Container, createStyles, rem, Text, Title} from "@mantine/core";
import selectedStar from '3-UI/u2-assets/pictures/selectedStar.svg'
import notSelectedStar from '3-UI/u2-assets/pictures/notSelectedStar.svg'
import locationIcon from '3-UI/u2-assets/pictures/locationIcon.svg'
import {useNavigate} from "react-router-dom";

type PropsType = {
    id: number
    professionName: string
    salary: number | ""
    type: string
    place: string
    marked: boolean,
    showSelectedVacancy: boolean
    curruency: string
}

export const VacancyItem = ({
                                id,
                                professionName,
                                salary,
                                curruency,
                                type,
                                place,
                                marked,
                                showSelectedVacancy
                            }: PropsType) => {

    const {classes, cx} = useStyles();
    const navigate = useNavigate()

    const [mark, setMark] = useState<boolean>(marked)
    const vacancyIdDataAttribute = {'data-elem': `vacancy-${id}`}
    const vacancyIdButtonDataAttribute = {'data-elem': `vacancy-${id}-shortlist-button`}

    const onClickVacancyHandler = () => !showSelectedVacancy && navigate(`/selectedVacancy/${id}`);

    const toggleSelectVacancies = (e: MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        setMark(!mark)
    }


    return (
        <Container className={classes.vacancyItemContainer} onClick={onClickVacancyHandler} {...vacancyIdDataAttribute}>
            <Box className={classes.vacancyItemInfo}>
                <Title className={classes.vacancyItemContainerTitle} order={3}>{professionName}</Title>
                <img className={classes.vacancyItemSelectImg}
                     src={mark ? selectedStar : notSelectedStar}
                     onClick={toggleSelectVacancies}
                    data-elem = {`vacancy-${id}-shortlist-button`}
                />
            </Box>
            <Text className={classes.vacancyItemDescription} span>
                {salary !== 0 ? `з/п от ${salary} ${curruency}` : 'з/п не указана'}
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
        maxWidth: `773px`,
        backgroundColor: '#FFFFFF',
        margin: '16px 0px 0px 0px',
        padding: '24px 0px',
        border: '1px solid #EAEBED',
        borderRadius: `${rem(12)}`,
        textAlign: 'left',
        cursor: 'pointer',

        a: {
            textDecoration: 'none',
            color: '#232134',

            '&:hover div': {
                textDecoration: 'none',
                color: '#232134',
            },

            '&:active div': {
                textDecoration: 'none',
                color: '#232134',
            },
        },
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


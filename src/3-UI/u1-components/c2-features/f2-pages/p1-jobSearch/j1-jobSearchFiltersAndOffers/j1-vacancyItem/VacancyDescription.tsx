import {Box, Container, createStyles, List, Title} from '@mantine/core';
import React from 'react';


type PropsType = {
    responsibilities: string[]
    requirements: string[]
    conditions: string[]
}

export const VacancyDescription = ({responsibilities, requirements, conditions}: PropsType) => {

    const {classes, cx} = useStyles();

    return (
        <Container className={classes.vacancyContainer}>
            <Title order={4}>Обязанности:</Title>
            <List size="sm">
                {responsibilities.map((r,i) => {
                        return (
                            <List.Item key={i}>{r}</List.Item>
                        )
                    }
                )}
            </List>
            <Title order={4}>Требования:</Title>
            <List size="sm">
                {requirements.map((r, i) => {
                        return (
                            <List.Item key={i}>{r}</List.Item>
                        )
                    }
                )}
            </List>
            <Title order={4}>Условия:</Title>
            <List size="sm">
                {conditions.map((c,i) => {
                        return (
                            <List.Item key={i}>{c}</List.Item>
                        )
                    }
                )}
            </List>
        </Container>
    );
};

const useStyles = createStyles((theme) => ({

    vacancyContainer: {
        maxWidth: `773px`,
        backgroundColor: '#FFFFFF',
        padding: '4px 0px 24px',
        border: '1px solid #EAEBED',
        borderRadius: '12px',
        marginTop: '20px',
        textAlign: 'left',

        h4: {
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '20px',
            padding: '0px 24px 0px 24px',
            marginBottom: '16px',
            marginTop: '20px',
        },

        ul: {
            padding: '0px 24px 0px 24px',
            maxWidth: `725px`,

            li: {
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                width: `100%`,

                div: {
                    width: `100%`,
                    span: {
                        display: "inline-block",
                        maxWidth: `700px`,
                        wordWrap: 'break-word',
                    }
                }
            }
        },

    }
}))
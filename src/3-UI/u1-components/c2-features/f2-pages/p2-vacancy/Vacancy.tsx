import React, {useEffect} from 'react';
import {Container, createStyles, TypographyStylesProvider} from "@mantine/core";
import {VacancyItem} from "../p1-jobSearch/j1-jobSearchFiltersAndOffers/j1-vacancyItem/VacancyItem";
import {useParams} from "react-router-dom";
import {setVacancyDataTC} from "../../../../../2-BLL/vacanciesReducer";
import {useAppDispatch, useAppSelector} from "../../../../../2-BLL/store";

export const Vacancy = () => {

    const dispatch = useAppDispatch()
    const itemData = useAppSelector(state => state.vacancies.vacancyData)

    const {classes, cx} = useStyles();


    const params = useParams<{ id: string }>()

    useEffect(() => {
        dispatch(setVacancyDataTC(+params.id!))
    }, [params.id])

    return (
        <Container className={classes.vacancyContainer}>

            <VacancyItem id={itemData.id} professionName={itemData.profession} salary={itemData.payment_from}
                         curruency={itemData.currency} type={itemData.type_of_work.title} place={itemData.town.title}
                         marked={true}
                         showSelectedVacancy={true}/>
            <TypographyStylesProvider className={classes.vacancyInfo}>
                <div dangerouslySetInnerHTML={{ __html: itemData.vacancyRichText }} />
            </TypographyStylesProvider>
            {/*<VacancyDescription responsibilities={[*/}
            {/*    ' Разработка дизайн-макетов для наружной, интерьерной рекламы, полиграфии, сувенирной продукции.',*/}
            {/*    ' Подготовка и вёрстка макетов в CorelDraw, Adobe photoshop.',*/}
            {/*    'Создание дизайна логотипов и брендбуков',*/}
            {/*    ' Управленческая функция: обучение, адаптация дизайнеров, их контроль, оценка']}*/}
            {/*                    requirements={[*/}
            {/*                        'Собеседование – после успешного прохождения тестового задания',*/}
            {/*                        'Рассматриваются кандидаты только с опытом работы',*/}
            {/*                        'Обязательно - наличие портфолио',*/}
            {/*                        'Умение самостоятельно принимать решения, умение объективно оценивать свою работу, работать в режиме многозадачности и переключаться с одного задания к другому и планировать свой день. Соблюдать сроки.',*/}
            {/*                        'Ответственный, исполнительный, целеустремленный, большим плюсом будет опыт управления']}*/}
            {/*                    conditions={['Оформление по контракту',*/}
            {/*                        'Полный социальный пакет',*/}
            {/*                        'Премирование по результатам работы']}*/}
            {/*/>*/}
        </Container>
    );
};

const useStyles = createStyles((theme) => ({
    vacancyContainer: {
        maxWidth: `773px`,
        backgroundColor: '#F7F7F8',
        margin: '0px auto',
        padding: '20px 0px 0px 0px',
        height: '100%',
    },

    vacancyInfo : {
        backgroundColor: 'white',
        textAlign: 'left',
        marginTop: '20px',
        maxWidth: `773px`,
        padding: '20px',
        borderRadius: '20px',

        p: {
            margin: '1px',
        }
    }
}))
import React from 'react';
import {Container, createStyles} from "@mantine/core";
import {VacancyItem} from "../p1-jobSearch/j1-jobSearchFiltersAndOffers/j1-vacancyItem/VacancyItem";
import {VacancyDescription} from "../p1-jobSearch/j1-jobSearchFiltersAndOffers/j1-vacancyItem/VacancyDescription";
import {useParams} from "react-router-dom";

export const Vacancy = () => {

    const {classes, cx} = useStyles();

    const params = useParams<{ selectedVacancyId: string }>()

    return (
        <Container className={classes.vacancyContainer}>
            <VacancyItem id={1} name={'name'} salary={'salary'} type={'type'} place={'place'} marked={true} showSelectedVacancy={true}/>
            <VacancyDescription responsibilities={[
               ' Разработка дизайн-макетов для наружной, интерьерной рекламы, полиграфии, сувенирной продукции.',
               ' Подготовка и вёрстка макетов в CorelDraw, Adobe photoshop.',
                'Создание дизайна логотипов и брендбуков',
               ' Управленческая функция: обучение, адаптация дизайнеров, их контроль, оценка']}
            requirements={[
                'Собеседование – после успешного прохождения тестового задания',
                'Рассматриваются кандидаты только с опытом работы',
                'Обязательно - наличие портфолио',
                'Умение самостоятельно принимать решения, умение объективно оценивать свою работу, работать в режиме многозадачности и переключаться с одного задания к другому и планировать свой день. Соблюдать сроки.',
                'Ответственный, исполнительный, целеустремленный, большим плюсом будет опыт управления']}
                                conditions={['Оформление по контракту',
                                    'Полный социальный пакет',
                                    'Премирование по результатам работы']}
            />
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
    }
}))
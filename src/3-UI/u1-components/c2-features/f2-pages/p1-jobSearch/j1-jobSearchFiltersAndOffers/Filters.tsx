import React, {useState} from 'react';
import {
    Box,
    Button,
    Container,
    createStyles,
    getStylesRef,
    NumberInput,
    rem,
    Select,
    Title
} from "@mantine/core";
import {ChevronDown, ChevronUp} from 'tabler-icons-react';
import crossIcon from '3-UI/u2-assets/pictures/cross.svg'
import {setFiltersAC, setFiltredVacanciesDataTC, setVacanciesDataTC} from "2-BLL/vacanciesReducer";
import {useAppDispatch, useAppSelector} from "2-BLL/store";

export const Filters = () => {

    const dispatch = useAppDispatch()
    const catalogueDataText = useAppSelector(state => state.vacancies.catalogueData).map(c => c['title_rus'])
    const currentPage = useAppSelector(state => state.vacancies.currentPage)
    const count = useAppSelector(state => state.vacancies.pageCount)
    const paymentFrom = useAppSelector(state => state.vacancies.payment_from)
    const paymentTo = useAppSelector(state => state.vacancies.payment_to)
    const jobArea = useAppSelector(state => state.vacancies.jobArea)
    const keyWord = useAppSelector(state => state.vacancies.keyWord)

    const [jobAreaValue, setJobAreaValue] = useState<string>(jobArea);
    const [minSalaryValue, setMinSalaryValue] = useState<number | ''>(paymentFrom === '' ? '' : paymentFrom);
    const [maxSalaryValue, setMaxSalaryValue] = useState<number | ''>(paymentTo === '' ? '' : paymentFrom);

    const [vacancyAriaSelectOpen, setVacancyAriaSelectOpen] = useState<boolean>(false);

    const {classes, cx} = useStyles();

    const selectDataAttribute = {'data-elem': 'industry-select'}
    const minSalaryInputDataAttribute = {'data-elem': 'salary-from-input'}
    const maxSalaryInputDataAttribute = {'data-elem': 'salary-to-input'}
    const useFiltersDataAttribute = {'data-elem': 'search-button'}

    const onClickButtonHandler = () => {
        dispatch(setFiltredVacanciesDataTC(1, count, 1, keyWord, minSalaryValue, maxSalaryValue, jobAreaValue))
    }

    const onClockClearFiltersButton = () => {
        dispatch(setFiltersAC('', '', '', ''))
        dispatch(setVacanciesDataTC(1, count))
    }

    return (
        <Container className={classes.filtersContainer}>
            <Box className={classes.filterTitle}>
                <Title className={classes.filterTitleText} order={2}>Фильтры</Title>
                <Button className={classes.filterTitleButton}
                        onClick={onClockClearFiltersButton} {...useFiltersDataAttribute}>Сбросить данные
                    <div className={classes.filterTitleButtonCross}/>
                </Button>
            </Box>
            <Select
                className={classes.vacancyAriaSelect}
                onClick={() => setVacancyAriaSelectOpen(!vacancyAriaSelectOpen)}
                onBlur={() => setVacancyAriaSelectOpen(false)}
                size={'md'}
                label="Отрасль"
                placeholder="Выберете отрасль "
                searchable
                clearable
                onSearchChange={setJobAreaValue}
                searchValue={jobAreaValue}
                nothingFound="Проверьте выбранную отрасль"
                data={catalogueDataText}
                maxDropdownHeight={188}
                transitionProps={{transition: 'pop-top-left', duration: 80, timingFunction: 'ease'}}
                rightSection={!vacancyAriaSelectOpen ?
                    <ChevronDown style={{color: '#ACADB9'}} size={'1rem'}/> :
                    <ChevronUp style={{color: '#5E96FC'}} size={'1rem'}/>}
                rightSectionWidth={48}
                styles={(theme) => ({
                    rightSection: {pointerEvents: 'none'},
                    item: {
                        width: '97%',
                        fontSize: `${rem(14)}`,
                        fontFamily: 'Inter, sans-serif',
                        fontStyle: 'normal',

                        '&[data-hovered]': {
                            backgroundColor: '#DEECFF;',
                            color: '#232134',
                        },
                        '&[data-selected]': {
                            '&, &:hover': {
                                backgroundColor: '#5E96FC;',
                                color: 'white'
                            },
                        },
                    },
                })}
                {...selectDataAttribute}
            />
            <Box>
                <NumberInput
                    placeholder="От"
                    label="Оклад"
                    styles={{control: {border: 'none'}}}
                    className={classes.salaryInput}
                    min={0}
                    value={minSalaryValue}
                    onChange={setMinSalaryValue}
                    step={1000}
                    {...minSalaryInputDataAttribute}
                />
                <NumberInput
                    placeholder="До"
                    styles={{control: {border: 'none'}}}
                    className={`${classes.salaryInput}  ${classes.salaryInputMax}`}
                    min={0}
                    value={maxSalaryValue}
                    onChange={setMaxSalaryValue}
                    step={1000}
                    {...maxSalaryInputDataAttribute}
                />
            </Box>
            <Button onClick={onClickButtonHandler} className={classes.filterButton}>Применить</Button>
        </Container>
    );
};

const useStyles = createStyles((theme) => ({
    filtersContainer: {
        width: `${rem(315)}`,
        borderRadius: `${rem(12)} ${rem(12)} ${rem(12)} ${rem(12)}`,
        padding: `${rem(20)}`,
        backgroundColor: 'white',
        margin: '40px 0px 0px 0px',
        border: '1px solid #EAEBED',
        height: '100%',

        [`@media (max-width: ${rem(800)})`]: {
            flex: '1 1 100%',
        },

    },

    filterTitle: {
        width: `${rem(275)}`,
        margin: '0px auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',

        [`@media (max-width: ${rem(800)})`]: {
            flex: '1 1 100%',
        },
    },

    filterTitleText: {
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: `${rem(20)}`,
        lineHeight: `${rem(20)}`
    },

    filterTitleButton: {
        padding: '0px',
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: `${rem(14)}`,
        backgroundColor: 'white',
        color: '#ACADB9',
        border: 'none',
        height: `${rem(20)}`,

        '&:hover': {
            color: '#92C1FF',
            backgroundColor: 'white',

            [`.${getStylesRef('filterTitleButtonCross')}`]: {
                backgroundColor: '#92C1FF',
            },
        },

        '&:active': {
            color: '#5E96FC',
            backgroundColor: 'white',

            [`.${getStylesRef('filterTitleButtonCross')}`]: {
                backgroundColor: '#5E96FC',
            },
        },

    },

    filterTitleButtonCross: {
        ref: getStylesRef('filterTitleButtonCross'),
        width: '16px',
        height: '16px',
        backgroundColor: '#ACADB9',
        mask: `url(${crossIcon}) no-repeat center`,
    },

    vacancyAriaSelect: {
        textAlign: 'left',
        cursor: 'pointer',
        rightSection: {pointerEvents: 'none'},
        label: {
            margin: '32px 0px 8px 0px',
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: `${rem(16)}`,
            lineHeight: `${rem(19)}`,
            color: '#232134',
            padding: '0px',
        },
        input: {
            padding: '11px',
            cursor: 'pointer',
            '&:focus-within': {
                borderColor: '#5E96FC',
            },
            '&:placeholder': {
                color: '#5E96FC',
            },
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: `${rem(14)}`,
        },
    },

    salaryInput: {
        marginTop: '20px',
        textAlign: 'left',
        label: {
            padding: '0px',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: `${rem(16)}`,
            lineHeight: `${rem(19)}`,
            color: '#232134',
        },
        svg: {
            color: '#ACADB9',
        }
    },

    salaryInputMax: {
        marginTop: '8px',
    },

    filterButton: {
        width: '100%',
        marginTop: '20px',
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: `${rem(14)}`,
        backgroundColor: '#5E96FC',

        '&:hover': {
            backgroundColor: '#92C1FF',
        },

        '&:active': {
            backgroundColor: '#3B7CD3',
        },
    }


}))
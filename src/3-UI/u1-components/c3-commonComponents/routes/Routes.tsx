import {Route, Routes} from "react-router-dom";
import {JobSearch} from "../../c2-features/f2-pages/p1-jobSearch/JobSearch";
import {Vacancy} from "../../c2-features/f2-pages/p2-vacancy/Vacancy";
import {SavedVacancy} from "../../c2-features/f2-pages/p3-saved/s1-savedVacancy/SavedVacancy";
import {createStyles, rem, Container} from "@mantine/core";
import {Login} from "../../c2-features/f2-pages/p0-login/Login";

export const PATH = {
    VACANCY_SEARCH: '/vacancySearch',
    ACTIVE_VACANCY: '/selectedVacancy/:id',
    SELECTED_VACANCIES: '/selectedVacancies',
    LOGIN: '/login',
}

export const RoutesComponent = () => {

    const {classes, cx} = useStyles();

    return (
        <Container className={classes.bodyContainer}>
            <Routes>
                {/*add your routes here*/}
                <Route path={'/'} element={<JobSearch/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.VACANCY_SEARCH} element={<JobSearch/>}/>
                <Route path={PATH.ACTIVE_VACANCY} element={<Vacancy/>}/>
                <Route path={PATH.SELECTED_VACANCIES} element={<SavedVacancy/>}/>
            </Routes>
        </Container>
    )
}

const useStyles = createStyles((theme) => ({
    bodyContainer: {
        maxWidth: `100%`,
        margin: '0px auto',
        borderRadius: `${rem(0)} ${rem(0)} ${theme.radius.sm} ${theme.radius.sm}`,
        border: 'none',
        backgroundColor: '#F7F7F8',
        paddingBottom: '51px',
        height: '100%',
        minHeight: '78vh',
    },
}))
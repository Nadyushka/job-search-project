import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import {Header, Container, Burger, Group, Box, Transition, Paper} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import appIcon from '3-UI/u2-assets/pictures/appIcon.svg'
import {PATH} from '3-UI/u1-components/c2-commonComponents/routes/Routes';
import {useStyles} from './styleHeader';

export function HeaderSimple({links}: HeaderSimplePropsTypes) {

    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [opened, {toggle}] = useDisclosure(false);

    const [active, setActive] = useState(links[0].link);

    const {classes, cx} = useStyles();

    useEffect(() => {
        pathname === PATH.VACANCY_SEARCH && setActive(links[0].link)
        pathname === PATH.SELECTED_VACANCIES && setActive(links[1].link)
        pathname === PATH.NO_SELECTED_VACANCIES && setActive(links[1].link)
    }, [pathname])

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, {[classes.linkActive]: active === link.link})}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
                navigate(link.link === 'vacancySearch' ? PATH.VACANCY_SEARCH : PATH.SELECTED_VACANCIES)
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <Header height={84} mb={120} className={classes.header}>
            <Container className={classes.header_wrapper}>
                <Box className={classes.headerContainer}>
                    <img src={appIcon} alt={'App logo'}/>
                    <Group spacing={60} className={classes.links}>
                        {items}
                    </Group>
                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>

                    <Transition transition="pop-top-right" duration={200} mounted={opened}>
                        {(styles) => (
                            <Paper className={classes.dropdown} withBorder style={styles}>
                                {items}
                            </Paper>
                        )}
                    </Transition>
                </Box>
            </Container>
        </Header>
    );
}

type HeaderSimplePropsTypes = {
    links: { link: string; label: string }[];
}
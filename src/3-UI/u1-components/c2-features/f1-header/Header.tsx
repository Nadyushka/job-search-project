import {useEffect, useState} from 'react';
import {createStyles, Header, Container, Burger, Group, rem, Box} from '@mantine/core';
import appIcon from '3-UI/u2-assets/pictures/appIcon.svg'
import {useDisclosure} from '@mantine/hooks';
import {useLocation, useNavigate} from 'react-router-dom'
import { PATH } from '3-UI/u1-components/c3-commonComponents/routes/Routes';

interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

export function HeaderSimple({links}: HeaderSimpleProps) {

    const navigate = useNavigate()

    const [opened, {toggle}] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const {classes, cx} = useStyles();

    const {pathname} = useLocation()

   useEffect(()=>{
       pathname === PATH.VACANCY_SEARCH && setActive(links[0].link)
       pathname === PATH.SELECTED_VACANCIES && setActive(links[1].link)
       pathname === PATH.NO_SELECTED_VACANCIES && setActive(links[1].link)
   },[pathname])

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
                </Box>
            </Container>
        </Header>
    );
}


const useStyles = createStyles((theme) => ({
    header: {
        maxWidth: `${rem(1440)}`,
        margin: '0px auto !important',
        borderRadius: `${theme.radius.sm} ${theme.radius.sm} ${rem(0)} ${rem(0)}`,
        border: 'none',
    },

    header_wrapper: {
        height: '100%',
        maxWidth: `${rem(1116)}`,
    },

    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: `${rem(696)}`,
        height: '100%',
        margin: '0px',
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
        fontStyle: 'normal',
        fontSize: `16px`,
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 400,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'none',
        fontFamily: 'Inter, sans-serif'
    },

    linkActive: {
        '&, &:hover': {
            fontWeight: 500,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
        },
    },
}));
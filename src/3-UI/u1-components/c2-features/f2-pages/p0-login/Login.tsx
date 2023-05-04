import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    createStyles,
    Group,
    Input,
    Loader,
    PasswordInput,
    rem,
    TextInput,
    Title
} from "@mantine/core";
import {useForm} from '@mantine/form';
import {useAppDispatch, useAppSelector} from "../../../../../2-BLL/store";
import {authorisedWithPasswordTC} from "../../../../../2-BLL/authReducer";
import {PATH} from "../../../c3-commonComponents/routes/Routes";
import {useNavigate} from "react-router-dom";

export const Login = () => {

    const {classes, cx} = useStyles();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isAuthorised = useAppSelector((state) => state.auth.isAuthorised)
    const isLoading = useAppSelector((state) => state.auth.isLoading)

    const form = useForm({
        initialValues: {
            email: 'sergei.stralenia@gmail.com',
            password: 'paralect123',
        },
        validate: {
            email: (value: string) => (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length === 0 ? 'Password is required' : value.length < 5 ? 'Password is too short' : null),
        },
        transformValues: (values) => ({
            email: values.email,
            password: values.password,
        }),

    });

    useEffect(() => {
        if (isAuthorised) {
            navigate(PATH.VACANCY_SEARCH)
        }
    }, [isAuthorised])


    return (
        <Container className={classes.loginContainer}>
            {isLoading && <Loader variant="dots"/>}
            <Box className={classes.loginBox}>
                <Title order={2}>Login</Title>
                <form
                    onSubmit={form.onSubmit((values) => dispatch(authorisedWithPasswordTC(values.email, values.password, 2356, 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948')))}>
                    <TextInput
                        label="Email"
                        placeholder="Your email"
                        withAsterisk
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        placeholder="Your password"
                        label="Password"
                        withAsterisk
                        {...form.getInputProps('password')}
                    />
                    <Group position="center" mt="md">
                        <Button disabled={isLoading} type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </Container>
    );
};

const useStyles = createStyles((theme) => ({
    loginContainer: {
        maxWidth: `${rem(400)}`,
        margin: '20px auto !important',
        padding: '24px',
        border: 'none',
    },

    loginBox: {
        backgroundColor: 'white',
        marginTop: '40px',
        padding: '20px 30px',

        h2: {
            marginTop: '10px',
            marginBottom: '20px',
        },

        form: {
            textAlign: 'left',
            marginTop: '10px',

            div: {
                label: {
                    marginBottom: '5px',
                    marginTop: '10px',
                }
            }

        },

        button: {
            '&:hover': {
                backgroundColor: '#92C1FF',
            },

            '&:active': {
                backgroundColor: '#3B7CD3',
            },

        }


    }
}))
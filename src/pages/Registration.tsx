import { FC } from "react";
import { Button, TextInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { Container } from '@mantine/core';

type RegistrationProps = {};

const Registration: FC<RegistrationProps> = () => {
    const containerProps = {
        bg: 'var(--mantine-color-blue-light)',
        h: 50,
        mt: 'md',
        p: 'lg',
        radius: 'md',
    };

    const nameField = useField({
        initialValue: "",
        validate: (value) =>
            value.trim().length < 2 ? "Value is too short" : null,
    });

    const emailField = useField({
        initialValue: "",
    })

    return (
        <>
            <div>Registration</div>
            <Container {...containerProps}>
                <TextInput {...nameField} placeholder="Your name" style={{ padding: '10px' }} />
                <TextInput {...emailField} placeholder="Your email" />
                <Button {...emailField}>Submit</Button>
            </Container>

        </>
    );
};

export default Registration;

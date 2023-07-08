import { ErrorMessage, Form, Formik } from "formik";
import { useStore } from "../../app/stores/store";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import { observer } from "mobx-react-lite";
import ValidationError from "../Errors/ValidationError";


export default observer(function RegisterForm() {
    const { userStore } = useStore();

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        displayName: Yup.string().required(),
        username: Yup.string().required(),
    })

    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch((error) =>
                setErrors({ error: error })
            )}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form error" onSubmit={handleSubmit}>
                    <Header as='h2' content='Register to reactivities' color="teal" textAlign="center" />
                    <MyTextInput name="username" placeholder="username" />
                    <MyTextInput name="displayName" placeholder="display name" />
                    <MyTextInput name="email" placeholder="email" />
                    <MyTextInput name="password" placeholder="password" type='password' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationError errors={errors.error}/>
                        }
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting}
                        type="submit"
                        content='Register'
                        positive fluid />
                </Form>
            )}
        </Formik>
    )
})
import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';

export default observer(function LoginForm() {
    const { userStore } = useStore();

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(() =>
                setErrors({ error: "Invalid email or password" })
            )}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit}>
                    <Header as='h2' content='Login to reactivities' color="teal" textAlign="center"/>
                    <MyTextInput name="email" placeholder="email" /> 
                    <MyTextInput name="password" placeholder="password" type='password' />
                    <ErrorMessage
                        name='error' render = {() => 
                            <Label style={{marginBottom: 10}} basic color="red" content = {errors.error}/>
                        }
                    />
                    <Button loading={isSubmitting} type="submit" content='Login' positive fluid />
                </Form>
            )}
        </Formik>
    )
})
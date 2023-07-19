import { Button, Header, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity, ActivityFormValues } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ActivityForm() {

    const { activityStore } = useStore()
    const { createActivity,
        updateActivity, loadingInitial, loadActivity } = activityStore

    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required("The activity title is required"),
        category: Yup.string().required(),
        description: Yup.string().required(),
        date: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required()
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => {
            setActivity(new ActivityFormValues(activity));
        });

    }, [id, loadActivity])

    function handleFormSubmit(activity: ActivityFormValues) {
        if (activity.id) {
            updateActivity(activity).then(() => { navigate(`/activity/${activity.id}`) });
        } else {
            activity.id = uuid();
            createActivity(activity).then(() => { navigate(`/activity/${activity.id}`) });
        }
    }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>){
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name] : value});
    // }

    if (loadingInitial) return <LoadingComponent content="Loading activity..."></LoadingComponent>

    return (
        <Segment clearing>
            <Header content='Activity Detail' sub color="teal" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit}>
                        <MyTextInput placeholder='Title' name='title' />
                        <MyTextArea placeholder='Description' name='description' rows={3} />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Detail' sub color="teal" />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            floated="right"
                            loading={isSubmitting}
                            positive type="submit"
                            content='Submit' />
                        <Button as={Link} to="/activities" floated="right" type="button" content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})
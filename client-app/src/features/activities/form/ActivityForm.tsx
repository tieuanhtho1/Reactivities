import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

export default observer( function ActivityForm(){

    const {activityStore} = useStore()
    const{createActivity, 
        updateActivity, loadingInitial, loadActivity} = activityStore
    
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        id: Yup.string().required('The activity title is required')
    });

    useEffect(() => {
        if(id) loadActivity(id).then(activity => {
            setActivity(activity!);
        });

    }, [id, loadActivity])

    function handleSubmit(){
        activity.id ? updateActivity(activity) : createActivity(activity);
        if (activity.id) {
            updateActivity(activity).then(() => {navigate(`/activity/${activity.id}`)});
        }else{
            activity.id = uuid();
            createActivity(activity).then(() => {navigate(`/activity/${activity.id}`)});
        }

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name] : value});
    }

    if (loadingInitial) return <LoadingComponent content="Loading activity..."></LoadingComponent>

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder = 'Title' value = {activity.title} name = 'title' onChange={handleInputChange}/>
                <Form.TextArea placeholder = 'Description' value = {activity.description} name = 'description' onChange={handleInputChange} />
                <Form.Input placeholder = 'Category' value = {activity.category} name = 'category' onChange={handleInputChange}/>
                <Form.Input type="date" placeholder = 'Date' value = {activity.date.split("T")[0]} name = 'date' onChange={handleInputChange}/>
                <Form.Input placeholder = 'City' value = {activity.city} name = 'city' onChange={handleInputChange}/>
                <Form.Input placeholder = 'Venue' value = {activity.venue} name = 'venue' onChange={handleInputChange}/>
                <Button floated="right" loading={activityStore.loading} positive type="submit" content ='Submit'/>
                <Button as={Link} to ="/activities" floated="right"  type="button" content ='Cancel'/>
            </Form>
        </Segment>
    )
})
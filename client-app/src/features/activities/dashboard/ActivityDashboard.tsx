import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
    activities: Activity[];
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default observer(function ActivityDashboard({
    activities , deleteActivity, submitting }: Props) {

    const {activityStore} = useStore()
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities}
                    deleteActivity = {deleteActivity}
                    submitting = {submitting} />
            </Grid.Column>
            <Grid.Column width='6'>
                {activityStore.selectedActivity  && !activityStore.editMode &&
                    <ActivityDetails />}
                {activityStore.editMode &&
                    <ActivityForm/>}
            </Grid.Column>
        </Grid>
    )
})
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity"
import { useState } from "react";
import { useStore } from "../../../app/stores/store";

interface Props {
    activities: Activity[];
    deleteActivity: (id: string) => void;
    submitting : boolean;
}

export default  function ActivityList({ activities,  deleteActivity, submitting }: Props) {
    
    const [deleteTarget, setDeleteTarget] = useState("");
    const {activityStore} = useStore()


    function handleActivityDelete(id: string){
        deleteActivity(id);
        setDeleteTarget(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}
                        style={{ opacity: (activity.id !== activityStore.selectedActivity?.id && activityStore.selectedActivity) && '0.3' }}>
                        <Item.Content>
                            <Item.Header as='a' >{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                {!activityStore.editMode &&
                                    <>
                                        <Button floated="right" content="View" color="blue"
                                            onClick={() => activityStore.selectActivity(activity.id)}></Button>
                                        <Button 
                                            loading = {deleteTarget === activity.id && submitting} 
                                            floated="right" 
                                            content="delete" 
                                            color="red"
                                            onClick={() => handleActivityDelete(activity.id)}></Button>
                                    </>
                                }
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
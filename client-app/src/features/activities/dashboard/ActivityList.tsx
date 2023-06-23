import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity"
import { useState } from "react";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    selectedActivity: Activity | undefined;
    editMode: boolean;
    deleteActivity: (id: string) => void;
    submitting : boolean;
}

export default function ActivityList({ editMode, selectedActivity, activities, selectActivity, deleteActivity, submitting }: Props) {
    
    const [deleteTarget, setDeleteTarget] = useState("");

    function handleActivityDelete(id: string){
        deleteActivity(id);
        setDeleteTarget(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}
                        style={{ opacity: (activity.id !== selectedActivity?.id && selectedActivity) && '0.3' }}>
                        <Item.Content>
                            <Item.Header as='a' >{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                {!editMode &&
                                    <>
                                        <Button floated="right" content="View" color="blue"
                                            onClick={() => selectActivity(activity.id)}></Button>
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
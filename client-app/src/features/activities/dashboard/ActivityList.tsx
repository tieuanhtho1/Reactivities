import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity"

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    selectedActivity: Activity | undefined;
    editMode: boolean;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({ editMode, selectedActivity, activities, selectActivity, deleteActivity }: Props) {
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
                                        <Button floated="right" content="delete" color="red"
                                            onClick={() => deleteActivity(activity.id)}></Button>
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
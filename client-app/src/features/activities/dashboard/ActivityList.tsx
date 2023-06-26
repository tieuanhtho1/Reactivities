import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";


export default observer(function ActivityList() {

    const [deleteTarget, setDeleteTarget] = useState("");
    const { activityStore } = useStore()


    function handleActivityDelete(id: string) {
        activityStore.deleteActivity(id);
        setDeleteTarget(id);
    }

    function handUnfocusActivity(){
        activityStore.cancelSelectActivity();
    }

    return (
        <Segment>
            <Item.Group divided>
                {activityStore.activitiesByDate.map(activity => (
                    <Item key={activity.id}
                        style={{ opacity: (activity.id !== activityStore.selectedActivity?.id && activityStore.selectedActivity) && '0.3' }}>
                        <Item.Content>
                            {activity.id === activityStore.selectedActivity?.id && activityStore.selectedActivity &&
                                <Button onClick={handUnfocusActivity} floated="right" content='unfocus' size="mini" />}
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
                                            as={Link} to={`/activity/${activity.id}`}></Button>
                                        <Button
                                            loading={deleteTarget === activity.id && activityStore.loading}
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
})
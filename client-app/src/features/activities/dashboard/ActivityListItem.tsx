import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import {format} from 'date-fns'
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import { observer } from "mobx-react-lite";

interface Props {
    activity: Activity
}

export default observer ( function ActivityListItem({ activity }: Props) {
    const [deleteTarget, setDeleteTarget] = useState("");
    const { activityStore } = useStore()


    function handleActivityDelete(id: string) {
        activityStore.deleteActivity(id);
        setDeleteTarget(id);
    }

    function handUnfocusActivity() {
        activityStore.cancelSelectActivity();
    }
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src='/assets/user/png' />
                        <Item.Content>
                            <Item.Header as={Link}
                                to={`/activities/${activity.id}`}>{activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by {activity.host?.displayName}</Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label basic color="orange">
                                        You are hosting this activity
                                    </Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost &&(
                                <Item.Description>
                                    <Label basic color="green">
                                        You are going to this activity
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name="marker" /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!}/>
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link}
                    to = {`/activity/${activity.id}`}
                    color="teal"
                    floated="right"
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
})
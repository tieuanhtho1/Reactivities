import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";


export default  observer(function NavBar() {

    const {activityStore} = useStore();

    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src = "/assets/logo.png" alt="logo"
                    style={{marginRight : '10px'}}></img>
                        Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities"/>
                <Menu.Item as={NavLink} to='/errors' name="Errors"/>
                <Menu.Item>
                    {!activityStore.editMode &&
                    <Button as={NavLink} to='/createActivity' positive content = "Create Activity"/>}
                </Menu.Item>
            </Container>
        </Menu>
    )
})
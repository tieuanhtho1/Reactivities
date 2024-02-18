import { Tab } from "semantic-ui-react";

export default function ProfileContent(){
    const panes = [
        {menuItem: 'About', render: () => <Tab.Pane></Tab.Pane>},
        {menuItem: 'Photos', render: () => <Tab.Pane></Tab.Pane>},
        {menuItem: 'Events', render: () => <Tab.Pane></Tab.Pane>},
        {menuItem: 'Followers', render: () => <Tab.Pane></Tab.Pane>},
        {menuItem: 'Following', render: () => <Tab.Pane></Tab.Pane>}
    ];

    return(
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition="right"
            panes={panes}
        />
    )
}
import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { API } from '../../utilities/constants';
import { Activity } from '../models/activity';
import { Container, List } from 'semantic-ui-react';
import NavBar from './NavBar';
import 'semantic-ui-css/semantic.min.css';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>(`${API}/activities`)
      .then(response => {
        setActivities(response.data)
      })
  }, [])

  function handleSelectActivity(id : string){
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id? :string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  return (
    <>
      <NavBar openForm = {handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard
         activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}/>
      </Container>

    </>
  );
}

export default App;

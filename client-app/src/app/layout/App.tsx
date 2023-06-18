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
  useEffect(() => {
    axios.get<Activity[]>(`${API}/activities`)
      .then(response => {
        setActivities(response.data)
      })
  }, [])
  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities}/>
      </Container>

    </>
  );
}

export default App;

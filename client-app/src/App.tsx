import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { API } from './utilities/constants';

function App() {
  const [activities, setActivities] = useState<any>([])
  useEffect(() => {
    axios.get(`${API}/activities`)
      .then(response => {
        setActivities(response.data)
      })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <ul>

          {activities.map((activity: any) => (
            <li key={activity.id}>
              {activity.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;

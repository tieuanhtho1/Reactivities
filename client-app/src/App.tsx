import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { API } from './utilities/constants';

function App() {
  const [activities, setActivities] = useState<any>(['',''])
  useEffect(() => {
    axios.get(`${API}/activities`)
    .then(response => {
      setActivities(response.data)
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        {activities.forEach((activity : any) => {
          <li>
            {activity}
          </li>
        })}
      </header>
    </div>
  );
}

export default App;

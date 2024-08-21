import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiResponse } from './models/timeline.interface';
import './App.css';

function App() {
  const [data, setData] = useState<ApiResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://arthurfrost.qflo.co.za/php/getTimeline.php')  // Replace with your endpoint URL
      .then(response => {
        setData(response.data);  // Update state with the fetched data
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch(err => {
        console.error('Error fetching data:', err);  // Log the error
        setError(err);  // Set error in state
        setLoading(false);  // Set loading to false if there's an error
      });
  }, []);  // Empty dependency array means this runs once after the initial render

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;  // Display error message if request fails


  return (
    <div className="App">
      {data && data.Body && data.Body[0] && data.Body[0].About ? (
        <div className='about-header' dangerouslySetInnerHTML={{ __html: data.Body[0].About }} />
      ) : (
        <div>No content available</div>
      )}
      <h1>Data</h1>
      {data?.Timeline && Array.isArray(data.Timeline) && data.Timeline.length > 0 ? (
        <ul>
          {data?.Timeline.map((item, index) => (
            <li key={index}>
              <label>ID : <strong>{ item.Id}</strong></label>
              <label>Title : <strong>{ item.Title}</strong></label>
              <label>Media : <strong>{ item.Media}</strong></label>
              <label>Description : <strong>{ item.Description}</strong></label>
              <label>Image : <strong>{ item.Image}</strong></label>
              <label>Icon : <strong>{ item.Icon}</strong></label>
              <label>Audio : <strong>{ item.Audio}</strong></label>
              <label>Remote ID : <strong>{ item.RemoteId}</strong></label>
              <label>Status : <strong>{ item.Status}</strong></label>
              <label>IsActive : <strong>{ item.IsActive}</strong></label>
              <label>InId : <strong>{ item.InId}</strong></label>
              <label>Create Date : <strong>{ item.CreateDate}</strong></label>
              <label>Media Name : <strong>{ item.MediaName}</strong></label>
              <label>Category : <strong>{ item.Category}</strong></label>
              <label>Epoch : <strong>{ item.Epoch}</strong></label>
              <label>Audio Size : <strong>{ item.AudioSize}</strong></label>
            </li>
          ))}
        </ul>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default App;

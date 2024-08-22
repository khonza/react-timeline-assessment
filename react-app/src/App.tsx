import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { ApiResponse } from './models/timeline.interface';
import { RotatingLines } from "react-loader-spinner";
import './App.css';

function App() {
  const [data, setData] = useState<ApiResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const resourceDir:string = 'https://arthurfrost.qflo.co.za/';

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

  if (loading) return <div className="loader-spinner"><RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                      /></div>;
  if (error) return <div>Error: {error}</div>;  // Display error message if request fails


  return (
    <div className="App">
      {data && data.Body && data.Body[0] && data.Body[0].About ? (
        <div id='about-header' dangerouslySetInnerHTML={{ __html: data.Body[0].About }} />
      ) : (
        <div>No content available</div>
      )}
      
      { data?.Timeline && Array.isArray(data.Timeline) && data.Timeline.length > 0 ? (
        <div className='timeline-card-container'>
          { data?.Timeline.map((item, index) => (
            <><Card id="timeline-card" key={ index }>
              <Card.Img variant="top" src={ resourceDir + item.Image } />
              <Card.Body>
                <Card.Title>{ item.Category }</Card.Title>
                <Card.Text>{ item.Description }</Card.Text>
                <Card.Header>{ item.Title }</Card.Header>
                <Card.Body><label>{ item.CreateDate }</label></Card.Body>
                <audio controls>
                  <source src={ resourceDir + item.Audio } type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <audio ></audio>
              </Card.Body>
            </Card></>
          ))}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default App;

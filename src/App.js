import React, { useState} from "react";
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=ed4f58e391f56e4ac688387ca36c4901`  
  //const imgUrl = "https://images.unsplash.com/photo-1512641406448-6574e777bec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setIsLoading(true)
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("Error data: ", error)
        setIsLoading(false)
      })
      setLocation('')
    }
  }

  // useEffect(() => {
  //   axios.get(url)
  //   .then(function (response) {
  //     setData(response.data)
  //     console.log(response.data)
  //   })
  //   setLocation('')
  // }, [setLocation]) 

  if (isLoading) return <CircularProgress />

  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main? <h1>{data.main.temp.toFixed()}F</h1>: null}
          </div>
          <div className="description">
            {data.weather? <p>{data.weather[0].main}</p>: null}
          </div>
        </div>

        {data.name? 
        <div className="bottom">
          <div className="feels">
            {data.main? <p className="bold">{data.main.feels_like.toFixed()}F</p>: null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main? <p className="bold">{data.main.humidity}%</p>: null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind? <p className="bold">{data.wind.speed.toFixed()} MPH</p>: null}
            <p>Wind Speed</p>
          </div>
        </div> 
        :null}

      </div>
    </div>
  );
}

export default App;

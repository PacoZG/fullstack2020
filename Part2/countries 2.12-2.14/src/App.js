import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './index.css'

const Filter = (props) => {
  const { filterChange } = props
  return(
    <form >
      <div className={"labelStyle"}>
        {'find countries'} <input
        onChange={filterChange} />
      </div>
    </form>
  )
}

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>  {'show'}  </button> 
 )}

const Show = (props) => {
  const { country } = props
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState()
  
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
    .then(response => { setWeather(response.data) }) }, [api_key, country.capital])
    
  return (
    
    <div>
    <h1 className={"headerStyle"} key={country.numericCode}> {country.name} </h1>
    <div className={"textStyle"} key={country.capital}>{'Capital: '} {country.capital}</div>
    <div className={"textStyle"} > {'population: '}{country.population}</div>
    <h2>{'Spoken languages'}</h2>
    {country.languages.map(language => <li className={"textStyle"} key={language.iso639_2}>{language.name}</li>)}
    <img className={"image"} alt='flag' src={country.flag} width="200" height="150"></img>
    <h2 className={"subheaderStyle"}>{'Weather in'} {country.capital}</h2>
    <div><b>{'Temperature: '}</b> {weather && weather.current.temperature} Celcius</div>
    {weather && weather.current.weather_icons.map(link =>
    <img className={"image"} key={country.numericCode} alt='flag' src={link} width="200" height="150"></img>)}    
  <div><b>{'Wind: ' }</b> {weather && weather.current.wind_speed} {'mph direction '} {weather && weather.current.wind_dir}</div>
    </div>
  )
}

const Countries = (props) => {
  const { countries, filter, setFilter } = props
  if(filter === '' || countries.length === 0){
  return (
    <div></div>
  )
  }else if( countries.length >= 10 ){
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countries.length >= 2){
    return(
      countries.map((country) => <div key={country.numericCode}>
         {country.name} <Button handleClick={() => { setFilter(country.name) } } />
         </div>)
    )
  } else {
    return (
    <Show country = {countries[0]} />
    )
  }
}

const App = () =>{
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const [countries, setCountries] = useState ([])
  const [newFilter, setFilter] = useState('') 
  const handleFilterChange = (event) => {
  setFilter(event.target.value)
  }
  return (
    <div>
      <Filter filterChange={handleFilterChange}/> 
      <Countries filter={newFilter} setFilter={setFilter} countries={countries.filter(country =>
       country.name.toLowerCase().includes(newFilter.toLowerCase()))}/>
    </div>
  )
}
export default App;

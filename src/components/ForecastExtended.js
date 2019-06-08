import React, { Component } from "react";
import PropTypes from "prop-types";
import ForecastItem from "./ForecastItem";
import transformForecast from './../services/transformForecast';
import "./styles.css";


const api_key = "6e73318e3d7761c2d87f585207ef08c2";
const url_base_weather = "https://api.openweathermap.org/data/2.5/forecast";

class ForecastExtended extends Component {
  constructor() {
    super();
    this.state = { forecastData: null };
  }

  componentDidMount() {
    this.updateCity(this.props.city);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.city !== this.props.city) {
      this.setState({forecastData: null});
      this.updateCity(nextProps.city)
      
    }
  }
  
  updateCity = city =>{
    const url_forecast = `${url_base_weather}?q=${city}&appid=${api_key}`
    fetch(url_forecast).then(
      data => (data.json())
    ).then(
      weather_data => {
        console.log(weather_data);
        const forecastData = transformForecast(weather_data);
        console.log(forecastData);
        this.setState({ forecastData });
      }
    );
  }
  renderForecastItemDay(forecastData) {
    return forecastData.map(forecast => (
      <ForecastItem 
      key={`${forecast.weekDay}${forecast.hour}`}
      weekDay={forecast.weekDay} 
      hour={forecast.hour} 
      data={forecast.data}></ForecastItem>));
  }

  renderProgress = () => {
    return <h3>Cargando Pronostico Extendido</h3>;
  }
  render() {
    const { city } = this.props;
    const { forecastData } = this.state;
    return (
      <div>
        <h2 className="forecart-title">Pronostico Extendido para {city}</h2>
        {forecastData ?
          this.renderForecastItemDay(forecastData) :
           this.renderProgress()}
      </div>
    );
  }
}

ForecastExtended.propTypes = {
  city: PropTypes.string.isRequired
};
export default ForecastExtended;
import "./Maininfo.css";
const MainInfo = (props) => {
  const weatherData = props.weather;
  console.log(weatherData);
  return (
    <section className="maininfocontainer">
      <h3>{weatherData.name}</h3>
      <h3>{weatherData.main.temperature}</h3>
      {
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        />
      }
      <h3>{weatherData.weather[0].description}</h3>
      <h5>{new Date().toLocaleString()}</h5>
      <div className="meterinfo">
        <h3>wind: {weatherData.wind.speed}m/s</h3>
        <h3>Pressure: {weatherData.main.pressure}hpa</h3>
      </div>
      <div className="percentinfo">
        <h3>Humidity: {weatherData.main.humidity}%</h3>
        <h3>Cloudiness: {weatherData.clouds.all}%</h3>
      </div>
    </section>
  );
};

export default MainInfo;

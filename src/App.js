import "./App.css";
import SearchBar from "./Components/SearchBar/Searchbar";
import MainInfo from "./Components/MainInfo/Maininfo";
import { useEffect, useState, useReducer, useCallback } from "react";
import { FidgetSpinner, Oval } from "react-loader-spinner";
const reducer = (state, action) => {
  switch (action.type) {
    case "Location":
      console.log(action);
      return { ...state, lat: action.latitude, long: action.longitude };
    case "result":
      console.log(action);
      return { ...state, location: { ...action.result } };

    default:
      return state;
  }
};
const Location = {
  lat: undefined,
  long: undefined,
  location: undefined,
};
function App() {
  const [data, dispatch] = useReducer(reducer, Location);
  const { lat, long } = data;
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    setisloading(true);
    navigator.geolocation.getCurrentPosition(function (position) {
      dispatch({
        type: "Location",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);
  useEffect(() => {
    if (!lat || !long) return;
    fetchDetails();
  }, [lat, long]);

  const updateWeather = useCallback((latitude, longitude) => {
    dispatch({ type: "Location", latitude, longitude });
  }, []);
  const fetchDetails = useCallback(() => {
    let string = `${process.env.REACT_APP_API_URL}/weather/?lat=${data.lat}&lon=${data.long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;
    setisloading(true);
    fetch(string)
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: "result", result });
      })
      .catch((e) => console.log(e));
    setisloading(false);
  }, [data]);
  return (
    <div className="App">
      {isloading ? (
        <Oval height="80" width="80" color="blue" visible={true} />
      ) : (
        <div className="content">
          <SearchBar changeweather={updateWeather} />
          {data.location && <MainInfo weather={data.location} />}
        </div>
      )}
    </div>
  );
}

export default App;

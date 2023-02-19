import "./Searchbar.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useState } from "react";

const SearchBar = (props) => {
  const changeHandler = (e) => {
    setaddress(e);
  };
  const [address, setaddress] = useState("");
  const [isloading, setisloading] = useState(false);
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setaddress(value);
    props.changeweather(latlng.lat, latlng.lng);
  };

  return (
    <>
      <PlacesAutocomplete
        onChange={changeHandler}
        value={address}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="queryInput">
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "queryInput2",
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                return (
                  <div className="suggestions" key={Math.random()}>
                    <span className="singleSugeestion">
                      {suggestion.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
};

export default SearchBar;

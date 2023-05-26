import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useDispatch} from 'react-redux';
import AddNew from "./Add";
import Watchlist from "./Watchlist";
import { addToWatchlist } from "./actions";
import { AuthContext } from './AuthContext';
import Navbar from './Navbar';



function App() {
  const [properties, setListaObiektow] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [bedroomsFilter, setBedroomsFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const dodajObiekt = (nowyObiekt) => {
    setListaObiektow([...properties, nowyObiekt]);
  };

  const style = {
    backgroundColor: darkMode ? "#1a1a1a" : "#f2f2f2",
    color: darkMode ? "#f2f2f2" : "#333",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/data.json");
      const data = await response.json();
      setListaObiektow(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    if (currentHour >= 20 || currentHour < 6) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
  };

  const handleBedroomsFilterChange = (event) => {
    setBedroomsFilter(event.target.value);
  };

  const handleDescriptionFilterChange = (event) => {
    setDescriptionFilter(event.target.value);
  };

  const handlePriceSortChange = (event) => {
    setPriceSort(event.target.value);
  };

  const handleAddToWatchlist = item => {
    dispatch(addToWatchlist(item));
  };

  let filteredProperties = properties;

  if (cityFilter) {
    filteredProperties = filteredProperties.filter((property) =>
      property.city.toLowerCase().includes(cityFilter.toLowerCase())
    );
  }

  if (bedroomsFilter) {
    filteredProperties = filteredProperties.filter(
      (property) => property.bedrooms.toString() === bedroomsFilter
    );
  }

  if (descriptionFilter) {
    filteredProperties = filteredProperties.filter((property) =>
      property.description
        .toLowerCase()
        .includes(descriptionFilter.toLowerCase())
    );
  }

  if (priceSort === "asc") {
    filteredProperties = filteredProperties.sort((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    filteredProperties = filteredProperties.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="App" style={style}>
      <Navbar user={user} />
      <header className="App-header">
        <BrowserRouter>
          <div className="filters">
            <h1>Nieruchomości do kupienia</h1>
            <br />
            <button onClick={handleToggleDarkMode} className="button">
              {darkMode ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
            </button>
            <br />
            <label htmlFor="cityFilter">Miasto:</label>
            <input
              type="text"
              id="cityFilter"
              value={cityFilter}
              onChange={handleCityFilterChange}
            />
            <label htmlFor="bedroomsFilter">Liczba sypialni:</label>
            <select
              id="bedroomsFilter"
              value={bedroomsFilter}
              onChange={handleBedroomsFilterChange}
            >
              <option value="">-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>

            <label htmlFor="descriptionFilter">Opis:</label>
            <input
              type="text"
              id="descriptionFilter"
              value={descriptionFilter}
              onChange={handleDescriptionFilterChange}
            />

            <label htmlFor="priceSort">Sortuj po cenie:</label>
            <select
              id="priceSort"
              value={priceSort}
              onChange={handlePriceSortChange}
            >
              <option value="">-</option>
              <option value="asc">Rosnąco</option>
              <option value="desc">Malejąco</option>
            </select>
            <br />
            <Link to="/Add">Dodaj ogloszenie</Link>
          </div>
          <Routes>
            <Route path="/Add" element={<AddNew dodajObiekt={dodajObiekt} />} />
          </Routes>
        </BrowserRouter>
      </header>
      <main>
        <Watchlist />
        {filteredProperties.map((property) => (
          <div key={property.address} className="property">
            <img src={property.image} alt={property.description} />
            <div className="details">
              <h2>{property.description}</h2>
              <p>
                {property.address}, {property.city}
              </p>
              <p>Liczba sypialni: {property.bedrooms}</p>
              <p>Cena: {property.price} zł</p>
              <p>Kontakt: {property.mail} zł</p>
              <button onClick={() => handleAddToWatchlist(property)}> Dodaj </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

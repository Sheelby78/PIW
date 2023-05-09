import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AddNew from "./Add";

function App() {
  const [properties, setListaObiektow] = useState([
    {
      city: "Warszawa",
      bedrooms: 2,
      description: "Nowoczesne mieszkanie blisko centrum",
      price: 350000,
      address: "ul. Królewska 12",
      image:
        "https://photos.zillowstatic.com/fp/29356d546adfa1c41da85fc05c555123-p_e.jpg",
    },
    {
      city: "Gdańsk",
      bedrooms: 3,
      description: "Duże mieszkanie w spokojnej okolicy",
      price: 450000,
      address: "ul. Długa 23",
      image:
        "https://photos.zillowstatic.com/fp/04e403e91111fc5e3ec1e3451640515f-p_e.jpg",
    },
    {
      city: "Kraków",
      bedrooms: 1,
      description: "Kawalerka w ścisłym centrum",
      price: 250000,
      address: "ul. Szewska 8",
      image:
        "https://photos.zillowstatic.com/fp/83b9253db8c9f7fdefa7d990b9524442-p_e.jpg",
    },
    {
      city: "Wrocław",
      bedrooms: 2,
      description: "Mieszkanie na nowym osiedlu",
      price: 300000,
      address: "ul. Główna 14",
      image:
        "https://photos.zillowstatic.com/fp/b4b8d1f6b92cd66afb516f454d182e6c-p_e.jpg",
    },
  ]);

  const [cityFilter, setCityFilter] = useState("");
  const [bedroomsFilter, setBedroomsFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const dodajObiekt = (nowyObiekt) => {
    setListaObiektow([...properties, nowyObiekt]);
  };

  const style = {
    backgroundColor: darkMode ? "#1a1a1a" : "#f2f2f2",
    color: darkMode ? "#f2f2f2" : "#333",
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
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

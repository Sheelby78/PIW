import React, { useState } from "react";

function AddNew(props) {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [price, setPrice] = useState("");

  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleCityChange = (event) => setCity(event.target.value);
  const handleBedroomsChange = (event) =>
    setBedrooms(parseInt(event.target.value));
  const handlePriceChange = (event) => setPrice(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProperty = { city, bedrooms, description, price, address };
    props.dodajObiekt(newProperty);
    setAddress("");
    setDescription("");
    setCity("");
    setPrice("");
  };

  return (
    <div className="add-new">
      <h1>Dodaj nowe ogłoszenie</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Opis:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Adres:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Miasto:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bedrooms">Liczba sypialni:</label>
          <select
            id="bedrooms"
            value={bedrooms}
            onChange={handleBedroomsChange}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Cena:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <button type="submit">Dodaj ogłoszenie</button>
      </form>
    </div>
  );
}

export default AddNew;
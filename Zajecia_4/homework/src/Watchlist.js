import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from './actions';

const Watchlist = () => {
  const watchedItems = useSelector(state => state.watchedItems);
  const dispatch = useDispatch();

  const handleRemove = item => {
    dispatch(removeFromWatchlist(item));
  };

  return (
    <div>
      <h2>Obserwowane oferty</h2>
      {watchedItems.length === 0 ? (
        <p>Koszyk jest pusty</p>
      ) : (
        <ul>
          {watchedItems.map(item => (
            <li key={item.address}>
              {item.city}{' | '}{item.address}{' | '}{item.price}{" zł "}
              <button onClick={() => handleRemove(item)}>Usuń</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;
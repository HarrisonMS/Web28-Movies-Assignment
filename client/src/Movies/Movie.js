import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';


function Movie({ addToSavedList }) {
  const { push } = useHistory();
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:9999/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const routeToEditForm = e => {
    e.preventDefault();
    push(`/update-movie/${match.params.id}`);
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = (id) => {
    axios
    .delete(`http://localhost:9999/api/movies/${match.params.id}`)
    .then((res) => {
      console.log(res.data)
      push('/')
    })
    .catch((err) => console.log(err.res))
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      <button className="md-button" onClick={routeToEditForm}>
        Edit
      </button>
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
}

export default Movie;

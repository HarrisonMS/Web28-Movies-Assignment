import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import  UpdateMovieForm  from './Movies/UpdateMovieForm'
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
 console.log('wtf',movieList)
  const getMovieList = () => {
    axios
      .get("http://localhost:9999/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
  
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route exact path="/movies/:id"
      render={props => (
        <Movie {...props} addToSavedList={addToSavedList}/>
      )}
      />
        {/* <Movie addToSavedList={addToSavedList} /> */}
      
      <Route exact path = "/update-movie/:id" 
      render={props => (
        <UpdateMovieForm {...props} savedList={savedList} updateSavedList = {setSavedList}/>
      )}
      />
      {/* <Route exact path="/update-movie/"> */}
        {/* <UpdateMovieForm movies={movieList} setMovieList={setMovieList} />
      </Route>
      <UpdateMovieForm/> */}
      {/* <Route
        path="/item-list/:id"
        render={props => <UpdateMovieForm {...props} movieList={movieList} setMovieList={setMovieList} />} */}
      
    </>
  );
};

export default App;

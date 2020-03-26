import React, { useState, useEffect } from 'react';

import axios from 'axios';

const initmovies = {
	title     : '',
	director  : '',
	metascore : '',
	stars     : [],
}

const UpdateMovieForm = (props)=>{

  console.log('propityprops in updatemovie',props)
  const [movies, setMovies] = useState(initmovies)

  const handleChanges = e => {
    setMovies({
      ...movies,
      [e.target.name]: e.target.value
    })    
  }

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.put(`http://localhost:9999/api/movies/${props.match.params.id}`, movies)
			.then(() => {
				// props.updateSavedList([ ...setMovies, res.data ]);
				props.history.push('/');
			})
			.catch((err) => console.log(err));
  };
  
	useEffect(() => {
    axios.get(`http://localhost:9999/api/movies/${props.match.params.id}`)
    .then((res) => setMovies(res.data))
    .catch((err) => console.log(err.res));
  },[props.match.params.id ],);
		
	


  return(
    <div className='updateMovieFormCont'>
      <form onSubmit={handleSubmit}>
        <textarea
        type='textarea'
        name='title'
        placeholder='title'
        value={movies.title}
        onChange={handleChanges}
        />
        <input
        type='text'
        name='director'
        placeholder='director'
        value={movies.director}
        onChange={handleChanges}
        />
       <input
        type='text'
        name='metascore'
        placeholder='metascore'
        value={movies.metascore}
        onChange={handleChanges}
        />
        {/* <input
        type='text'
        name='stars'
        placeholder='stars'
        value={movies.stars}
        /> */}
        <button>Update</button>
      </form>
    </div>
  )
}
export default UpdateMovieForm
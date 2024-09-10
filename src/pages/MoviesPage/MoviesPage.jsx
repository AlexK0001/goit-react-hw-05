import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../movies';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = event => {
    event.preventDefault();
    setSearchParams({ query });
  };

  useEffect(() => {
    const movieQuery = searchParams.get('query');
    if (movieQuery) {
      searchMovies(movieQuery).then(setMovies);
    }
  }, [searchParams]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;

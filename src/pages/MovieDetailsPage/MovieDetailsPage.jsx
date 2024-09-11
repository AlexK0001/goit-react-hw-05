import { useParams, useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { fetchMovieDetails } from '../../movies';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (!movieId) return;
    fetchMovieDetails(movieId).then(setMovieData);
  }, [movieId]);

  if (!movieData) return null;

  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(-1);
    } else {
      navigate(backLinkRef.current);
    }
  };

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <h2>{movieData.title}</h2>
      <img 
        src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}` : defaultImg} 
        alt={movieData.title} 
        width={250} 
      />
      <p>{movieData.overview}</p>

      <nav>
        <Link to="cast" state={{ from: backLinkRef.current }}>Cast</Link>
        <Link to="reviews" state={{ from: backLinkRef.current }}>Reviews</Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

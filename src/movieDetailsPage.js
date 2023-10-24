import { useEffect, useState } from 'react';
import './movieDetailsPage.css';
import { useLocation } from 'react-router-dom';
import { getMovieImages } from './api';


function MovieDetailsPage() {

    const { state } = useLocation();
    // const [movieImages, setMovieImages] = useState([]);
    const [str, setStr] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMovieImages(state.id);
            // setMovieImages(data);
            setStr(data.posters[0].file_path)
        }

        fetchData().catch(console.error);
    }, [state])

    return (
        <div className='movie-details-main'>
                {str && <img
                    src={`https://image.tmdb.org/t/p/w500/${str}`}
                    alt='movie-img'
                />}
        </div>
    );
}

export default MovieDetailsPage;

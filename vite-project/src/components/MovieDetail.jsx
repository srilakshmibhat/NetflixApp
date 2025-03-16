import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/MovieDetail.css";

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [watchUrl, setWatchUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response1 = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=7b95546ed9655cf628f861876066980c`
                );
                const data1 = await response1.json();
                setMovie(data1);
                setLoading(false);
                const response = await fetch(
                    `https://api.watchmode.com/v1/search/?apiKey=wuhSDa8oq7sKJTx2cjDu0olQQ2xOcBx7J1qDhwVl&search_field=tmdb_movie_id&search_value=${id}`
                );
                const data = await response.json();
                if (!data.title_results.length) throw new Error("No streaming info found");
    
                const watchmodeId = data.title_results[0].id;
                const response2 = await fetch(
                    `https://api.watchmode.com/v1/title/${watchmodeId}/sources/?apiKey=wuhSDa8oq7sKJTx2cjDu0olQQ2xOcBx7J1qDhwVl`
                );
                const data2 = await response2.json();
    
                let foundUrl = null;
                for (let source of data2) {
                    if (["Disney+", "Netflix", "Amazon", "YouTube", "AppleTV+"].includes(source.name)) {
                        foundUrl = source.web_url;
                        break;
                    }
                }
                
                setWatchUrl(foundUrl || `https://www.google.com/search?q=${data1.title} movie`);
            } catch (err) {
                setError("Failed to load movie details");
                setLoading(false);
                console.error(err);
            }
        }
        fetchMovie();
    }, [id]);

    function fetchWatchUrl() {
        window
            .open(watchUrl, "_blank")
            .focus();
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="movie-detail">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            
            <div className="movie-detail-content">
                <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p><strong>Release Year:</strong> {movie.release_date}</p>
                <button className="watch-btn" onClick={fetchWatchUrl}>Find Where to Watch</button>
            </div>
        </div>
    );
};

export default MovieDetail;

import "../css/MovieCard.css"
import { useMovieContext } from "../context/MovieContext"

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }
    async function watchNowClick() {
        const response=await fetch(`https://api.watchmode.com/v1/search/?apiKey=wuhSDa8oq7sKJTx2cjDu0olQQ2xOcBx7J1qDhwVl&search_field=tmdb_movie_id&search_value=${movie.id}`);
        const data=await response.json();
        const watchmodeId=data.title_results[0].id;
        const response2=await fetch(`https://api.watchmode.com/v1/title/${watchmodeId}/sources/?apiKey=wuhSDa8oq7sKJTx2cjDu0olQQ2xOcBx7J1qDhwVl`);
        const data2=await response2.json();
        let watchUrl;
        for(var i=0;i<data2.length;i++){
            if(data2[i].name=='Disney+'||data2[i].name=='Netflix'||data2[i].name=='Amazon'||data2[i].name=='Youtube')
                {
                    watchUrl=data2[i].web_url;
                    break;
                }
        }
        if(watchUrl==undefined)
            window.open(`https://www.google.com//search?q=${movie.title} movie`,"_blank");
        else
            window.open(watchUrl, "_blank")
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
            <button onClick={watchNowClick}>Watch Now</button>
        </div>
    </div>
}

export default MovieCard;
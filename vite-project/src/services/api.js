const API_KEY="7b95546ed9655cf628f861876066980c";
const BASE_URL="https://api.themoviedb.org/3";
const POPULAR_MOVIES_URL=`${BASE_URL}/movie/popular?api_key=${API_KEY}`;
const SEARCH_MOVIES_URL=`${BASE_URL}/search/movie?api_key=${API_KEY}`;

export const getPopularMovies=async()=>{
    const response=await fetch(POPULAR_MOVIES_URL);
    const data=await response.json();
    return data.results;
}

export const searchMovies=async(query)=>{
    const response=await fetch(SEARCH_MOVIES_URL+`&query=${query}`);
    const data=await response.json();
    return data.results;
}

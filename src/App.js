import {useState, useEffect} from "react";
import './App.css';
import MovieCard from './MovieCard';

//a0e6f067

const API_URL = 'http://www.omdbapi.com?apikey=a0e6f067';


const App =() => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}&number=20`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() =>{
        searchMovies('Marvel')
    }, []);
    return(
        <div className="app">
            
            <h1>Cinema For You..!</h1>
            
            <div className="search">
                <input 
                  placeholder="Search for Movies"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyUp={e => {
                      if ( e.code === 'Enter' ) {
                          searchMovies(searchTerm);
                          setSearchTerm('');
                      }
                  }}
                />
                <img 
                  src='https://www.shareicon.net/data/2015/10/03/110917_search_512x512.png'
                  alt="search"
                  onClick={() => searchMovies(searchTerm)}
                />
            </div>

            { movies?.length > 0 
                ?(<div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>Not Movies Found</h2>
                </div>
             )}
             <p className="personal">Created By: Hanan Siyamand</p>
        </div>
        
    );
}

export default App;

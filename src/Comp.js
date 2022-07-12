import { useContext, useState } from "react";
import {MyContext} from "./App";
function Header(){
    let {changes} = useContext(MyContext);
    return <header>
        <label>show results</label>
        <select name="results" onChange={changes}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
        </select>
        <label>sort by</label>
        <select name="sort" onChange={changes}>
            <option value="movie">movie</option>
            <option value="release_date">release_date</option>
            <option value="year">year</option>
            <option value="director">director</option>
        </select>
        <input type="number" placeholder="2010" name="year" onChange={changes}/>
        <input type="text" placeholder="movie name" name="movie" onChange={changes} />
        <input type="text" placeholder="director name" name="director" onChange={changes} />
    </header>
}
function PopUp({chcard,showcard}){
    let {apidata} = useContext(MyContext);
    let {year,character,director,full_line,movie,movie_duration,poster,release_date,timestamp,video} = apidata[showcard[1]];
    let arr = [];
    for(let i in video){
        arr.push(<a key={i} target="_blank" rel="noreferrer" href={video[i]}>{i}</a>);
    }
    return <div className="container popup">
        <table>
            <thead>
                <tr>
                    <th colSpan="2"><img src={poster} alt={movie} /></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>movie</th>
                    <td>{movie}</td>
                </tr>
                <tr>
                    <th>year</th>
                    <td>{year}</td>
                </tr>
                <tr>
                    <th>release date</th>
                    <td>{release_date}</td>
                </tr>
                <tr>
                    <th>director</th>
                    <td>{director}</td>
                </tr>
                <tr>
                    <th>character</th>
                    <td>{character}</td>
                </tr>
                <tr>
                    <th>movie duration</th>
                    <td>{movie_duration}</td>
                </tr>
                <tr>
                    <th>timestamp</th>
                    <td>{timestamp}</td>
                </tr>
                <tr>
                    <th>full line</th>
                    <td>{full_line}</td>
                </tr>
                <tr>
                    <td colSpan="2">
                        {arr
                            /* <a href="/">1080p</a>
                        <a href="/">720p</a>
                        <a href="/">480p</a>
                        <a href="/">360p</a> */}
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button onClick={() => chcard([false,0])}>go back</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}
function Container(){
    let {apidata,loading} = useContext(MyContext);
    let [showcard,chcard] = useState([false,0]);
    return(
        <>
            <div className="container">
                <Header />
                <div className="card-box">
                    {loading && <h1>loading...</h1>}
                    {apidata.length !== 0 ? apidata.map((val,ind) => {
                        return <div className="card" key={ind} onClick={() => chcard([true,ind])}>
                        <img src={val.poster} alt={val.movie} />
                        <h3>{val.movie}</h3>
                        <span>{val.release_date}</span>
                    </div>
                    }):<h1>no records found.</h1>}
                </div>
            </div>
            {showcard[0] && <PopUp chcard={chcard} showcard={showcard} />}
        </>
    )
}
export {Container};
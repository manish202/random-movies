import { createContext, useEffect, useState } from "react";
import {Container} from "./Comp";
export let MyContext = createContext();
function App(){
    let [data,chdata] = useState({apidata:[],results:5,year:"",movie:"",director:"",sort:""});
    let [loading,chloading] = useState(true);
    let {results,year,movie,director,sort} = data;
    useEffect(() => {
        let x = setTimeout(() => {
            fetch(`https://owen-wilson-wow-api.herokuapp.com/wows/random?results=${results}&year=${year}&movie=${movie}&director=${director}&sort=${sort}`)
            .then(res => res.json())
            .then((data) => {
                chdata((old) => {
                    return {...old,apidata:data}
                })
                chloading(false);
            }).catch((err) => {
                alert(err);
            });
        },500);
        return () => clearTimeout(x);
    },[results,year,movie,director,sort]);
    function changes(e){
        chloading(true);
        chdata((old) => {
            return {...old,apidata:[]}
        })
        let {name,value} = e.target;
        chdata((old) => {
            return {...old,[name]:value}
        })
    }
    return(
        <>
            <MyContext.Provider value={{...data,changes,loading}}>
                <Container />
            </MyContext.Provider>
        </>
    )
}
export default App;
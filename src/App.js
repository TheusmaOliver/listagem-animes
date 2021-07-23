import React, { useEffect, useState } from 'react';
import qs from 'qs';
import Pagination from './Pagination';
import Searchinput from './Searchinput';
import narutoCorrendo from './img/naruto-corendo.gif'
import './App.css';

const api = "https://kitsu.io/api/edge"
const LIMIT = 12


function App() {
  const [info,setInfo] = useState({});
  const [text, setText] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(()=>{
    setInfo({});
    
    const query = {
      page:{
        limit: LIMIT,
        offset
      }
    };

    if(text){
      query.filter = {
        text
      };
    }

    fetch(`${api}/anime?${qs.stringify(query)}`)
      .then((response)=> response.json())
      .then((response)=>{
        setInfo(response);
      })
    
      
    
  }, [text,offset]);

  return (
    
    <div className="App">
      
      <h1>Lista de Animes</h1>
      
      <Searchinput  
        value={text} 
        onChange={(search)=> setText(search)}
      />

      {(text || !text) && !info.data &&
        <div className='carregando'> 
          <span>Carregando...</span>
          <img src={narutoCorrendo} width='100' alt='gif-naruto'/>
        </div>
        
      }
      {info.data &&(
        <ul className="animes-list">
          {info.data.map((anime)=>(
            
            <li key={anime.id}>  
                         
              <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle}/>
              <h2>{anime.attributes.canonicalTitle}</h2>
            
            </li>
          ))}
        </ul>
      )}

      {info.meta &&(

        <Pagination 
          limit={LIMIT} 
          total={info.meta.count} 
          offset={offset}
          setOffset={setOffset}
        />
      )}
      
    </div>
  );
}

export default App;

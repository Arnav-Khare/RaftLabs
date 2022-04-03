import './App.css';
import React, { useState,useEffect } from 'react';
import {ModalContainer} from './Components/Modal';
import axios from 'axios';

function App() {
  const [searchField, setSearchField] = useState("");
  const [searchBy,setSearchBy] = useState(true)   //True means searching by isbn number and false means searching by author name
  const [modal,setModal] = useState(false)
  const [library,setLibrary] = useState({})
  useEffect(() =>{

  const fetchData = async()=>{
         const res =  await axios.get('https://ddfsdfsdsaddad.herokuapp.com/getAllBooks')
         setLibrary(res.data)
         console.log(res)
  }
  fetchData();
  },[]);
  return (

    <div className="App">
      <nav class="nav-bar">
        <div class="nav1">
            <i href=""
            onClick={(e)=>{
              setSearchBy(!searchBy)
            }}
            >{(searchBy ? "Search By ISBN": "Search By Author Name")}</i>
            <input type="text" id="search_book" placeholder="Search " 
               onChange={(e)=>{
                setSearchField(e.target.value)}}
            />
        </div>
        <h3>readbooks</h3>
        <div class="icon-about">
            <i class="material-icons">
              <span class="material-icons-outlined"  
                 onClick={()=>{setModal(!modal)}}
                >
                  Add new Documnet
               </span></i>

            <a href="">About-Us</a>
        </div>

    </nav>

    <main>
    {
      Object.keys(library).map(function(keyname,index){
        if(searchField === ""){
          return (   
            <div class="books">
            <div>
                <img src="https://images-na.ssl-images-amazon.com/images/I/718ReYbwlFL.jpg" alt="" class="book-img"/>
            </div>
            <div class="descp">
                <h2 class="book-name">{library[keyname].document.title}</h2>
                <h3 class="author">Written By:</h3>
                {library[keyname].authors.map((e)=>(
                  <h3 class="author">{e}</h3>
                ))}
                <p class="info">
                {(library[keyname].category === 'B') ? library[keyname].document.description.substring(0,83) : library[keyname].document.publishedAt}
                    
                </p>
                {(library[keyname].category === 'B') ? <button type="submit">See the Book</button> : <button type="submit">See the Magazine</button>}
                
            </div>
        </div>
        )
          }
        else if(searchBy && library[keyname].document.isbn.includes(searchField)){
          return (
            <div class="books">
            <div>
                <img src="https://images-na.ssl-images-amazon.com/images/I/718ReYbwlFL.jpg" alt="" class="book-img"/>
            </div>
            <div class="descp">
                <h2 class="book-name">{library[keyname].document.title}</h2>
                <h3 class="author">Written By:</h3>
                {library[keyname].authors.map((e)=>(
                  <h3 class="author">{e}</h3>
                ))}
                <p class="info">
                {(library[keyname].category === 'B') ? library[keyname].document.description.substring(0,83) : library[keyname].document.publishedAt}
                    
                </p>
                {(library[keyname].category === 'B') ? <button type="submit">See the Book</button> : <button type="submit">See the Magazine</button>}
                
            </div>
        </div>
          )
        }else if(!searchBy){
              
          {
            return(
            library[keyname].authors
                .filter(e => e.toLowerCase().includes(searchField.toLowerCase()))
                .map(e => 
                  <div class="books">
                  <div>
                      <img src="https://images-na.ssl-images-amazon.com/images/I/718ReYbwlFL.jpg" alt="" class="book-img"/>
                  </div>
                  <div class="descp">
                      <h2 class="book-name">{library[keyname].document.title}</h2>
                      <h3 class="author">Written By:</h3>
                      {library[keyname].authors.map((e)=>(
                        <h3 class="author">{e}</h3>
                      ))}
                      <p class="info">
                      {(library[keyname].category === 'B') ? library[keyname].document.description.substring(0,83) : library[keyname].document.publishedAt}
                          
                      </p>
                      {(library[keyname].category === 'B') ? <button type="submit">See the Book</button> : <button type="submit">See the Magazine</button>}
                      
                  </div>
              </div>
                )
            )
          }
    
         }
        }
      )}
    </main>
    {true && <ModalContainer modal = {modal}/>}
    </div>
  );
}

export default App;



// return(
//   if(e.toLowerCase().includes(searchField.toLowerCase())){

//     return(<h1>sdsdsdsd</h1>)
//     return (

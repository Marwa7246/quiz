import React, {useState} from 'react';

import Version1 from './Version1'

import Version2 from './Version2'

import './App.css';

function App() {

const [version, setVersion] =useState('');

  return (
    <div>

    <h1>Quiz App</h1>

		<div className='app'>
      <button className="version-selection" onClick={()=> setVersion("version1")} >Version 1</button>

      <button  className="version-selection"  onClick={()=> setVersion("version2")} >Version 2</button>		

      </div>

      {version === "version1" && <Version1/>}
      {version === "version2" && <Version2/>}




    </div>
    

	);
}

export default App;

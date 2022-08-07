import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomePageStyle.css';

function HomePage() {
  const goTo = useNavigate();
  const [userName, setUserName] = useState('');

  console.log('renderizou');
  console.log(userName);

  return(
    <div className="principal-container">
      <h4>Buscar Repositório no github</h4>
      <div className="search-container">
        <label htmlFor="github-input">
          <input
            className="search-box"
            placeholder="digite o nome do usuário"
            value={ userName }
            onChange={ (e) => setUserName(e.target.value) }
            type="text"
            name="github-user"
            id="github-input"
          />
        </label>
        <button
            className="search-button"
            onClick={ () => goTo(`/${userName}`) }
            type="button"
          >
          🔍 Buscar
        </button>
      </div>
    </div>
  );
}
export default HomePage;
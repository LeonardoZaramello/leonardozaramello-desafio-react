import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomePageStyle.css';
import axios from 'axios';

function HomePage() {
  const goTo = useNavigate();
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  console.log('renderizou');
  console.log(userName);

  const checkInputSearch = async () => {
    if(userName.length > 0) {
      setErrorMessage('');
      const exist = await axios.get(`https://api.github.com/users/${userName}`);
      console.log(exist);
      if(exist.data.name) {
        goTo(`/${userName}`);
      } else {
        setErrorMessage('Usuário não encontrado no github. Verifique se você digitou o nome corretamente');
      }
    }

    setErrorMessage('informe um nome de usuário válido do github');
    return null;
  }

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
            onClick={ () => checkInputSearch() }
            type="button"
          >
          🔍 Buscar
        </button>
      </div>
      <h6 style={{marginTop: "20px"}}>{errorMessage}</h6>
    </div>
  );
}
export default HomePage;
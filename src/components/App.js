import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation, matchPath } from 'react-router';
import getDataApi from '../services/api';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import imgHeader from '../images/rick-y-morty.jpg';
import imgLogo from '../images/logo.png';
import localS from '../services/localStorage';
import Filters from './Filters';
import { Link } from 'react-router-dom';
import imgError404 from '../images/404.jpg';
import '../styles/App.scss';

function App() {
  const [charactersList, setCharactersList] = useState(
    localS.get('characters', [])
  );

  //1-Fetch y localS
  useEffect(() => {
    if (localS.get('characters', null) === null) {
      getDataApi().then((cleanData) => {
        setCharactersList(cleanData);
        localS.set('characters', cleanData);
      });
    }
  }, []);

  //variables estado para filtro
  const [searchName, setSearchName] = useState('');
  const [searchSpecie, setSearchSpecie] = useState('');

  //function handlefilter
  const handleFilter = (varName, varValue) => {
    if (varName === 'name') {
      setSearchName(varValue);
    } else if (varName === 'species') {
      setSearchSpecie(varValue);
    }
  };

  const filteredCharacters = charactersList
    .filter((eachCard) =>
      eachCard.name.toLowerCase().includes(searchName.toLowerCase())
    )
    .filter((eachCard) =>
      eachCard.species.toLowerCase().includes(searchSpecie.toLowerCase())
    );

  //obtener información del personaje
  const { pathname } = useLocation();

  const routeData = matchPath('/character/:characterId', pathname);

  const characterId = routeData !== null ? routeData.params.characterId : '';

  const characterData = charactersList.find(
    (character) => character.id === parseInt(characterId)
  );

  //html
  return (
    <div>
      <header className='header'>
        <img className='header__img' src={imgHeader} alt='' />
        <a
          className='header__link'
          href='https://en.wikipedia.org/wiki/Rick_and_Morty'
        >
          <p className='header__link--title'>Rick and Morty</p>
        </a>
      </header>
      <main>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Filters
                  searchName={searchName}
                  searchSpecie={searchSpecie}
                  handleFilter={handleFilter}
                  filteredCharacters={filteredCharacters}
                />
                <CharacterList charactersList={filteredCharacters} />
              </>
            }
          />
          <Route
            path='/character/:characterId'
            element={<CharacterDetail characterData={characterData} />}
          />
          <Route
            path='*'
            element={
              <div className='divErrorPage'>
                <img className='imgError404' src={imgError404} alt='' />
                <p className='divErrorPage__text'>
                  "Lo sentimos, esta página no existe"
                </p>
                <Link to='/' className='divReturn__text'>
                  Volver
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className='footer'>
        <a className='footer__link' href='https://github.com/Giselle-97'>
          {' '}
          <img className='footer__link--img' src={imgLogo} alt='' />
        </a>

        <a href='https://adalab.es/' className='footer__text'>
          Adalab &copy;2023
        </a>
      </footer>
    </div>
  );
}
export default App;

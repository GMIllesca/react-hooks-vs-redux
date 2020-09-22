
import React, { useState, useEffect } from 'react'
import LoginUseState from './components/loginUseState'
import LoginUseReducer from './components/loginUseReducer'
import LoginUseReducerImmer from './components/loginUseReducerImmer'
import LoginWithContext from './components/loginWithContext'
import LoginUseReducerTypeScript from './components/loginUseReducerTypeScript'
// import logo from './logo.svg';
import './App.css'

function useLocationHash() {
  const [hash, setHash] = useState(window.location.hash);
  function onHashChange() {
    setHash(window.location.hash)
  }
  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return hash
}

function useSimpleHashRouter(routes) {
  const hash = useLocationHash();
  // Exclude '#' when calculating hash.
  const currentRoute = routes[hash.substr(1)]
  if (currentRoute) {
    return currentRoute
  }
  return null
}

function App() {

  const CurrentRoute = useSimpleHashRouter({
    useState: LoginUseState,
    useReducer: LoginUseReducer,
    useReducerImmer: LoginUseReducerImmer,
    withContext: LoginWithContext,
    useReducerTypeScript: LoginUseReducerTypeScript,
  })

  return (
    <>
      {!CurrentRoute && (
        <div className='App App-Column'>
          <a href='#useState'>useState</a>
          <br />
          <br />
          <a href='#useReducer'>useReducer</a>
          <br />
          <br />
          <a href='#useReducerImmer'>useReducerImmer</a>
          <br />
          <br />
          <a href='#withContext'>LoginWithContext</a>
          <br />
          <br />
          <a href='#useReducerTypeScript'>LoginUseReducerTypeScript</a>
        </div>
      )}
      {CurrentRoute && <div>
        <a href='#' ><span role="img">&#128540;</span></a>
        <br />
        <CurrentRoute />
        </div>}
    </>
  );
}

export default App;

import React from 'react';
import {useRoutes} from 'hookrouter';
import './styles/App.css';
import routes from './hooks/Routes';
import Update from './Update';

const App = () => {
  const routeResult = useRoutes(routes);

  return (
      <div className="App">
        <Update/>
        {routeResult}
      </div>
  )
  ;
};
export default App;

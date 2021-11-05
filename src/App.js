import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import FirstPage from './components/FirstPage';
import Footer from './components/Footer';
import WorldBeerHistory from './components/WorldBeerHistory';
import Create from './components/Create'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Article from './components/Article';
import { saveState } from './localStorage';

const store = configureStore();


//sprawdzic to czy przydatne?
store.subscribe(() => {
  saveState({
    data :store.getState().entities.beers,
  });
});




function App() {


  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <FirstPage />
          </Route>
          <Route path='/swiat'>
            <WorldBeerHistory/>
          </Route>
          <Route path='/polska'>
            <WorldBeerHistory/>
          </Route>
          <Route path='/zaponianestyle'>
            <WorldBeerHistory/>
          </Route>
          <Route path='/opuszczonebrowary'>
            <WorldBeerHistory/>
          </Route>
          <Route path='/create'>
            <Create/>
          </Route>
          <Route path='/article/:id'>
            <Article/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </Provider>
  );
}

export default App;

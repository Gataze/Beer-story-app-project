import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import FirstPage from './components/FirstPage';
import Footer from './components/Footer';
import WorldBeerHistory from './components/WorldBeerHistory';
import Create from './components/Create'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import ArticleControllers from './components/ArticleControllers';
import UserPage from './components/UserPage';


const store = configureStore();




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
            <ArticleControllers/>
          </Route>
          <Route path='/użytkownik/:nazwa'>
            <UserPage/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </Provider>
  );
}

export default App;

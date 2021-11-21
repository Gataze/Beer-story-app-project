import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import FirstPage from './components/FirstPage';
import Footer from './components/Footer';
import ArticlesGroupList from './components/ArticlesList';
import Create from './components/Create'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import ArticleControllers from './components/ArticleControllers';
import UserPage from './components/UserPage';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'


const store = configureStore();
let persistor = persistStore(store);

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <FirstPage />
          </Route>
          <Route path='/articles/:group'>
            <ArticlesGroupList/>
          </Route>
          <Route path='/articles/:group'>
            <ArticlesGroupList/>
          </Route>
          <Route path='/articles/:group'>
            <ArticlesGroupList/>
          </Route>
          <Route path='/articles/:group'>
            <ArticlesGroupList/>
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
      </PersistGate>
    </Provider>
  );
}

export default App;

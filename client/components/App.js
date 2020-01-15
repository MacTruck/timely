import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import { Consumer } from './Context';

import '../App.css';

import Header from './Header';
import StartScreen from './StartScreen';
// import Login from './Login';
import TimerScreen from './TimerScreen';
import EntryScreen from './EntryScreen';
import NotFound from './NotFound';
import Footer from './Footer';

let login = "Log In";

const App = () => (
     <BrowserRouter>
        <Consumer>
            { context => (
                <div className="container">
                    <Header login={ login } />
                    <Switch>
                        <Route exact path="/" component={StartScreen} />
    {/*
                        <Route path="/login" component={Login} />
    */}
                        <Route path="/timer" component={TimerScreen} />
                        <Route path="/entries/:id" component={EntryScreen} />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer />
                </div>
            )}
        </Consumer>
    </BrowserRouter>  
);

export default App;
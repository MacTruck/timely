import React from 'react';

import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import StartButton from './components/StartButton.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <h1>This is from App</h1>
      <Login />
      <StartButton />
      <Footer />
    </React.Fragment>
  );
}

export default App;
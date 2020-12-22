import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
import { useStateValue } from './StateProvider';
import Response from './Response'

function App() {
  const[{user},dispatch] = useStateValue();
    return (
      <>
      <Response/>
    <div className="app">
    {!user ? (<Login/>): ( 
     <div className="app__body">
     <Router>
     <Sidebar/>
       <Switch>
       <Route path="/rooms/:roomId">
          <Chat/>
       </Route>
       <Route path="/">
         <Chat/>
       </Route>
       </Switch>
     </Router>
     </div>
    )}
    </div>
    </>
  );
}

export default App;

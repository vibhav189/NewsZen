import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";


const App =()=> {
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Switch>
          <Route exact  path="/"><News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={6} country="in" category="general" title="NewsZen: Top Headlines"/></Route>
          <Route exact path="/bussiness"><News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={6} country="in" category="business" title="Business"/></Route>
          <Route exact path="/entertaintment"><News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={6} country="in" category="entertainment" title="Entertainment"/></Route>
          <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={6} country="in" category="health" title="Health"/></Route>
          <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={6} country="in" category="science" title="Science"/></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={6} country="in" category="sports" title="Sports"/></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={6} country="in" category="technology" title="Technology"/></Route>
        </Switch>
        </Router>
      </div>
    )
  
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Intro from './pages/Intro';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Sell from './pages/Sell';
import Marketplace from './pages/Marketplace';
import AddCourse from './components/AddCourse';
import MyTeeTimes from './pages/MyTeeTimes';

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Intro} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/home" component={Home} />
                <Route path="/sell" component={Sell} />
                <Route path="/marketplace" component={Marketplace} />
                <Route path="/add_course" component={AddCourse} />
                <Route path="/my_tee_times" component={MyTeeTimes} />
            </Switch>
        </Router>
    );
};

export default App;

import React from "react";
import Homepage from "../pages/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieDetails from "../pages/MovieDetails";
import Header from "../components/Header";
import SearchPage from "../pages/SearchPage";
import MovieList from "../pages/MovieList";
import ErrorPage from "../components/ErrorPage";
import "./style/style.css";
import MovieEndpoint from "../pages/MovieEndpoint";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/search" exact component={SearchPage} />
        <Route path="/:endpoint" exact component={MovieEndpoint} />
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/movies/:genre" component={MovieList} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
};
export default App;

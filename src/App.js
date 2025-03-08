import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import FairReportingPolicy from './pages/FairReportingPolicy';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-use" component={TermsOfUse} />
          <Route path="/fair-reporting-policy" component={FairReportingPolicy} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
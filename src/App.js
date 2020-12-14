import React from 'react'; 
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import Features from './components/Features/Features.js';
import Footer from './components/Footer/Footer.js';
import Calendar from './components/Calendar/Calendar.js';
import Details from './components/Details/Details.js';
import FetchData from './service/FetchData.js';
import './style.css';

class App extends React.Component {

  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
  };

  componentDidMount() {
    this.updateRocket();
  };

  updateRocket() {
    this.fetchData.getRocket()
    .then(data => {
      this.setState({ rockets: data.map(item => item.name) });
      return data
    })
    .then(data => data.find(item => item.name === this.state.rocket))
    .then(rocketFeatures => {
      this.setState({ rocketFeatures });
    });
  };

  changeRocket = rocket => {
    this.setState({
      rocket
    }, this.updateRocket);
  };

  render() {
    return (
      <>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
        <Main rocket={this.state.rocket}/>
        <Features/>
        <Footer/>
        {/* <Calendar/> */}
        {/* <Details/> */}
      </>
    );
  }
}

export default App;

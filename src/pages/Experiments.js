import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter, Link } from 'react-router-dom';

import HomeHeader from '../components/HomeHeader';
import { ChartDetails } from '../components/ChartDetails';

import { IconContext } from "react-icons";
import { FaArrowLeft } from 'react-icons/fa';

import { getChartById } from "../redux/selectors";
import { loadChartById } from "../redux/actions";

class Experiments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentDidMount() {
    this.props.loadChartById(this.props.match.params.chartId)
  }


  handleNavHome = () => {
    console.log()
    this.props.history.push(`/charts/${this.props.match.params.chartId}`);
  }

  renderCharts = () => {
    let i=0;
    let logo = this.props.chart.spec.icons[0].link;
    let displayName = this.props.chart.spec.displayName;
    let experimentName = this.props.match.params.experimentID;
    let experiment = this.props.chart.experiments.filter(function(experiment) {    
      if(experiment.metadata.name === experimentName){
       return experiment;}
    });

   let showexperiment = experiment.map(chart => <ChartDetails key={i++} install_button_text="INSTALL EXPERIMENT" charts={chart} displayName={displayName}  name={chart.spec.displayName} isCollapsed={false} logo={logo} />)
    return (
      [...showexperiment]
    )

  }

  render() {
    let icon = ""
    if(this.props.chart && this.props.chart.spec) {
      icon = this.props.chart.spec.icons[0].link
    }
    if(!this.props.chart.spec){
      return (
        <div></div>
      )
    }


    let experimentName = this.props.match.params.experimentID
    let experiment = this.props.chart.experiments.filter(function(experiment) {    
      if(experiment.metadata.name === experimentName){
       return experiment;}
    });
    return (
      <div className="chart-page-container">
        <HomeHeader
        showHomeText={false}
        icon={icon}
        title={this.props.chart.spec.displayName}
        />  
        <div className="chart-page-content">
          <div className="chart-page-header">
            <div className="chart-page-nav-back-container">
              <div className="nav-back-icon-container" onClick={this.handleNavHome}>
                  <IconContext.Provider value={{ color: "#004ED6", size: '0.7em'}}>
                      <FaArrowLeft />
                  </IconContext.Provider>
              </div>
              <div className="chart-page-title-container">
                <h3 className="chart-page-title">{experiment[0].spec.displayName}</h3>
              </div>
            </div>
            <div className="chart-page-header-breacrumbs-container">
              <div className="breadcrumbs">
                <Link to={`/charts/${this.props.chart.metadata.name}`}><span className="breadcrumb-text">Home </span> > <span className="breadcrumb-text">{this.props.chart.spec.displayName}</span></Link> > <span className="breadcrumb-text">{experiment[0].spec.displayName}</span>
              </div>
              <div className="chart-header-filters-container">
              </div>
            </div>
          </div>
          {this.renderCharts()}
        </div>
      </div>
    );
  }
}


Experiments.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    chart: getChartById(state, ownProps.match.params.chartId)
  }
};

const mapDispatchToProps = {
  loadChartById
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Experiments));

import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import {blue500, red500, greenA200, blue200, lightBlue900} from 'material-ui/styles/colors';
import Board from '../board';
import Dashboard from '../dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAll } from '../../actions';

import './index.css';

const iconStyles = {
  'background-color': 'rgb(0, 188, 212)',
  'color': '#ffffff',
  'cursor': 'pointer',
  'font-size': '38px',
  'display': 'inline',
  'height': '25px !important',
  'padding': '30px',
  'top': '6px',
  'width': '20%'
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle = () => this.setState({
    open: !this.state.open
  });

  handleClose = () => this.setState({
    open: false
  });

  render() {
    return (
      <BrowserRouter>
        <div className="app-container">
        <h2 className='app-title'>
          <FontIcon className="material-icons" 
          style={ iconStyles }
          onClick={ this.handleToggle }>home</FontIcon>
        Trello Kanban Board</h2>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        <a className='menu-link' href='/'>
          <MenuItem className="menu-item" color='rgb(0, 188, 212)'>Boards</MenuItem>
          </a>
        </Drawer>
          <Switch>
            <Route exact path='/' component={() => <Dashboard { ...this.props } />}/>
            <Route path='/board/:id' component={ (props) => {
                console.log('route', props, this.props.boards.filter(({ _id }) => _id === props.match.params.id)[0]);
                return <Board { ...this.props.boards.filter(({ _id }) => _id === props.match.params.id)[0] } />;
              }
            } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const {
    boards = []
  } = state;

  return {
      boards
  };
};

fetchAll();

export default connect(mapStateToProps)(App);

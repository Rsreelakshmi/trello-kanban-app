import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Card, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {grey500} from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { createBoard, deleteBoard } from '../../actions';
import './index.css';

const styles = {
	paperStyle: {
		padding: '0 1em'
	}
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      listInput: ''
    }
  }

  handleModal = () => {
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  }

  addBoard = () => {
    this.toggleModal();
    createBoard(this.state.listInput);
  }

  deleteBoard = (name) => {
    deleteBoard(name);
  }

  handleInput = (e) => {
    this.setState({ listInput: e.target.value });
  }

  render() {
    const { listInput, showModal } = this.state;
    const { boards } = this.props;

    return (
      <div className="board-container">
      <h2>Boards</h2>
        {
          boards.length > 0 &&
          boards.map(({ name, _id }) => <Card className='board-item' key={ _id } style={ { 'border-radius': '0', 'margin-bottom': '20px', 'width': '25%' } } >
                                          <Link to={`/board/${ _id }`}><CardText style={ { width: '70%', float: 'left' } }>{ name }</CardText></Link>
                                          <IconButton style={ { float: 'right', padding: 12 } } onClick={ () => this.deleteBoard(name) } tooltip='Delete Board'>
                                            <FontIcon className="material-icons" color={grey500}>delete</FontIcon>
                                          </IconButton>
                                          <div className="clearfix"></div>
                                        </Card> )
        }
        <FloatingActionButton
          style={ { position: 'absolute', right: '50px', bottom: '50px' } }
          onClick={ this.handleModal }>
            <ContentAdd />
        </FloatingActionButton>
        <Dialog
          modal={ true }
          open={ showModal }
          actions={ [ <RaisedButton primary label='ADD' onClick={ this.addBoard } /> ] }
          title={ 'Add Board' }>
            <div>
              <TextField
                fullWidth
                value={ listInput }
                onChange={ this.handleInput } />              
            </div>
        </Dialog>
      </div>
    );
  }
}

export default Dashboard;
import React, { Component, Fragment } from 'react';
import AppBar from 'material-ui/AppBar';
import Task from '../task';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import { createTask, deleteTask, deleteList } from '../../actions';
import './index.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      tasks: props.tasks,
      taskInput: ''
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ tasks: newProps.tasks });
  }

  handleModal = () => {
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState((prev) => ({ showModal: !prev.showModal }));
  }

  handleInput = (e) => {
    this.setState({ taskInput: e.target.value });
  }

  addTask = () => {
    this.toggleModal();
    createTask(this.props.boardName, this.props.name, this.state.taskInput);
  }

  delList = () => {
    deleteList(this.props.boardName, this.props.name);
  }

  render() {
    const { showModal, taskInput, tasks } = this.state;
    const { name } = this.props;

    return (
      <Fragment>
        <section className="list-container">
          <header>
            { name }
            <FontIcon className="material-icons close" style={ { 'color': '#00bcd4', 'cursor': 'pointer', 'float':'right'} }
            onClick={ this.delList }>close</FontIcon>
          </header>
          <Card className="list-content">
            {
              tasks.length > 0 &&
              tasks.map(card => <Task handleUpdate= {() => { this.showModal }} boardName={ this.props.boardName } listName={this.props.name} key={ card._id || Math.random() } { ...card } />)
            }
          </Card>
          <RaisedButton className='add-btn' fullWidth primary label='+ ADD CARD' onClick={ this.handleModal } />
        </section>
        <Dialog
          modal={ true }
          open={ showModal }
          actions={ [ <RaisedButton primary label='ADD' onClick={ this.addTask } /> ] }
          title={ `Add Card for ${ name }` }>
            <TextField
              fullWidth
              value={ taskInput }
              onChange={ this.handleInput } />
        </Dialog>
      </Fragment>
    );
  }
}

export default List;
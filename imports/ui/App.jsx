import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Task from './Task.jsx';
import { Tasks } from '../../collections/collections.js';
import { Url } from '../api/currentTime.js';


class App extends Component {
  constructor(props,context) {
      super(props,context);
      this.changeName = this.changeName.bind(this);
      this.state = {
        name: 'init',
        hideCompleted: false,
        url: 'http://o9e688083.bkt.clouddn.com/',
      };
  }

  handleSubmit(event) {
      event.preventDefault();
      const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
      Meteor.call('tasks.insert', text);
      ReactDOM.findDOMNode(this.refs.textInput).value='';
  }

  toggleHideCompleted() {
      this.setState({
          hideCompleted: !this.state.hideCompleted
      });
  }

  renderTasks() {
      let filteredTasks = this.props.tasks;
      if(this.state.hideCompleted) {
          filteredTasks = filteredTasks.filter(task => !task.checked);
      }

      return filteredTasks.map((task) => {

          const currentUserId = this.props.currentUser && this.props.currentUser._id;
          const showPrivateButton = task.owner === currentUserId;

         return (<Task key={task._id} task={task} showPrivateButton={showPrivateButton} />);
       });
  }

  changeName() {

      this.setState({ name: window.localStorage.store });
      return this.state.name;
  }

  render() {


    return (
        <div className="container">
            <header>
                <h1>Todo List ({this.props.incompleteCount})</h1>

                <label className="hide-completed">
                    <input
                        type="checkbox"
                        readOnly
                        checked={this.state.hideCompleted}
                        onClick={this.toggleHideCompleted.bind(this)}
                    />
                    Hide Completed Tasks
                </label>

                { this.props.currentUser ?
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <input type="text" ref="textInput" placeholder="Type to add new tasks"/>
                    </form> : ''
                }

            </header>

            <p>{this.state.url + this.props.time.url} </p>

            <img height="300px" width="300px" src={this.state.url + this.props.time.url} />
            
            <ul>
                {this.renderTasks()}
            </ul>
        </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
  time: PropTypes.object,
};

export default createContainer(() => {

    Meteor.subscribe('tasks');
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
        time: Url.findOne({id:'addr'})
    };
}, App);

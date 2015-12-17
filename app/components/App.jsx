import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes';
import NoteStore from '../stores/NoteStore';
import NoteActions from '../actions/NoteActions.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = NoteStore.getState();

  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  };

  storeChanged = (state) => {
    this.setState(state);
  }

  render() {
    const notes = this.state.notes;

    return(
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes items={notes} onEdit={this.editNote} onDelete={this.deleteNote} />
      </div>
    );
  }

  editNote = (id, task) => {
    NoteActions.update({id, task}); // Hmmmm
  }

  addNote = () => {
    NoteActions.create({task: 'New task'});
  }

  deleteNote = (id) => {
    NoteActions.delete(id);
  }


}

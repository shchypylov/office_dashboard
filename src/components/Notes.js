import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote, renderNotes, editNote } from "../actions";
import cookie from "react-cookies";
import RaisedButton from "material-ui/RaisedButton";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import { List, ListItem } from "material-ui/List";
import EditorModeEdit from "material-ui/svg-icons/editor/mode-edit";

const renderField = ({ input, label, type, floatingLabelText }) => (
  <div className="row">
    <div className="input-field col s12">
      <TextField
        {...input}
        floatingLabelText={floatingLabelText}
        placeholder={label}
        type={type}
      />
    </div>
  </div>
);

let NotesForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-wrap">
        <Field
          name="note"
          floatingLabelText="New note"
          component={renderField}
          type="text"
        />
      </div>

      <div
        className="input-wrap"
        style={{
          marginTop: "20px"
        }}
      >
        <RaisedButton label="Submit" primary={true} type="submit" />
      </div>
    </form>
  );
};

let ChangedNote = props => {
  const { handleSubmit } = props;
  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "30px" }}
      className="change-form"
    >
      <div className="input-wrap">
        <Field
          name="changed_note"
          floatingLabelText="New note data"
          component={renderField}
          type="text"
        />
      </div>

      <div
        className="input-wrap"
        style={{
          marginTop: "10px"
        }}
      >
        <RaisedButton label="Save" primary={true} type="submit" />
      </div>
    </form>
  );
};

class Notes extends Component {
  state = {
    text: "",
    changedText: "",
    user: cookie.load("userID") || "guest",
    edition: false,
    changedKey: ""
  };

  componentDidMount() {
    console.log(this.state.user);
    this.props.renderNotes(this.state.user);
  }

  submit = props => {
    let users = this.props.users;
    let login = this.state.user;
    this.setState({ text: "" });
    Object.keys(users).map(element => {
      if (login === users[element].login) {
        this.props.addNote(element, { text: props.note });
      }
    });
  };

  edit = key => {
    this.setState({
      edition: !this.state.edition,
      changedKey: key
    });
  };
  submitSaveNote = val => {
    let { changedKey } = this.state;
    let changedText = val.changed_note;
    let users = this.props.users;
    let user = this.state.user;
    this.setState({
      changedText: "",
      edition: !this.state.edition
    });

    Object.keys(users).map(element => {
      if (user === users[element].login) {
        this.props.editNote(changedText, changedKey, element);
      }
    });
  };

  render() {
    let notes = this.props.notes;
    let content = notes ? (
      Object.keys(notes).map(element => {
        return (
          <div
            className="note"
            key={element}
            onClick={() => this.edit(element)}
          >
            <ListItem rightIcon={<EditorModeEdit />} className="note">
              {notes[element].text}
            </ListItem>
          </div>
        );
      })
    ) : (
      <div>Loading...</div>
    );

    return (
      <div>
        <h1>Add some memos here:</h1>
        <NotesForm onSubmit={this.submit} />
        <h1
          style={{
            marginTop: "20px"
          }}
        >
          Your notes:
        </h1>
        {this.state.edition && <ChangedNote onSubmit={this.submitSaveNote} />}
        <List className="notes">{content}</List>
      </div>
    );
  }
}

NotesForm = reduxForm({ form: "notesForm" })(NotesForm);

ChangedNote = reduxForm({ form: "changedNoteForm" })(ChangedNote);

const mapDispatchToProps = {
  addNote,
  renderNotes,
  editNote
};

export default connect(
  state => ({ users: state.users, notes: state.notes }),
  mapDispatchToProps
)(Notes);

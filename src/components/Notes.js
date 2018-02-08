import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote, renderNotes } from "../actions";
import cookie from "react-cookies";
import RaisedButton from "material-ui/RaisedButton";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";

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

      <div className="input-wrap">
        <RaisedButton label="Submit" primary={true} type="submit" />
      </div>
    </form>
  );
};

class Notes extends Component {
  state = {
    text: "",
    user: cookie.load("userID") || "guest"
  };

  renderNotesFunc = () => {
    let { users } = this.props;
    let user = this.state.user;
    this.props.renderNotes(user, users);
  };

  submit = props => {
    let users = this.props.users;
    let login = this.state.user;
    Object.keys(users).map(element => {
      if (login === users[element].login) {
        this.props.addNote(element, { text: props.note });
      }
    });
  };

  render() {
    // this.renderNotesFunc();

    return (
      <div>
        <h1>Add some memos here:</h1>
        <NotesForm onSubmit={this.submit} />
      </div>
    );
  }
}

NotesForm = reduxForm({
  form: "notesForm"
})(NotesForm);

const mapDispatchToProps = {
  addNote,
  renderNotes
};

export default connect(
  state => ({ users: state.users, notes: state.notes }),
  mapDispatchToProps
)(Notes);

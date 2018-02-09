import React, {Component} from "react";
import {connect} from "react-redux";
import {addNote, renderNotes, editNote} from "../actions";
import cookie from "react-cookies";
import RaisedButton from "material-ui/RaisedButton";
import {Field, reduxForm} from "redux-form";
import TextField from "material-ui/TextField";
import {List, ListItem} from 'material-ui/List';
import EditorModeEdit from "material-ui/svg-icons/editor/mode-edit"


const renderField = ({input, label, type, floatingLabelText}) => (
    <div className="row">
      <div className="input-field col s12">
        <TextField{...input} floatingLabelText={floatingLabelText} placeholder={label} type={type}/>
      </div>
    </div>
);

let NotesForm = props => {
  const {handleSubmit} = props;
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
          <RaisedButton label="Submit" primary={true} type="submit"/>
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
    this.props.renderNotes(this.state.user);
  }
  
  submit = props => {
    let users = this.props.users;
    let login = this.state.user;
    this.setState({
      text: ""
    });
    Object.keys(users).map(element => {
      if (login === users[element].login) {
        this.props.addNote(element, {text: props.note});
      }
    });
  };
  
  edit = (key) => {
    this.setState({
      edition: !this.state.edition,
      changedKey: key
    });
    
  };
  submitSaveNote = () => {
    let {changedText, changedKey} = this.state;
    let users = this.props.users;
    let user = this.state.user;
    this.setState({
      changedText: "",
      edition: !this.state.edition
    })
    
    Object.keys(users).map(element => {
      if (user === users[element].login) {
        this.props.editNote(changedText, changedKey, element)
      }
    });
  };
  
  render() {
    let notes = this.props.notes;
    let content = notes ? (
        Object.keys(notes).map(element => {
          return (
              <div className="note" key={element} onClick={() => this.edit(element)}>
                <ListItem rightIcon={<EditorModeEdit/>}
                          className="note">{notes[element].text}</ListItem>
              </div>
          )
        })
    ) : (
        <div>Loading...</div>
    );
    
    return (
        <div>
          <h1>Add some memos here:</h1>
          <NotesForm onSubmit={this.submit}/>
          <h1 style={{marginTop: "20px"}}>Your notes: </h1>
          {this.state.edition &&
          <div>
            <input type="text" value={this.state.changedText}
                   onChange={(e) => this.setState({changedText: e.target.value})}/>
            <button onClick={this.submitSaveNote}>Save</button>
          </div>
          }
          <List className="notes">{content}</List>
        </div>
    );
  }
}

NotesForm = reduxForm({
  form: "notesForm"
})(NotesForm);

const mapDispatchToProps = {
  addNote,
  renderNotes,
  editNote
};

export default connect(
    state => ({users: state.users, notes: state.notes}),
    mapDispatchToProps
)(Notes);

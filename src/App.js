import React, { Component } from 'react';
import Editor from './MyEditor';
import UploadForm from './UploadForm';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state={
    uploadedImage:""
  };

  uploadCallback(link){
    this.setState({'uploadedImage':link});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-editor">
          <Editor />
        </div>
        <div className="SideBar">
          <div className="LastUpload">
            <h3>Last Uploaded Image</h3>
            <img src={this.state.uploadedImage} />
          </div>
          <div className="sideBarUpload">
            <UploadForm  uploadCallback={ this.uploadCallback.bind(this) }/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

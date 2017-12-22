import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class MyEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }
    
    onEditorStateChange: Function = (editorState) => {
      this.setState({
        editorState,
      });
    };
    
    uploadCallback(file) {
      var reader = new window.FileReader();
      reader.onloadend= () => { 
        fetch('http://localhost:9090/image',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: file.name,
            data: reader.result,
          }),
        })
        .then((data)=>{
            console.log('Uploaded Data',data);
        });
      }
      reader.readAsDataURL(file);
    }

    render() {
      const { editorState } = this.state;
      const config={
        image: { uploadCallback: this.uploadCallback }
      }
      return (
          <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
              toolbar={ config }
           />
      );
    }
}

export default MyEditor;
import React, { Component } from 'react';
import { EditorState,AtomicBlockUtils } from 'draft-js';
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
    
    uploadCallback(file,callback) {
      return new Promise( (resolve, reject) => {
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
          .then((resp) => resp.json()) 
          .then((data)=>{
              console.log('Uploaded Data',data);
              const imageUrl='http://localhost:9090/image/'+data.name;
              resolve({data:{ link: imageUrl } });
          });
        }
        reader.readAsDataURL(file);
      });
    }

    insertImage(url) {
      console.log(this);
      const contentState = this.state.editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'image',
        'IMMUTABLE',
        { src: url },
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(
        contentState,
        { currentContent: contentStateWithEntity },
      );
      const state=AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
      this.setState({editorState:state});
    };
    
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
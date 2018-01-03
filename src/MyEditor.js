import React, { Component } from 'react';
import { EditorState,ContentBlock,genKey,AtomicBlockUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class MyEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }
    
    onEditorStateChange: Function = (editorState) => {
      console.log("State",editorState);
      this.setState({
        editorState,
      });
    };
    
    /**
     * Upload callback when an image is uploaded from the EDITOR'S BUILD IN UPLOADER.
     * @param {*} file 
     * @param {*} callback 
     */
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
          .then((data) => {
            console.log('Uploaded Data',data);
            const imageUrl='http://localhost:9090/image/'+data.name;
            resolve({data:{ link: imageUrl } });
          });
        }
        reader.readAsDataURL(file);
      });
    }

    /**
     * Insert Images form external resources.
     * @param {String} url The image's url to insert into the editor. 
     */
    insertImage: Function = (url) => {
      console.log("Inserting Image",this.__editor);
      const editorState = this.state.editorState;
      const entityData = { src:url, height: 300, width: 300, };
      const entityKey = editorState
      .getCurrentContent()
      .createEntity('IMAGE', 'MUTABLE', entityData)
      .getLastCreatedEntityKey();

      const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState,entityKey,' ',);

      this.onEditorStateChange(newEditorState);
    };
    
    render() {
      const { editorState } = this.state;
      const config={
        image: { uploadCallback: this.uploadCallback }
      };
      return (
          <Editor
              ref= { (editor) => { this.__editor=editor } }
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
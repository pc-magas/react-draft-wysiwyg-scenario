import React, { Component } from 'react';
import { EditorState, CompositeDecorator } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Link from './LinkDecorator';


class MyEditor extends Component {

    constructor(props){
      super(props);
      const compositeDecorator = new CompositeDecorator([Link]);
      this.state = {
        compositeDecorator,
        editorState: EditorState.createEmpty(compositeDecorator),
      };
    }
    
    onEditorStateChange: Function = (editorState) => {
      this.setState({editorState,});
    };
    
    render() {
      const { editorState } = this.state;
      return (
          <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
           />
      );
    }
}

export default MyEditor;
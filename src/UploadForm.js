import React, { Component } from 'react';

class UploadForm extends Component {
    
    state={
      lastImgUploaded:""
    };
    

    onChange(event){
        event.preventDefault();
        console.log("File Changed");
        
        const file=event.target.files[0];

        const reader = new window.FileReader();
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
              if(this.props.uploadCallback){ this.props.uploadCallback(imageUrl); }
              this.setState({'lastImgUploaded':imageUrl})
          });
        }
        
        reader.readAsDataURL(file);
    }

    render(){
       return (
       <div>
            <h3>Upload an image and set it into the editor</h3>
            <input type="file" onChange={ this.onChange.bind(this) } name="file"/>
        </div>);
    }
}

export default UploadForm;
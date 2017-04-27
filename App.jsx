import React from 'react';
import styles from './App.css';
const request = require('request');

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: "New result"
        };

        this.newValue = this.newValue.bind(this);
    }

    newValue(data){
        this.setState(data);
    }

    render(){
        return(
            <div>
                <Query/>
                <Display newValue={this.newValue}/>
            </div>
        );
    }
}

class Query extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let category = this.refs.category.value;
        let query = this.refs.queryText.value;

        let url = '';
        switch(category){
            case 'emailAddress':
                url = 'https://api.fullcontact.com/v2/person.html?email=' + query;
                break;
            case 'twitterHandle':
                url = 'https://api.fullcontact.com/v2/person.html?twitter=' + query;
                break;
            case 'phoneNumber':
                url = 'https://api.fullcontact.com/v2/person.html?phone=' + query;
                break;
        }

        const headers = {
             'X-FullContact-APIKey': '37c1e2a9d8493108'
        };

        let options = {
            url: url,
            headers: headers
        }

        let callback = (error, response, body) => {
            if(!error && response.statusCode == 200){
                this.props.newValue(body);
            }
        }

        request(options, callback);
    }

    render(){
        return(
            <div>
                <h3>Input Query here</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-8">
                            
                        
                       
                            <form onSubmit={this.handleSubmit}>
                                <select id="dropdown" ref="category">
                                    <option value="emailAddress">Email</option>
                                    <option value="twitterHandle">Twitter Handle</option>
                                    <option value="phoneNumber">Phone Number</option>
                                </select>
                                
                                <input type="text" ref="query" placeholder="Enter email | Twitter handle | phone number"/>
                                <button className="btn btn-primary">Find'em</button>
                            </form>
                        
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Display extends React.Component{
    render(){
        return(
            <div>
                {this.props.data}
            </div>
        );
    }
}


export default App;
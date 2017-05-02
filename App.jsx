import React from 'react';
import styles from './App.css';
const axios = require('axios');



class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: "Results will be displayed here ..."
        };

        this.newValue = this.newValue.bind(this);
    }

    newValue(data){
        
        this.setState({data: data});
    }

    render(){
        return(
            <div>
                <Query data={this.newValue}/>
                <Display newValue={this.state.data}/>
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
        let query = this.refs.query.value;

        //this.props.data(query + ' && ' + category);

        let url = '';
        switch(category){
            case 'emailAddress':
                url = 'https://api.fullcontact.com/v2/person.html?email=' + query + '&apiKey=37c1e2a9d8493108';
                break;
            case 'twitterHandle':
                url = 'https://api.fullcontact.com/v2/person.html?twitter=' + query + '&apiKey=37c1e2a9d8493108';
                break;
            case 'phoneNumber':
                url = 'https://api.fullcontact.com/v2/person.html?phone=' + query + '&apiKey=37c1e2a9d8493108';
                break;
        }

        axios.get(url)
            .then((resp) => {
                this.props.data(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render(){
        return(
            <div>       
                <form className="" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="dropdown">Select a category of contact</label>
                        <select id="dropdown" ref="category" className="form-control">
                            <option value="emailAddress">Email</option>
                            <option value="twitterHandle">Twitter Handle</option>
                            <option value="phoneNumber">Phone Number</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="input">Enter a contact to find</label>
                        <input type="text" ref="query" placeholder="Enter query item here" className="form-control" id="input"/>
                    </div>
                    <button className="btn btn-primary">Find'em</button>
                </form>
                <br/><hr/>    
            </div>
        );
    }
}

class Display extends React.Component{
    render(){
        return(
            <div>
                <div className="embed-responsive embed-responsive-4by3">
                    <iframe className="embed-responsive-item" srcDoc={this.props.newValue}></iframe>
                </div>
            </div>
        );
    }
}


export default App;
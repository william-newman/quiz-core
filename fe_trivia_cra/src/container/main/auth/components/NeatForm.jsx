import React, { Component } from 'react';

class NeatForm extends Component {
    constructor(props) {
        super(props);
        // Bind the functions
        this.sendInfo = this.sendInfo.bind(this);
        this.returnErrors = this.returnErrors.bind(this);
    }

    // Create object and dispatch object
    sendInfo(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const objectToSend = {
            username,
            password 
        };
        // eslint-disable-next-line no-console
        console.log(objectToSend); // Should log out the object with username and password
        // Dispatch the objectToSend here if valid
    }

    returnErrors(errorArr) {
        return errorArr;
    }

    render() {
        return ( 
            <div>
                <form onSubmit={this.sendInfo}>
                    <input type="text" name="username" placeholder="Enter your username" />
                    <br/>
                    <input type="password" name="password" placeholder="Enter your password" />
                    <br/>
                    <button type="submit">Enter the void!</button>
                </form>
                <div id="errors">{/* errors */}</div>
            </div>
        );
    }
}
 
export default NeatForm;

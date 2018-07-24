import React, { Component } from 'react';
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"

class AuthenticatedContent extends Component {

    render () {
        return (
            <Paper style={{display:"flex", justifyContent: "center", alignItems: "center", flexDirection:"column", padding: "3em"}}>
                <h1>
                    Hello, {this.props.currentUser.firstName}
                </h1>
                <br/>
                <Button variant="contained" onClick={this.props.onLogOut} >Log Out</Button>
            </Paper>
        )
    }
}

export default AuthenticatedContent;
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import LogInError from './LogInError';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


class LogIn extends React.Component {

    state = {
        email: "",
        password: ""
    }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.onLogIn({
      email: this.state.email,
      password: this.state.password      
    });
  }

  renderError = () => {
    if(this.props.error) {
      return <LogInError error={this.props.error}/>
    } else {
      return null
    }
  }

  render() {
    const { classes } = this.props;

    return (

      <div className='contain'>
        {this.renderError()}
        <form className={classes.container} noValidate autoComplete="off">
          {/* Email */}
          <TextField
            id="emailLogIn"
            label="Email Address"
            value={this.state.email}
            onChange={this.handleChange('email')}
            fullWidth
            margin="normal"
          />

          {/* Password */}
          <TextField
            id="passwordLogIn"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            type="password"
            fullWidth
            margin="normal"
          />

          <Button 
            variant="contained" 
            style={{width:"40%", marginLeft:"30%", marginTop: 14}} 
            onClick={(e) => this.handleSubmit(e)}>
              Log In
          </Button>
        </form>
      </div>
      
    );
  }
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
  onCreateAccount: PropTypes.func
};

export default withStyles(styles)(LogIn);
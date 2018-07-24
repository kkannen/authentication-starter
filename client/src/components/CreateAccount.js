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


class CreateAccount extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.onCreateAccount({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
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
      {/* First Name */}
        <TextField
          id="firstName"
          label="First Name"
          className={classes.textField}
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
          margin="normal"
        />

        {/* Last Name */}
        <TextField
          id="lastName"
          label="Last Name"
          className={classes.textField}
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
          margin="normal"
        />

        {/* Email */}
        <TextField
          id="emailCreateAccount"
          label="Email Address"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
        />

        {/* Phone */}
        <TextField
          id="phone"
          label="Phone Number"
          className={classes.textField}
          value={this.state.phone}
          onChange={this.handleChange('phone')}
          margin="normal"
        />

        {/* Password */}
        <TextField
          id="passwordCreateAccount"
          label="Password"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange('password')}
          type="password"
          margin="normal"
        />

        {/* Confirm Password */}
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          className={classes.textField}
          value={this.state.confirmPassword}
          onChange={this.handleChange('confirmPassword')}
          type="password"
          margin="normal"
        />
        <Button 
          variant="contained" 
          style={{width:"40%", marginLeft:"30%", marginTop: 14}} 
          onClick={(e)=>this.handleSubmit(e)}>
            Create Account
        </Button>
      </form>
      </div>
      
    );
  }
}

CreateAccount.propTypes = {
  classes: PropTypes.object.isRequired,
  onCreateAccount: PropTypes.func
};

export default withStyles(styles)(CreateAccount);
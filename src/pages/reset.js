import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
// Redux Stuff
import { connect } from 'react-redux';
import { resetPassword } from '../redux/actions/investActions';

const styles = {
    smallText: {
		color: "white",
		textAlign: "center",
        fontSize: "16px",
        margin: "0 32px"
	},

	cont: {
		margin: "16px",
	},

	boldType: {
		fontFamily: "CaptainHowdy",
		margin: "16px auto 32px auto !important",
		textAlign: "center !important",
		color: "white",
		letterSpacing: 4,
	},
	link: {
		color: "#3efd45",
		"&:hover": {
			color: "#870198",
		},
	},
	buttonText: {
		fontFamily: "CaptainHowdy",
		textDecoration: "none",
		letterSpacing: 4,
		fontSize: "1rem",
	},
	customError: {
		color: "red",
      fontSize: "0.8rem",
      marginTop: "10px"
	},
    customMessage: {
		color: "#3efd45",
      fontSize: "0.8rem",
      marginTop: "10px"
	}
}

class reset extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      loading: false
    };
  }
  
  handleSubmit = event => {
    event.preventDefault();
    // Save input to userData variable
    const userData = {
        email: this.state.email
    };
    this.props.resetPassword(userData, this.props.history)
    
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes, UI: { loading, errors, success } } = this.props;
    // const { errors, success } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm className={classes.cont}>
          <Typography variant="h4" className={classes.boldType}>
            <strong>RESET PASSWORD</strong>
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
          <TextField
              id="email"
              name="email"
              type="email"
              label="DOPI EMAIL ADDRESS"
              className={classes.textField}
              helperText={errors && errors.email ? errors.email : ""}
              error={errors && errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="email"
              fullWidth
            />
            <br/>
            {errors && errors.reset && (
              <Typography variant="body2" className={classes.customError}>
                {errors.reset}
              </Typography>
            )}
            {success && success.message && (
              <Typography variant="body2" className={classes.customMessage}>
                {success.message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              <strong className={classes.buttonText}>RESET PASSWORD</strong>
              {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>
            <br />
            <div className={classes.smallText}>
            <small>
            This feature is only available for current Darkly Obscured
								investigators. If you are an investigator but you do not yet have an
								account on this site you can create one{" "}
								<Link className={classes.link} to="/signup">
									here
								</Link>
								. 
								If you remembered your password you can login{" "}
                                <Link className={classes.link} to="/login">
									here
								</Link>
								. If, however, you are not a current Darkly Obscured investigator
								you will not have access to this portion of the site and should
								press back or explore the rest of the site{" "}
								<Link className={classes.link} to="/home">
									here
								</Link>
								.
            </small>
            </div>
            
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
};

reset.propTypes = {
  classes: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
  invest: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};
// Bring elements in from Global State and maps them to the Component State
const mapStateToProps = (state) => ({
    invest: state.invest,
    UI: state.UI
});
const mapActionsToProps = {
    resetPassword
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(reset));
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { connect } from "react-redux";
import { loginInvest } from "../redux/actions/investActions";

const styles = {
	smallText: {
		color: "white",
		textAlign: "center",
		fontSize: "16px",
		margin: "0 32px",
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
		marginTop: "10px",
	},
};

class login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			loading: false
		};
	}
	// componentDidUpdate(prevProps, prevState) {
	// 	if (prevProps.UI.errors !== this.props.UI.errors && this.props.UI.errors) {
	// 		this.setState({ errors: this.props.UI.errors });
	// 	}
	// 	if (prevState.errors !== this.state.errors) {
	// 		this.setState({ errors: this.state.errors });
	// 	}
	// }
	handleSubmit = (event) => {
		event.preventDefault();
		// Save input to investData variable
		const investData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginInvest(investData, this.props.history);
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	render() {
		const {
			classes,
			UI: { loading, errors },
		} = this.props;
		// const { errors } = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm className={classes.cont}>
					<Typography variant="h4" className={classes.boldType}>
						<strong> INVESTIGATOR LOGIN</strong>
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
							fullWidth
							autoComplete="email"
						/>
						<br />
						<br />
						<TextField
							id="password"
							name="password"
							type="password"
							label="PASSWORD"
							className={classes.textField}
							helperText={errors && errors.password ? errors.password : ""}
							error={errors && errors.password ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
							autoComplete="current-password"
						/>
						{errors && errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							disabled={loading}
						>
							<strong className={classes.buttonText}>LOGIN</strong>
							{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
						</Button>
						<br />
						<div className={classes.smallText}>
							<small>
								This feature is only available for current Darkly Obscured
								investigators. If you are an investigator but you do not yet
								have an account on this site you can create one{" "}
								<Link className={classes.link} to="/signup">
									here
								</Link>
								. If you forgot your password you can reset it with an email
								link by clicking{" "}
								<Link className={classes.link} to="/reset">
									here
								</Link>
								. If, however, you are not a current Darkly Obscured
								investigator you will not have access to this portion of the
								site and should press back or explore the rest of the site{" "}
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
}

login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginInvest: PropTypes.func.isRequired,
	invest: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

// Bring elements in from Global State and maps them to the Component State
const mapStateToProps = (state) => ({
	invest: state.invest,
	UI: state.UI,
});
const mapActionsToProps = {
	loginInvest,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(login));

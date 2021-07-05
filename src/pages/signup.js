import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { signupInvest } from "../redux/actions/investActions";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
	smallText: {
		color: "white",
		textAlign: "center",
		fontSize: "16px",
		margin: "0 16px",
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

class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			first: "",
			last: "",
			loading: false,
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true,
		});
		// Save input to newUserData variable
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			first: this.state.first,
			last: this.state.last,
		};
		this.props.signupInvest(newUserData, this.props.history);
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
				<Grid item sm>
					<Typography variant="h4" className={classes.boldType}>
						<strong>INVESTIGATOR SIGN UP</strong>
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
							autoComplete="new-password"
						/>
						<TextField
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							label="CONFIRM PASSWORD"
							className={classes.textField}
							helperText={errors && errors.confirmPassword ? errors.confirmPassword : ""}
							error={errors && errors.confirmPassword ? true : false}
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							fullWidth
							autoComplete="new-password"
						/>
						<span>
							<TextField
								id="first"
								name="first"
								type="name"
								label="FIRST NAME"
								className={classes.textField}
								helperText={errors && errors.first ? errors.first : ""}
								error={errors && errors.first ? true : false}
								value={this.state.first}
								onChange={this.handleChange}
								autoComplete="given-name"
							/>
							<TextField
								id="last"
								name="last"
								type="name"
								label="LAST NAME"
								className={classes.textField}
								helperText={errors && errors.last ? errors.last : ""}
								error={errors && errors.last ? true : false}
								value={this.state.last}
								onChange={this.handleChange}
								autoComplete="family-name"
							/>
						</span>
						<br />
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
							<strong className={classes.buttonText}>SIGN UP</strong>
							{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
						</Button>
						<br />
						<div className={classes.smallText}>
							<small>
								This feature is only available for current Darkly Obscured
								investigators. If you are an investigator but you already have
								an account on this site you can login{" "}
								<Link className={classes.link} to="/login">
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
signup.propTypes = {
	classes: PropTypes.object.isRequired,
	invest: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	signupInvest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	invest: state.invest,
	UI: state.UI,
});

export default connect(mapStateToProps, { signupInvest })(
	withStyles(styles)(signup)
);

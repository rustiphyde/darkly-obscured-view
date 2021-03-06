import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			authenticated === true ? (
				<Redirect to="/home" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

const mapStateToProps = (state) => ({
	authenticated: state.invest.authenticated,
});

AuthRoute.propTypes = {
	invest: PropTypes.object
};

export default connect(mapStateToProps)(AuthRoute);

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			userAuth === true ? (
				<Redirect to="/" />
			) : invAuth === true ? (
				<Redirect to="/" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

const mapStateToProps = (state) => ({
	userAuth: state.user.authenticated,
	invAuth: state.invest.authenticated,
});

AuthRoute.propTypes = {
	user: PropTypes.object,
	invest: PropTypes.object,
};

export default connect(mapStateToProps)(AuthRoute);

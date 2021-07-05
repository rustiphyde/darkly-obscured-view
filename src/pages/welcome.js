import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import WelcomeLogo from "../icons/WelcomeLogo";


import { Grid, Tooltip, Button } from "@material-ui/core";

import { connect } from "react-redux";

const styles = {
	button: {
		margin: "20px",
        padding: "16px",
		width: "300px",
		position: "relative",
	},
	welcomeTitle: {
        margin: "64px auto 64px auto",
        fontFamily: "CaptainHowdy",
        color: "white",
        letterSpacing: 6,
        fontSize: "4rem"

    },
    buttons: {
        textAlign: "center",
        margin: "0 auto"
    },
    buttonText: {
        fontFamily: "CaptainHowdy",
        textDecoration: "none",
        letterSpacing: 4,
        fontSize: "1rem"
    },
    linx: {
        margin: "20px",
        width: "300px",
    },
    img: {
        marginTop: "-64px !important",
        marginBottom: "64px !important"
    },
    // grid: {
    //     textAlign: "center"
    // }
};

class welcome extends Component {
	constructor() {
		super();
		this.state = {
			loading: false,
		};
	}

	render() {
		const {
			classes,
			UI: { loading },
		} = this.props;
		return (
			<Fragment>
				<Grid container className={classes.grid}>
                    
                        <br/>
                    <Grid item sm xs>
                        <hr/>
                        <h2 className="dopi"><em>D<span className="small-text">arkly</span> O<span className="small-text">bscured</span> P<span className="small-text">aranormal</span> I<span className="small-text">nvestigations</span></em></h2>
						<WelcomeLogo className={classes.logo}/>
						
                        <br/>
                            
							
							<Link to="/home" className={classes.linx}>
                            <Button
								type="button"
								variant="contained"
								color="primary"
								className={classes.button}
								disabled={loading}
							>
								<strong className={classes.buttonText}>EXPLORE</strong>
							</Button>
                            </Link>
                            <br/>
                            <span>
                                <strong className="or">OR</strong>
                            </span>
                            <br/>
                            <Tooltip title="INVESTIGATORS ONLY!" placement="top">
                            <Link to="/login" className={classes.linx}>
                            <Button
								type="button"
								variant="contained"
								color="primary"
								className={classes.button}
								disabled={loading}
							>
								<strong className={classes.buttonText}>LOGIN</strong>
							</Button>
                            </Link>
                            </Tooltip>
                            <br/>
                            <br/>
                            <hr/>
                            </Grid>
                            
                            
				</Grid>

			</Fragment>
		);
	}
}

welcome.propTypes = {
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	UI: state.UI,
});

export default connect(mapStateToProps, {})(withStyles(styles)(welcome));

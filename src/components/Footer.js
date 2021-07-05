import React, { Fragment, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import LogoutIcon from '../icons/LogoutIcon';
import DOButton from '../util/DOButton';
import { logoutInvest } from '../redux/actions/investActions';

class Footer extends Component {

    render() {

        const { authenticated } = this.props;

        let footerMarkup = authenticated ? (
            
                <div>
                <div className="footer-icons">
                    <DOButton onClick={this.props.logoutInvest} tip="LOGOUT" className="logout">
                    <LogoutIcon className="logout"/>

                    </DOButton>
                    
                    

                </div>
                </div>
                
        ) : (
            <div>
                <p className="socials">FOLLOW US</p>
                <div className="footer-icons">
                    
                    <br/>
                    <a href="https://facebook.com/darklyobscuredparanormal" rel="noopener noreferrer" target="_blank" ><FontAwesomeIcon icon={[ 'fab', 'facebook' ]} className="logo-icons"/></a>
                    <a href="https://twitter.com/DarklyObscured" rel="noopener noreferrer" target="_blank" ><FontAwesomeIcon icon={[ 'fab', 'twitter' ]} className="logo-icons"/></a>
                    <a href="https://www.instagram.com/darklyobscuredparanormal/" rel="noopener noreferrer" target="_blank" ><FontAwesomeIcon icon={[ 'fab', 'instagram' ]} className="logo-icons"/></a>
                    <a href="https://www.youtube.com/channel/UCZ0n7TbPbuoQy3ztRXpX8KQ" rel="noopener noreferrer" target="_blank" ><FontAwesomeIcon icon={[ 'fab', 'youtube' ]} className="logo-icons"/></a>
                    <a href="https://www.tiktok.com/@dopi_team?lang=en" rel="noopener noreferrer" target="_blank" ><FontAwesomeIcon icon={[ 'fab', 'tiktok' ]} className="logo-icons"/></a>

                    

                </div>
            </div>
        )
        return(
            <Fragment>
                {footerMarkup}
            </Fragment>
            
        )
    }
    }

    const mapStateToProps = (state) => ({
        authenticated: state.invest.authenticated
    })

export default connect(mapStateToProps, { logoutInvest })(Footer);
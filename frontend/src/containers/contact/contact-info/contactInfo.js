import React from 'react';
import './contactInfo.css';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Contact from '../contact';

class ContactInfo extends React.Component {
    render() {
        let redirect = null;
        if(this.props.user.name == ''){
          redirect = ( <Redirect to={'/contact'}/> )
        }
        let navbar = (
            <nav className="navbar bg-info navbar-expand">
                <div className="navbar-header">
                    <div className="navbar-brand" style={{ visibility: 'hidden' }}>
                        Details
                        </div>
                </div>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact/edit">
                                <i className="fa fa-edit"></i>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">
                            <i className="fa fa-trash"></i>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
        let content = (
            <div className="card-content" style={{height:(window.innerWidth >= 768 ? window.innerHeight - 100 : 'default')}}>
                <div className="img" style={{height:(window.innerWidth >= 768 ? 60+'%' : 50+'%')}}>
                    <p className="username">{this.props.user.name}</p>
                </div>
                    <div className="card">
                        <div className="card-body">
                            <p>
                                <i style={{marginRight:2+'%'}} className="fa fa-phone"></i>
                                {this.props.user.mobileNo}
                            </p>
                        </div>
                    </div>
               
            </div>
        )
        return (
            <div className="container-wrapper-right">
                {redirect}
                {navbar}
                {content}
            </div>
        )
    }
}

const mapStoreToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStoreToProps)(ContactInfo);
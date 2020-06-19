import React from 'react';
import './contactInfo.css';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';

class ContactInfo extends React.Component {
    deleteHandler = (e) => {
        Axios.delete(`${process.env.REACT_APP_REMOVE_CONTACT}/${this.props.user._id}`).then(res => {
            if(res.data['statusCode'] === 401){
                window.alert('you are logged out');
                return this.props.history.push('/login')
            } 
            if(res.data){
            window.alert('contact deleted successfully')
            this.props.history.push('/contact')
          }  
           }).catch(err => {
               window.alert('something went wrong')
        })
    }

    render() {
        let redirect = null;
        if(this.props.user.uname == ''){
          redirect = ( <Redirect from={'/contact/info'} to={'/contact'}/> )
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
                            <div onClick={this.deleteHandler} className="nav-link">
                            <i className="fa fa-trash"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
        let content = (
            <div className="card-content" style={{height:(window.innerWidth >= 768 ? window.innerHeight - 100 : 'default')}}>
                <div className="img" style={{height:(window.innerWidth >= 768 ? 60+'%' : 50+'%')}}>
                    <p className="username">{this.props.user.uname}</p>
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
import React from 'react';
import ListItem from '../../../components/list-item/listItem';
import './contactList.css';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

class ContactList extends React.Component {
    state = {
        contactDetails: []
    }
    componentDidMount = () => {
        
        Axios.get(process.env.REACT_APP_GET_CONTACTS).then(res =>{
            if(res.data['statusCode'] === 401){
                window.alert('you are logged out');
                return this.props.history.push('/login')
            } 
           let newContactDetails = { ...this.state.contactDetails}
           newContactDetails = res.data['contacts'];
           newContactDetails.sort((a,b)=> { return a.uname.toLowerCase() < b.uname.toLowerCase()})
           this.setState({contactDetails:newContactDetails})
        }).catch(err =>{
            console.log('err',err)
        })
    }
    render() {
        let list = (
            <div className="list-group">
                {this.state.contactDetails.map((user, i) => (
                    <ListItem key={i} user={user} />
                ))}
            </div>
        )
        return (
            <div className="container-wrapper-left">
                <nav className="navbar bg-info">
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            Contact
                        </div>
                    </div>
                    <NavLink style={{float:'right'}} className="nav-link" to="/contact/add">
                        <i className="fa fa-plus"></i>
                    </NavLink>
                </nav>
                <div className="list-item" style={{ height: (window.innerWidth >= 768 ? window.innerHeight - 100 : 'default') }}>
                    {list}
                </div>
            </div>
        )
    }
}

export default ContactList;
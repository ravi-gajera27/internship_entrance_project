import React from 'react';
import ListItem from '../../../components/list-item/listItem';
import './contactList.css';
import { NavLink } from 'react-router-dom';

class ContactList extends React.Component {
    state = {
        contactDetails: [{
            name: 'Ravi Gajera',
            mobileNo: '1234567890',
            email: 'ravi@gmail.com',
            status: 'active'
        }, {
            name: 'Prit Gajera',
            mobileNo: '1234567890',
            email: 'prit@gmail.com',
            status: 'active'
        }, {
            name: 'Zeel Dobariya',
            mobileNo: '1234567890',
            email: 'zeel@gmail.com',
            status: 'active'
        }, {
            name: 'Ravi Gajera',
            mobileNo: '1234567890',
            email: 'ravi@gmail.com',
            status: 'active'
        }, {
            name: 'Prit Gajera',
            mobileNo: '1234567890',
            email: 'prit@gmail.com',
            status: 'active'
        }, {
            name: 'Zeel Dobariya',
            mobileNo: '1234567890',
            email: 'zeel@gmail.com',
            status: 'active'
        }, {
            name: 'Ravi Gajera',
            mobileNo: '1234567890',
            email: 'ravi@gmail.com',
            status: 'active'
        }, {
            name: 'Prit Gajera',
            mobileNo: '1234567890',
            email: 'prit@gmail.com',
            status: 'active'
        }, {
            name: 'Zeel Dobariya',
            mobileNo: '1234567890',
            email: 'zeel@gmail.com',
            status: 'active'
        }, {
            name: 'Ravi Gajera',
            mobileNo: '1234567890',
            email: 'ravi@gmail.com',
            status: 'active'
        }, {
            name: 'Prit Gajera',
            mobileNo: '1234567890',
            email: 'prit@gmail.com',
            status: 'active'
        }, {
            name: 'Zeel Dobariya',
            mobileNo: '1234567890',
            email: 'zeel@gmail.com',
            status: 'active'
        }],
        item: {
            name: '',
            mobileNo: '',
            email: '',
            status: ''
        }
    }

    clickedHandler = (item) => {
        console.log(item)
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
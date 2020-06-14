import React from 'react';
import ContactInfo from './contact-info/contactInfo';
import ContactList from './contact-list/contactList';
import './contact.css';
import { Route, Switch } from 'react-router';
import initilInfo from '../../components/initialInfo/initialInfo';

class Contact extends React.Component {
    render() {
        let view;
        let pcView = (
            <div className="row">
                <div className="col-md-3 offset-md-2">
                    <ContactList />
                </div>
                <div className="col-md-7">
                    <Switch>
                        <Route path={'/contact'} exact component={initilInfo}></Route>
                        <Route path={'/contact/info'} exact component={ContactInfo}></Route>
                    </Switch>
                </div>
            </div>
        )
        let mobileView = (
            <div className="row">
                <div className="col-sm-12">
                    <Switch>
                        <Route path={'/contact'} exact component={ContactList}></Route>
                        <Route path={'/contact/info'} exact component={ContactInfo}></Route>
                    </Switch>
                </div>
            </div>
        )
        if (window.innerWidth >= 768) {
            view = pcView;
        }
        else {
            view = mobileView;
        }

        return (
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                </link>
                {view}
            </div>
        )
    }
}

export default Contact;
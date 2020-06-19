import React from 'react';
import './listItem.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const list = (props) => {
    return (
        <Link onClick={() => props.selectHandler(props.user)} to={'/contact/info'} className="list-group-item list-group-item-action">
            <div className="content">
                <div className="thumb">
                    {props.user.uname.toUpperCase().charAt(0)}
                </div>
                <div style={{ marginLeft: 20 }}>{props.user.uname}</div>
            </div>
        </Link>
    )
}

const mapActionToProps = (action) => {
    return{
        selectHandler: (user) => action({type:'SELECT_CONTACT',val:user})
    }
}
export default connect(null,mapActionToProps)(list);
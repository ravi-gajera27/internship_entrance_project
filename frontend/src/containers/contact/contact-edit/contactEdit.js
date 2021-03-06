import React from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../../components/input/input';
import Axios from 'axios';

class Edit extends React.Component{
   
    state = {
        editForm:{
            uname:{
                label:'Username',
                elementType:'input',
                elementConfig:{
                    type:'text',
                },
                validation:{
                    required:true
                },
                valid:true,
                value:this.props.user.uname
            },
            email:{
                label:'Email',
                elementType:'input',
                elementConfig:{
                    type:'email',
                },
                validation:{
                    required:true,
                },
                valid:true,
                value:this.props.user.email
            },
            mobile:{
                label:'Phone No',
                elementType:'input',
                elementConfig:{
                    type:'text',
                },
                validation:{
                    required:true,
                    lenght:10
                },
                valid:true,
                value:this.props.user.mobileNo
            },
            status:{
                label:'Status',
                elementType:'select',
                elementConfig:{
                    type:'text',
                    options:[
                        {value:'active', displayValue:'Active'},
                        {value:'inactive', displayValue:'Inctive'},
                    ]
                },
                validation:{
                    required:true
                },
                valid:true,
                value:this.props.user.status
            },
        }
    }
   
    checkValidity = (value,rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.length){
            let trimValue = value.trim();
            isValid = trimValue.lenght == rules.length && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event,inputIdentifier) => {
        let updateEditForm = {
           ...this.state.editForm
        }
        console.log(inputIdentifier)
        let updateFormElement = {
           ...updateEditForm[inputIdentifier]
        }
       updateFormElement.value = event.target.value;
       updateFormElement.valid = this.checkValidity(event.target.value, updateFormElement.validation);
       updateEditForm[inputIdentifier] = updateFormElement;
       this.setState({editForm:updateEditForm})
    }

    saveHandler = async (e) => {
        let valid = ( this.state.editForm.uname.valid && 
            this.state.editForm.email.valid &&
            this.state.editForm.mobile.valid &&
            this.state.editForm.status.valid );
        if(valid){
            let user = {
                uname:this.state.editForm.uname.value,
                email:this.state.editForm.email.value,
                mobileNo:this.state.editForm.mobile.value,
                status:this.state.editForm.status.value,
            }
            console.log(this.state.editForm)
            Axios.post(`${process.env.REACT_APP_UPDATE_CONTACT}/${this.props.user._id}`,user).then(res => {
                if(res.data['statusCode'] === 401){
                    window.alert('you are logged out');
                    return this.props.history.push('/login')
                } 
                if(res.data){
                window.alert('contact updated successfully')
                this.props.history.push('/contact');
               }
           }).catch(err => {
               console.log(err);
               window.alert('something went wrong')
               e.preventDefault();
           })
        }
        else{
            console.log(valid)
            window.alert('Enter valid details')
            e.preventDefault();
        }
    }


    render(){
        let navbar = (
            <nav className="navbar bg-info navbar-expand">
                    <div className="navbar-header">
                        <div className="navbar-brand" style={{ visibility: 'hidden' }}>
                            Edit
                            </div>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <div className="nav-link" onClick={this.saveHandler}>
                                    <i className="fa fa-save"></i>
                                </div>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={this.deleteHandler} className="nav-link" to="/contact">
                                <i className="fa fa-remove"></i>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
        )
        let formElementArray = [];
        for(let key in this.state.editForm){
           formElementArray.push({
               id:key,
               config:this.state.editForm[key]
           });
        }
        let form = (
            <form>
                {formElementArray.map(formElememnt => (
                    <Input key={formElememnt.id} 
                        changed={(e) => this.inputChangeHandler(e,formElememnt.id)}
                        label={formElememnt.config.label}
                        elementType={formElememnt.config.elementType}
                        elementConfig={formElememnt.config.elementConfig}
                        value={formElememnt.config.value}
                    />
                ))}
            </form>
        )  
        let redirect = null;
        
        if(this.props.user.uname == ''){
            redirect = (<Redirect from={'/contact/edit'} to={'/contact'}/>);
        }
        let content = (
            <div className="card" style={{height:'auto'}}>
                <div className="card-body">
                    {form}
                </div>
            </div>
        )
        return (
            <div className="container-wrapper-right">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                {redirect}
                {navbar}
                {content}
            </div>
        )
    }
}

const mapStoreToProps = (state) => {
    return{ 
        user: state.user
    }    
}
export default connect(mapStoreToProps)(Edit);
import React from 'react';
import Input  from '../../../components/input/input';
import { NavLink } from 'react-router-dom';
import './contactAdd.css';

class Add extends React.Component{
    state = {
        addForm:{
            uname:{
                label:'Username',
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'username'
                },
                validation:{
                    required:true
                },
                valid:false,
                value:''
            },
            email:{
                label:'Email',
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'email'
                },
                validation:{
                    required:true,
                },
                valid:false,
                value:''
            },
            mobile:{
                label:'Phone No',
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'10 digit number'
                },
                validation:{
                    required:true,
                    lenght:10
                },
                valid:false,
                value:''
            },
            status:{
                label:'Status',
                elementType:'select',
                elementConfig:{
                    type:'text',
                    options:[
                        {value:'active', displayValue:'Active'},
                        {value:'inactive', displayValue:'Inactive'},
                    ]
                },
                validation:{
                    required:true
                },
                valid:false,
                value:''
            }
        }
    }
   
    componentDidMount (){
        console.log(this.props.user);
        
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
        let updateAddForm = {
           ...this.state.addForm
        }
        let updateFormElement = {
           ...updateAddForm[inputIdentifier]
        }
       updateFormElement.value = event.target.value;
       updateFormElement.valid = this.checkValidity(event.target.value, updateFormElement.validation);
       updateAddForm[inputIdentifier] = updateFormElement;
       this.setState({ddForm:updateAddForm})
       console.log(this.state.addForm)
    }

    saveHandler = () => {
        console.log(this.state.addForm)
    }

    render(){
        let navbar = (
            <nav className="navbar bg-info navbar-expand">
                    <div className="navbar-header">
                        <div className="navbar-brand" style={{ visibility: 'hidden' }}>
                            add 
                        </div>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={this.saveHandler} to="/contact">
                                    <i className="fa fa-save"></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact/info">
                                <i className="fa fa-remove"></i>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
        )
        let formElementArray = [];
        for(let key in this.state.addForm){
           formElementArray.push({
               id:key,
               config:this.state.addForm[key]
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
        let content = (
            <div className="card" style={{height:'auto'}}>
                <div className="card-body">
                    {form}
                </div>
            </div>
        )
        return (
            <div className="container-wrapper-right">
                {navbar}
                {content}
            </div>
        )
    }
}

export default Add;
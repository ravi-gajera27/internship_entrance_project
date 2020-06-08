import React from 'react';
import Input from '../../components/input/input';

class Signup extends React.Component{

    state = {
        signupForm:{
            uname:{
                label:'Username',
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Ravi Gajera'
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
                    placeholder:'someone@example.com'
                },
                validation:{
                    required:true,
                },
                valid:false,
                value:''
            },
            password:{
                label:'password',
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'********',
                },
                validation:{
                    required:true,
                    minLength:8
                },
                valid:false,
                value:''
            }
        }
    }

    checkValidity = (value,rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = (value.length >= rules.minLength) && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event,inputIdentifier) => {
        let updatesignupForm = {
           ...this.state.signupForm
        }
        console.log(inputIdentifier)
        let updateFormElement = {
           ...updatesignupForm[inputIdentifier]
        }
       updateFormElement.value = event.target.value;
       updateFormElement.valid = this.checkValidity(event.target.value, updateFormElement.validation);
       updatesignupForm[inputIdentifier] = updateFormElement;
       console.log(updatesignupForm)
       this.setState({signupForm:updatesignupForm})
    }

    submitHandler = () => {
        /*  http request */
    }

    render(){
        let formElementArray = [];
        for(let key in this.state.signupForm){
           formElementArray.push({
               id:key,
               config:this.state.signupForm[key]
           });
        }

       let unameValid = this.state.signupForm.uname.valid;
       let passValid = this.state.signupForm.password.valid;
       let emailValid = this.state.signupForm.email.valid;

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
            <button className="btn btn-info" 
            onClick={this.submitHandler}
            disabled={(!unameValid || !passValid || !emailValid)}>Submit</button>
        </form>
    )
    return form;
    }
}

export default Signup;

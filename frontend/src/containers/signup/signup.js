import React from 'react';
import Input from '../../components/input/input';
import { Route } from 'react-router';
import ContactInfo from '../contact/contact-info/contactInfo';
import Axios from 'axios';

class Signup extends React.Component {

    state = {
        signupForm: {
            uname: {
                label: 'Username',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Ravi Gajera'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            email: {
                label: 'Email',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'someone@example.com'
                },
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            },
            password: {
                label: 'password',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: '********',
                },
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                value: ''
            }
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = (value.length >= rules.minLength) && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
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
        this.setState({ signupForm: updatesignupForm })
    }

    submitHandler = () => {
        let user = {
            uname: this.state.signupForm.uname.value,
            email: this.state.signupForm.email.value,
            password: this.state.signupForm.password.value
        }
        Axios.post(process.env.REACT_APP_SIGNUP, user).then(res => {
            if (res.data['statusCode'] == 200) {
                localStorage.setItem('token', res.data['token'])
                window.alert('successfully signup')
                this.props.history.push('/contact')
            }
            else if (res.data['statusCode'] == 409) {
                window.alert('email already in use')
            }
            else {
                window.alert('internal server error')
            }
        }).catch(err => {
            console.log(err);
            window.alert('something went wrong')
        })
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.signupForm) {
            formElementArray.push({
                id: key,
                config: this.state.signupForm[key]
            });
        }

        let unameValid = this.state.signupForm.uname.valid;
        let passValid = this.state.signupForm.password.valid;
        let emailValid = this.state.signupForm.email.valid;

        let form = (
            <form>
                {formElementArray.map(formElememnt => (
                    <Input key={formElememnt.id}
                        changed={(e) => this.inputChangeHandler(e, formElememnt.id)}
                        label={formElememnt.config.label}
                        elementType={formElememnt.config.elementType}
                        elementConfig={formElememnt.config.elementConfig}
                        value={formElememnt.config.value}
                    />
                ))}
            </form>
        )
        return (
            <div>
                <div className="row">
                    <div className="col-sm col-md-4 offset-md-4">
                        <div className="card" style={{ height: 'auto' }}>
                            <div className="card-body">
                                {form}
                                <button className="btn btn-info"
                                    onClick={this.submitHandler}
                                    disabled={(!unameValid || !passValid || !emailValid)}>Submit</button>
                                <Route path={'/signup/info'} exact component={ContactInfo}></Route>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;

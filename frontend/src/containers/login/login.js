import React from 'react';
import Input from '../../components/input/input';
import Axios from 'axios';

class Login extends React.Component {
    state = {
        loginForm: {
            email: {
                label: 'Email',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'someone@example.com'
                },
                validation: {
                    required: true
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

    componentDidMount = () => {
        let token = localStorage.getItem('token');
        if (token) {
            Axios.get(process.env.REACT_APP_CHECK_AUTHORIZATION).then(res => {
                if (res.data['statusCode'] !== 401) {
                    this.props.history.push('/contact');
                }
            }).catch(err => {
                console.log(err)
            })
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
        let updateLoginForm = {
            ...this.state.loginForm
        }
        console.log(inputIdentifier)
        let updateFormElement = {
            ...updateLoginForm[inputIdentifier]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(event.target.value, updateFormElement.validation);
        updateLoginForm[inputIdentifier] = updateFormElement;
        console.log(updateLoginForm)
        this.setState({ loginForm: updateLoginForm })
    }

    submitHandler = (e) => {
        let user = {
            email: this.state.loginForm.email.value,
            password: this.state.loginForm.password.value
        }
        Axios.post(process.env.REACT_APP_LOGIN, user).then(res => {
            if (res.data['statusCode'] != 401) {
                localStorage.setItem('token', res.data['token'])
                window.alert('successfully login')
                this.props.history.push('/contact')
            }
            else {
                window.alert('invalid email or password')
            }
        }).catch(err => {
            console.log(err);
            window.alert('something went wrong')
        })
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.loginForm) {
            formElementArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        let emailValid = this.state.loginForm.email.valid;
        let passValid = this.state.loginForm.password.valid;

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
            <div className="row">
                <div className="col-sm col-md-4 offset-md-4">
                    <div className="card" style={{ height: 'auto' }}>
                        <div className="card-body">
                            {form}
                            <button className="btn btn-info"
                                onClick={this.submitHandler}
                                disabled={(!emailValid || !passValid)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;

import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import { emailVal, required } from '../../utility/FormValidate';
import renderField from './RenderField';

import '../../styles/css/forms/Login.css';

class Login extends Component {
	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<Field component={renderField} label="Email" placeholder="john.smith@gmail.com" type="text" name="email" validate={[ required, emailVal ]}/>
					<Field component={renderField} label="Password" placeholder="Enter your password" type="password" name="password" validate={required}/>
					<button type="submit" >Login</button>
				</form>
				<p>Need an account? <Link to="/signup" className="signup-link">Signup</Link></p>
				<Link to="/">Home</Link>
			</div>
		)
	}
}

export default reduxForm({
	form: 'Login'
})(Login)
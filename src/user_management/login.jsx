import React from "react";
import Button from 'react-bootstrap/Button';
import {NavLink, useNavigate} from "react-router-dom";

export function Login(props)
{
	const [email, setEmail] = React.useState(props.email);
	const [password, setPassword] = React.useState("");
	const navigate = useNavigate();

	async function loginUser()
	{
		localStorage.setItem("email", email);
		localStorage.setItem("password", password);
		props.onLogin(email, password);
		navigate("/decks");
	}

	return (
	<main>
        <h1 className = "text-center my-3">Scripture Power Login</h1>

		{/* Mobile Version */}
        <div className = "d-sm-none px-4 py-2">
			<div>
				<div>
					<label for = "emailInput" className = "form-label">Email Address</label>
					<input type = "email" className = "form-control" id = "emailInput" aria-describedby = "emailHelp"
						onChange = {(e) => setEmail(e.target.value)}/>
					<div id = "emailHelp" className = "form-text">Your email will never be shared. We simply use it for password reset.</div>
				</div>
				<div className = "mt-3">
					<label for = "passwordInput" className = "form-label">Password</label>
					<input type = "password" className = "form-control" id = "passwordInput" aria-describedby="passwordHelp"
						onChange = {(e) => setPassword(e.target.value)}/>
					<div id = "passwordHelp" className = "form-text">Your password must be at least 10 character long</div>
				</div>
				<div className = "mt-3">
					<Button variant = "primary" onClick = {() => loginUser()} disabled = {!email || !password}>Login</Button>
				</div>
				<div>
					{(!email || !password) && <span className = "error">You must provide an email and password!</span>}
				</div>
				<span>Don't have a login yet? Register <NavLink className = "page-link" to = "register">here</NavLink></span>
			</div>
		</div>

		{/* Desktop Version */}
		<div className = "d-none d-sm-block mx-auto py-2" style = {{width: "400px"}}>
			<div>
				<div>
					<label for = "emailInput" className = "form-label">Email Address</label>
					<input type = "email" className = "form-control" id = "emailInput" aria-describedby = "emailHelp"
						onChange = {(e) => setEmail(e.target.value)}/>
					<div id = "emailHelp" className = "form-text">Your email will never be shared. We simply use it for password reset.</div>
				</div>
				<div className = "mt-3">
					<label for = "passwordInput" className = "form-label">Password</label>
					<input type = "password" className = "form-control" id = "passwordInput" aria-describedby="passwordHelp"
						onChange = {(e) => setPassword(e.target.value)}/>
					<div id = "passwordHelp" className = "form-text">Your password must be at least 10 character long</div>
				</div>
				<div className = "mx-auto mt-3" style = {{width: "40vw"}}>
					<Button variant = "primary" onClick = {() => loginUser()} disabled = {!email || !password}>Login</Button>
				</div>
				<div>
					{(!email || !password) && <span className = "error">You must provide an email and password!</span>}
				</div>
				<span>Don't have a login yet? Register <NavLink className = "page-link" to = "/register">here</NavLink></span>
			</div>
		</div>
	</main>
	)
}
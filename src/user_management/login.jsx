import React from "react";
import { NavLink } from "react-router-dom";

export function Login()
{
	return (
	<main>
        <h1 className = "text-center my-3">Scripture Power Login</h1>

        <div className = "d-sm-none px-4 py-2">
			<form method = "get" action = "deck-management.html">
				<div>
					<label for = "emailInput" className = "form-label">Email Address</label>
					<input type = "email" className = "form-control" id = "emailInput" aria-describedby = "emailHelp"/>
					<div id = "emailHelp" className = "form-text">Your email will never be shared. We simply use it for password reset.</div>
				</div>
				<div className = "mt-3">
					<label for = "passwordInput" className = "form-label">Password</label>
					<input type = "password" className = "form-control" id = "passwordInput" aria-describedby="passwordHelp"/>
					<div id = "passwordHelp" className = "form-text">Your password must be at least 10 character long</div>
				</div>
				<div className = "mt-3">
					<button type = "submit" className = "btn btn-primary">Sign In</button>
				</div>
				<span>Don't have a login yet? Register <NavLink className = "page-link" to = "register">here</NavLink></span>
			</form>
		</div>

		<div className = "d-none d-sm-block mx-auto py-2" style = {{width: "350px"}}>
			<form method = "get" action = "deck-management.html">
				<div>
					<label for = "emailInput" className = "form-label">Email Address</label>
					<input type = "email" className = "form-control" id = "emailInput" aria-describedby = "emailHelp"/>
					<div id = "emailHelp" className = "form-text">Your email will never be shared. We simply use it for password reset.</div>
				</div>
				<div className = "mt-3">
					<label for = "passwordInput" className = "form-label">Password</label>
					<input type = "password" className = "form-control" id = "passwordInput" aria-describedby="passwordHelp"/>
					<div id = "passwordHelp" className = "form-text">Your password must be at least 10 character long</div>
				</div>
				<div className = "mx-auto mt-3" style = {{width: "40vw"}}>
					<button type = "submit" className = "btn btn-primary">Sign In</button>
				</div>
				<span>Don't have a login yet? Register <NavLink className = "page-link" to = "register">here</NavLink></span>
			</form>
		</div>
	</main>
	)
}
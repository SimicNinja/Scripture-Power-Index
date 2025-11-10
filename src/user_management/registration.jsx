import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Registration()
{
	return (
	<main>
		<h1 class = "text-center my-3">Registration</h1>

		<div className = "d-sm-none px-4 py-2">
			<form method = "get" action = "deck-management.html">
				<div>
					<label for = "emailInput" class = "form-label">Email Address</label>
					<input type = "email" class = "form-control" id = "emailInput" aria-describedby = "emailHelp"/>
					<div id = "emailHelp" class = "form-text">Your email will never be shared. We simply use it for password reset.</div>
				</div>
				<div class = "mt-3">
					<label for = "passwordInput" class = "form-label">Password</label>
					<input type = "password" class = "form-control" id = "passwordInput" aria-describedby="passwordHelp"/>
					<div id = "passwordHelp" class = "form-text">Your password must be at least 10 character long</div>
				</div>
				<div class = "mt-3">
					<button type = "submit" class = "btn btn-primary">Register</button>
				</div>
				<span>Already have an account? Login <NavLink className = "page-link" to = "/login">here</NavLink></span>
			</form>
		</div>

		<div className = "d-none d-sm-block mx-auto py-2" style = {{width: "400px"}}>
			<form method = "get" action = "deck-management.html">
				<div>
					<label for = "emailInput" class = "form-label">Email Address</label>
					<input type = "email" class = "form-control" id = "emailInput" aria-describedby = "emailHelp"/>
					<div id = "emailHelp" class = "form-text">Your email will never be shared. We simply use it for password reset.</div>
				</div>
				<div class = "mt-3">
					<label for = "passwordInput" class = "form-label">Password</label>
					<input type = "password" class = "form-control" id = "passwordInput" aria-describedby="passwordHelp"/>
					<div id = "passwordHelp" class = "form-text">Your password must be at least 10 character long</div>
				</div>
				<div class = "mt-3">
					<button type = "submit" class = "btn btn-primary">Register</button>
				</div>
				<span>Already have an account? Login <NavLink className = "page-link" to = "/login">here</NavLink></span>
			</form>
		</div>
	</main>
	)
}
import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { About } from './user_management/about';
import { Login } from './user_management/login';
import { Registration } from './user_management/registration';
import { DeckManager } from './decks/deck-management';
import { DeckEditor } from './decks/deck-editor';
import { CardEditor } from './decks/flashcard-editor';

export default function App()
{
	return (
	<BrowserRouter>
		<header className = "d-flex flex-wrap align-items-center justify-content-start border-bottom">
			<img className = "img-fluid d-none d-lg-block" id = "scriptureImgTop" src = "scriptures_eye_glasses.jpeg" alt = "Image of the scripture lying open with a pair of glasses lying on top of them."/>

			<nav className = "navbar navbar-expand-lg bg-black" id = "navigationBar">
				<div className = "container-fluid">
					<div className = "d-flex justify-content-end">
						<div className = "flex-grow-1">
							<button className = "btn btn-primary navbar-toggler me-2" id = "toggleButton" data-bs-toggle = "collapse"
							data-bs-target = "#navigationMenu" aria-controls = "navigationMenu" aria-expanded = "false"
							aria-label = "Toggle navigation">
								<span className="bi bi-list"></span>
							</button>

							<button className = "btn btn-primary me-2" id = "profileButton">
								<NavLink to = "Login"><span className = "bi bi-person-circle"></span></NavLink>
							</button>
							<button className = "btn btn-primary" onClick = "toggleNotifications()" id = "notificationButton">
								<span className="bi bi-bell"/></button>
						</div>
					</div>

					<img className = "img-fluid d-block d-lg-none" id = "scriptureImgNavBar" src = "scriptures_eye_glasses.jpeg" alt = "Image of the scripture lying open with a pair of glasses lying on top of them."/>

					<div className = "collapse navbar-collapse" id = "navigationMenu">
						<ul className = "navbar-nav flex-column flex-lg-row">
							<li className = "nav-item"><NavLink className = "nav-link" to = "/">About Scripture Power</NavLink></li>
							<li className = "nav-item"><NavLink className = "nav-link" to = "deck-edit">Deck Library</NavLink></li>
						</ul>
					</div>
					
					{/* For later implementation
					<div id = "Notifications Menu" className = "Popup" style = "display: none;">test
					</div> */}
				</div>
			</nav>
		</header>

		<Routes>
			<Route path = "/" element = {<About/>} exact/>
			<Route path = "/login" element = {<Login/>}/>
			<Route path = "/register" element = {<Registration/>}/>
			<Route path = "/decks" element = {<DeckManager/>}/>
			<Route path = "/deck-edit" element = {<DeckEditor/>}/>
			<Route path = "/card-edit" element = {<CardEditor/>}/>
			<Route path = "*" element = {<NotFound/>}/>
		</Routes>

		<footer className = "text-center">
			<div>
				<hr/>
				Created by: Owen Werts
				<br/>
				<a className = "page-link" href = "https://github.com/SimicNinja/Scripture-Power-Index">Source GitHub</a>
			</div>
		</footer>
	</BrowserRouter>
	);
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
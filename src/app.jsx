import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';


export default function App()
{
	return (
	<div>
		<header className = "d-flex flex-wrap align-items-center justify-content-start border-bottom">
			<img className = "img-fluid d-none d-lg-block" id = "scriptureImgTop" src = "scriptures_eye_glasses.jpeg" alt = "Image of the scripture lying open with a pair of glasses lying on top of them."/>

			<nav className = "navbar navbar-expand-lg bg-black" id = "navigationBar">
				<div className = "container-fluid">
					<div className = "d-flex justify-content-end">
						<div className = "flex-grow-1">
							<button className = "btn btn-primary navbar-toggler" data-bs-toggle = "collapse" data-bs-target = "#navigationMenu"
							aria-controls = "navigationMenu" aria-expanded = "false" aria-label = "Toggle navigation">
								<span className="bi bi-list"></span>
							</button>

							<button className = "btn btn-primary"><a href = "login.html"><span className = "bi bi-person-circle"></span></a></button>
							<button className = "btn btn-primary" onClick = "toggleNotifications()"><span className="bi bi-bell"></span></button>
						</div>
					</div>

					<img className = "img-fluid d-block d-lg-none" id = "scriptureImgNavBar" src = "scriptures_eye_glasses.jpeg" alt = "Image of the scripture lying open with a pair of glasses lying on top of them."/>

					<div className = "collapse navbar-collapse" id = "navigationMenu">
						<ul className = "navbar-nav flex-column flex-lg-row">
							<li className = "nav-item"><a href = "index.html" className = "nav-link">About Scripture Power</a></li>
							<li className = "nav-item"><a href = "deck-management.html" className = "nav-link">Deck Library</a></li>
						</ul>
					</div>
					
					{/* For later implementation
					<div id = "Notifications Menu" className = "Popup" style = "display: none;">test
					</div> */}
				</div>
			</nav>
		</header>

		<main>
			App Components will go Here!
		</main>

		<footer className = "text-center">
			<div>
				<hr/>
				Created by: Owen Werts
				<br/>
				<a href = "https://github.com/SimicNinja/Scripture-Power-Index">Source GitHub</a>
			</div>
		</footer>
	</div>
	);
}
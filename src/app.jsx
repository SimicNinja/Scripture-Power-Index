import React, {useState, useEffect, use} from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import {About} from './user_management/about';
import {Login} from './user_management/login';
import {Registration} from './user_management/registration';
import {DeckManager} from './decks/deck-management';
import {DeckEditor} from './decks/deck-editor';
import {CardEditor} from './decks/flashcard-editor';
import {AuthState} from './user_management/AuthState';
import {ChapterSelection} from './cards/chapterSelction';

export default function App()
{
	const [email, setEmail] = useState(localStorage.getItem("email") || "");
	const [password, setPassword] = useState("");
	const [authState, setAuthState] = useState(AuthState.Unauthenticated);
	const [chapterPayload, setChapter] = useState(null);
	const [currentDeck, setCurrentDeck] = useState({title: "", flashcards: []});
	const [deletedDeck, setDeletedDeck] = useState(null);
	const [currentFlashcard, setCurrentFlashcard] = useState({flashcardID: "", verses: []});
	const [deletedFlashcard, setDeletedFlashcard] = useState(null);
	const [decks, setDecks] = useState(() => 
	{
		// const storedDecks = localStorage.getItem("decks");
		// return storedDecks ? JSON.parse(storedDecks) : [];
		return [];
	});

	// Commit decks to local storage whenever they change
	useEffect(() =>
	{
		localStorage.setItem("decks", JSON.stringify(decks));
	}, [decks]);

	// Update current deck when a new flashcard is added
	useEffect(() =>
	{
		const updatedDeck = 
		{
			...currentDeck, flashcards: [...currentDeck.flashcards, currentFlashcard]
		}
		setCurrentDeck(updatedDeck);
		setDecks(prevDecks => prevDecks.map(deck => deck.title === updatedDeck.title ? updatedDeck : deck));
	}, [currentFlashcard]);

	// Update current deck when a flashcard is deleted
	useEffect(() =>
	{
		const updatedDeck =
		{
			...currentDeck, flashcards: currentDeck.flashcards.filter(f => f.id !== deletedFlashcard.id)
		}
		setCurrentDeck(updatedDeck);
		setDecks(prevDecks => prevDecks.map(deck => deck.title === updatedDeck.title ? updatedDeck : deck));
	}, [deletedFlashcard]);

	// Update decks when the current deck is added or modified
	useEffect(() =>
	{
		setDecks(prevDecks => prevDecks.map(deck => deck.title === currentDeck.title ? currentDeck : deck));
	}, [currentDeck]);

	useEffect(() =>
	{
		setDecks(prevDecks => prevDecks.filter(deck => deck.title !== deletedDeck.title));
	}, [deletedDeck]);

	return (
	<BrowserRouter>
		<header className = "d-flex flex-wrap align-items-center justify-content-start border-bottom">
			<img className = "img-fluid d-none d-lg-block" id = "scriptureImgTop" src = "scriptures_eye_glasses.jpeg"
			alt = "Image of the scripture lying open with a pair of glasses lying on top of them."/>

			<nav className = "navbar navbar-expand-lg bg-black" id = "navigationBar">
				<div className = "container-fluid">
					<div className = "d-flex justify-content-end">
						<div className = "flex-grow-1">
							<button className = "btn btn-primary navbar-toggler me-2" id = "toggleButton" data-bs-toggle = "collapse"
							data-bs-target = "#navigationMenu" aria-controls = "navigationMenu" aria-expanded = "false"
							aria-label = "Toggle navigation">
								<span className="bi bi-list"></span>
							</button>

							{authState === AuthState.Authenticated && 
								<NavLink className = "btn btn-primary me-2" to = "login"><span className = "bi bi-person-circle"></span></NavLink>
							}

							{authState === AuthState.Authenticated && 
							<button className = "btn btn-primary" onClick = "toggleNotifications()" id = "notificationButton">
								<span className="bi bi-bell"/>
							</button>}
						</div>
					</div>

					<img className = "img-fluid d-block d-lg-none" id = "scriptureImgNavBar" src = "scriptures_eye_glasses.jpeg"
					alt = "Image of the scripture lying open with a pair of glasses lying on top of them."/>

					<div className = "collapse navbar-collapse" id = "navigationMenu">
						<ul className = "navbar-nav flex-column flex-lg-row">
							{authState === AuthState.Unauthenticated && <li className = "nav-item"><NavLink className = "nav-link" to = "/login">Login</NavLink></li>}
							<li className = "nav-item"><NavLink className = "nav-link" to = "/">About Scripture Power</NavLink></li>
							{authState === AuthState.Authenticated && <li className = "nav-item"><NavLink className = "nav-link" to = "/decks">Deck Library</NavLink></li>}
						</ul>
					</div>
					
					{/* For later implementation
					<div id = "Notifications Menu" className = "Popup" style = "display: none;">test
					</div> */}
				</div>
			</nav>
		</header>

		<Routes>
			<Route path = "/" element = {<About/>}/>
			<Route path = "/login" element = {<Login
				onLogin = {(email, password) =>
				{
					setEmail(email);
					setPassword(password);
					setAuthState(AuthState.Authenticated);
				}}/>}/>
			<Route path = "/register" element = {<Registration
				onRegister = {(email, password) =>
				{
					setEmail(email);
					setPassword(password);
					setAuthState(AuthState.Authenticated);
				}}/>}/>
			<Route path = "/decks" element = 
			{
				<DeckManager decks = {decks} setDecks = {setDecks} setCurrentDeck = {setCurrentDeck} deleteDeck = {setDeletedDeck}/>
			}/>
			<Route path = "/deck-edit" element =
			{
				<DeckEditor currentDeck = {currentDeck} setCurrentDeck = {setCurrentDeck}
				setFlashcard = {setCurrentFlashcard} deleteFlashcard = {setDeletedFlashcard}/>
			}/>
			<Route path = "/chapter-select" element =
			{
				<ChapterSelection setPayload = {setChapter}/>
			}/>
			<Route path = "/card-edit" element =
			{
				<CardEditor scriptures = {chapterPayload} currentFlashcard = {currentFlashcard} setFlashcard = {setCurrentFlashcard}/>
			}/>
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
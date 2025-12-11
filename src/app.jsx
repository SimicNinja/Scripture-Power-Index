import React, {useState, useEffect} from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import {About} from './user_management/about';
import {Login} from './user_management/login';
import {Registration} from './user_management/registration';
import {DeckManager} from './decks/deck-management';
import {DeckEditor} from './decks/deck-editor';
import {CardEditor} from './cards/flashcard-editor';
import {AuthState} from './user_management/AuthState';
import {ChapterSelection} from './cards/chapterSelction';
import { BookSelection } from './cards/bookSelection';
import { Study } from './decks/study';

export default function App()
{
	const [email, setEmail] = useState(localStorage.getItem("email") || "");
	const [password, setPassword] = useState("");
	const [authState, setAuthState] = useState(AuthState.Unauthenticated);
	const [bookPayload, setBook] = useState(null);
	const [chapterPayload, setChapter] = useState(null);
	const [currentDeck, setCurrentDeck] = useState({title: "", flashcards: []});
	const [deletedDeck, setDeletedDeck] = useState(null);
	const [currentFlashcard, setCurrentFlashcard] = useState({flashcardID: "", verses: []});
	const [deletedFlashcard, setDeletedFlashcard] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [decks, setDecks] = useState(() => 
	{
		// const storedDecks = localStorage.getItem("decks");
		// return storedDecks ? JSON.parse(storedDecks) : [];
		return [
				{
					"title": "Test",
					"flashcards": [
					{
						"id": "1 Nephi 1:1",
						"verses": [
						{
							"verseID": 1,
							"verseText": "1 I, Nephi, having been born of goodly parents, therefore I was taught somewhat in all the learning of my father; and having seen many afflictions in the course of my days, nevertheless, having been highly favored of the Lord in all my days; yea, having had a great knowledge of the goodness and the mysteries of God, therefore I make a record of my proceedings in my days."
						}
						]
					},
					{
						"id": "2 Nephi 9:51",
						"verses": [
						{
							"verseID": 51,
							"verseText": "51 Wherefore, do not spend money for that which is of no worth, nor your labor for that which cannot satisfy. Hearken diligently unto me, and remember the words which I have spoken; and come unto the Holy One of Israel, and feast upon that which perisheth not, neither can be corrupted, and let your soul delight in fatness."
						}
						]
					},
					{
						"id": "Matthew 22:36-40",
						"verses": [
						{
							"verseID": 40,
							"verseText": "40 On these two commandments hang all the law and the prophets."
						},
						{
							"verseID": 38,
							"verseText": "38 This is the first and great commandment."
						},
						{
							"verseID": 39,
							"verseText": "39 And the second is like unto it, Thou shalt love thy neighbour as thyself."
						},
						{
							"verseID": 37,
							"verseText": "37 Jesus said unto him, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind."
						},
						{
							"verseID": 36,
							"verseText": "36 Master, which is the great commandment in the law?"
						}
						]
					},
					{
						"id": "John 14:27",
						"verses": [
						{
							"verseID": 27,
							"verseText": "27 Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid."
						}
						]
					},
					{
						"id": "Helaman 5:12",
						"verses": [
						{
							"verseID": 12,
							"verseText": "12 And now, my sons, remember, remember that it is upon the rock of our Redeemer, who is Christ, the Son of God, that ye must build your foundation; that when the devil shall send forth his mighty winds, yea, his shafts in the whirlwind, yea, when all his hail and his mighty storm shall beat upon you, it shall have no power over you to drag you down to the gulf of misery and endless wo, because of the rock upon which ye are built, which is a sure foundation, a foundation whereon if men build they cannot fall."
						}
						]
					},
					{
						"id": "Ether 12:27",
						"verses": [
						{
							"verseID": 27,
							"verseText": "27 And if men come unto me I will show unto them their weakness. I give unto men weakness that they may be humble; and my grace is sufficient for all men that humble themselves before me; for if they humble themselves before me, and have faith in me, then will I make weak things become strong unto them."
						}
						]
					}
					]
				}];});

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
		if (!deletedFlashcard) return;
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
		if (!deletedDeck) return
		setDecks(prevDecks => prevDecks.filter(deck => deck.title !== deletedDeck.title));
	}, [deletedDeck]);

	useEffect(() =>
	{
		if (authState !== AuthState.Authenticated) return;
		saveDecks(decks);
	}, [decks, authState]);

	async function loadDecks()
	{
		try
		{
			const res = await fetch("/api/decks");
			if (!res.ok) throw new Error();
			setDecks(await res.json());
		}
		catch (_err) {}
	}

	async function saveDecks(nextDecks)
	{
		try
		{
			await fetch("/api/decks",
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ decks: nextDecks ?? decks })
			});
		}
		catch (_err) {}
	}

	async function handleLogin(loginEmail, loginPassword)
	{
		try
		{
			const res = await fetch("/api/auth/login",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: loginEmail, password: loginPassword })
			});
			if (!res.ok) throw new Error("login failed");
			setEmail(loginEmail);
			setPassword("");
			setAuthState(AuthState.Authenticated);
			await loadDecks();
		}
		catch (_err)
		{
			setAuthState(AuthState.Unauthenticated);
		}
	}

	async function handleRegister(regEmail, regPassword)
	{
		try
		{
			const res = await fetch("/api/auth/create",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: regEmail, password: regPassword })
			});
			if (!res.ok) throw new Error("register failed");
			setEmail(regEmail);
			setPassword("");
			setAuthState(AuthState.Authenticated);
			await loadDecks();
		}
		catch (_err)
		{
			setAuthState(AuthState.Unauthenticated);
		}
	}

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
				onLogin = {handleLogin}
			/>}/>
			<Route path = "/register" element = {<Registration
				onRegister = {handleRegister}
			/>}/>
			<Route path = "/decks" element = 
			{
				<DeckManager decks = {decks} setDecks = {setDecks} setCurrentDeck = {setCurrentDeck} deleteDeck = {setDeletedDeck}/>
			}/>
			<Route path = "/deck-edit" element =
			{
				<DeckEditor currentDeck = {currentDeck} setCurrentDeck = {setCurrentDeck}
				setFlashcard = {setCurrentFlashcard} deleteFlashcard = {setDeletedFlashcard}
				setPayload = {setChapter} setEditMode = {setEditMode}/>
			}/>
			<Route path = "/book-select" element =
			{
				<BookSelection setPayload = {setBook}/>
			}/>
			<Route path = "/chapter-select" element =
			{
				<ChapterSelection setPayload = {setChapter} book = {bookPayload}/>
			}/>
			<Route path = "/card-edit" element =
			{
				<CardEditor scriptures = {chapterPayload} editMode = {editMode} currentFlashcard = {currentFlashcard}
				setFlashcard = {setCurrentFlashcard} deleteFlashcard = {setDeletedFlashcard}
				/>
			}/>
			<Route path = "*" element = {<NotFound/>}/>
			<Route path = "/study" element =
			{
				<Study currentDeck = {currentDeck}/>
			}/>
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
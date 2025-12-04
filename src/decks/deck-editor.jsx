import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate, NavLink} from "react-router-dom";

export function DeckEditor(props)
{
	const [title, setTitle] = useState(props.currentDeck.title);
	const [showInput, setShowInput] = useState(false);
	const navigate = useNavigate();

	function newFlashcard()
	{
		navigate("/chapter-select");
	}

	function saveDeck()
	{
		const updatedDeck = {...props.currentDeck, title: title};
		props.setCurrentDeck(updatedDeck);
		navigate("/decks");
	}

	function changeTitle()
	{
		if(!showInput)
		{
			setShowInput(true);
		}
		else
		{
			const updatedDeck = {...props.currentDeck, title: title};
			props.setCurrentDeck(updatedDeck);
			setShowInput(false);
		}
	}

	return (
	<main>
		<h2 className = "text-center my-3">{props.currentDeck.title}</h2>

		<div className = "text-center mx-auto" style = {{width: "97%"}}>
			<table className = "table table-bordered table-striped">
				<thead>
					<tr>
						<td>Scripture Reference</td>
						<td>Verse(s)</td>
					</tr>
				</thead>
				<tbody>
					{props.currentDeck.flashcards.map((flashcard, index) => (
					<tr key = {index}>
						<td>
							<NavLink to = "/flashcard-edit" onClick =
							{
								() => props.setCurrentFlashcard(flashcard)
								// Implment API call based on flashcard ID to get verses
							}>
							{flashcard.id}</NavLink>
						</td>
						<td style={{whiteSpace: "pre-wrap"}}>
							{flashcard.verses.map(v => v.verseText).join("\n")}
						</td>
						<td>
							<Button variant = "danger" onClick =
							{
								() => props.deleteFlashcard(flashcard)
							}>Delete</Button>
						</td>
					</tr>
					))}
				</tbody>
			</table>
		</div>

		<div className = "text-center mx-auto mt-2" style = {{width: "400px"}}>
			<div>
				<Button className = "me-2" variant = "primary" onClick = {newFlashcard}>New Flashcard</Button>
				<Button className = "me-2" variant = "primary" onClick = {saveDeck}>Save Deck</Button>
				<Button variant = "primary" onClick = {changeTitle} disabled = {!title && showInput}>{showInput ? "Save Title" : "Change Deck Title"}</Button>
			<div>
				{(!title && showInput) && <span className = "error">You cannot leave the title field empty!</span>}
			</div>
			{showInput && 
			(	
				<div className = "mt-2">
					<input type = "text" className = "form-control" id = "deckTitle" aria-describedby="titleHelp"
						onChange = {(e) => setTitle(e.target.value)}/>
					<div id = "titleHelp" className = "form-text">Enter a new title for your deck.</div>
				</div>
			)}
			</div>
		</div>
	</main>
	)
}
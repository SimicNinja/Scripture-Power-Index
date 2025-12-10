import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate, NavLink} from "react-router-dom";

export function DeckManager(props)
{
	const [title, setTitle] = useState("");
	const [showInput, setShowInput] = useState(false);
	const navigate = useNavigate();

	function makeDeck()
	{
		if(!showInput)
		{
			setShowInput(true);
		}
		else
		{
			const newDeck =
			{
				title: title,
				flashcards: []
			};
			props.setCurrentDeck(newDeck);
			props.setDecks(prev => [...prev, newDeck]);
			navigate("/deck-edit");
		}
	}

	return (
	<main>
		<p className = "px-4 my-3 text-center">
			This is a list of all the decks you have made and those that have been shared with you. Simply click or tap on the title of a deck to edit it!
		</p>
		<div className = "mx-4 d-flex">
			<table className = "table table-hover table-striped table-bordered table-sm">
				<thead>
					<tr>
						<th scope = "col">Deck Title</th>
						<th scope = "col"># of Terms</th>
						<th scope = "col">Creator</th>
						<th scope = "col" className = "d-none d-lg-table-cell">Date Created</th>
					</tr>
				</thead>
				<tbody className = "table-group-divider">
					{props.decks.map((deck, index) => (
					<tr key = {index}>
						<td>
							{deck.title}
							<Button variant = "primary" className = "ms-2" onClick =
							{
								() => 
								{
									props.setCurrentDeck(deck);
									navigate("/study");
								}
							}>Study</Button>
							<Button variant = "secondary" className = "ms-2" onClick =
							{
								() => 
								{
									props.setCurrentDeck(deck);
									navigate("/deck-edit");
								}
							}>Edit</Button>
						</td>
						<td>{deck.flashcards.length}</td>
						<td className = "d-none d-lg-table-cell">{"You"}</td>
						<td className = "d-none d-lg-table-cell">{"N/A"}</td>
						<td>
							<Button variant = "danger" onClick =
							{
								() => props.deleteDeck(deck)
							}>Delete</Button>
						</td>				
					</tr>
					))}
				</tbody>
			</table>
		</div>

		{/* New Flashcard Button */}
		<div className = "text-center mx-auto py-2" style = {{width: "200px"}}>
			<div className = "mt-2">
				<Button variant = "primary" onClick = {makeDeck} disabled = {!title && showInput}>New Flashcard Deck</Button>
			</div>

			{/* Input field that only appears when needed. */}
			<div>
				{(!title && showInput) && <span className = "error">You must provide a title to make a new deck!</span>}
			</div>
			{showInput && 
			(	
				<div className = "mt-2">
					<input type = "text" className = "form-control" id = "deckTitle" aria-describedby="titleHelp"
						onChange = {(e) => setTitle(e.target.value)}/>
					<div id = "titleHelp" className = "form-text">Enter a title for your new deck.</div>
				</div>
			)}
		</div>
	</main>
	)
}
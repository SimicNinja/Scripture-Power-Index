import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";

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
					<tr>
						<td><a className = "link" href = "deck-editor.html">Scripture Mastery</a></td>
						<td>100</td>
						<td>The Church of Jesus Christ of Latter-day Saints</td>
						<td className = "d-none d-lg-table-cell">2012-07-13</td>
					</tr>
					<tr>
						<td><a className = "link" href = "deck-editor.html">The Restoration</a></td>
						<td>18</td>
						<td>You</td>
						<td className = "d-none d-lg-table-cell">2023-04-08</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div className = "text-center mx-auto py-2" style = {{width: "200px"}}>
			<div className = "mt-2">
				<Button variant = "primary" onClick = {makeDeck} disabled = {!title && showInput}>New Flashcard Deck</Button>
			</div>
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
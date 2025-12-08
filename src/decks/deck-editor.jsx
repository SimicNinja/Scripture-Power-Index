import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate, NavLink} from "react-router-dom";

export function DeckEditor(props)
{
	const [title, setTitle] = useState(props.currentDeck.title);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showInput, setShowInput] = useState(false);
	const navigate = useNavigate();

	async function editFlashcard(flashcard)
	{
		props.setFlashcard(flashcard);

		if(loading || error) return;

		try
		{
			setLoading(true);
			setError(null);

			const flashcardID = flashcard.id;
			const bookAndChapter = flashcardID.split(":")[0];
			const verseRange = "1-99"; // Fetch all verses in the chapter

			const query = `${bookAndChapter}:${verseRange}`;
			const params = new URLSearchParams({q: query});
			const url = `/api/scriptures/?${params.toString()}`;

			const response = await fetch(url);
			if(!response.ok)
			{
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const json = await response.json();

			props.setPayload(json.scriptures);
			props.setEditMode(true);

			navigate("/card-edit");
		}
		catch(err)
		{
			console.error("Error fetching data:", err);
			setError(err.message);
		}
		finally
		{
			setLoading(false);
		}
	}

	if(loading)
	{
		return (
		<main>
			<h1 className = "text-center pt-2">Loading Chapter Contents Please Wait!</h1>
		</main>
		);
	}

	if(error)
	{
		return (
		<main>
			<h1 className = "text-center pt-2">Error: {error}</h1>
		</main>
		);
	}

	function newFlashcard()
	{
		navigate("/book-select");
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
							<Button variant = "primary" onClick =
							{
								() => editFlashcard(flashcard)
							}>
							{flashcard.id}</Button>
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
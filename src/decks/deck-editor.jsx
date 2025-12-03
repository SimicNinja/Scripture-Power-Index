import React from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";

export function DeckEditor(props)
{
	const navigate = useNavigate();

	function newFlashcard()
	{
		navigate("/chapter-select");
	}

	return (
	<main>
		<h2 className = "text-center my-3">Deck Title</h2>

		<div className = "px-3">
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
						<td><a href = "flashcard-editor.html">{flashcard.id}</a></td>
						<td style={{whiteSpace: "pre-wrap"}}>
							{flashcard.verses.map(v => v.verseText).join("\n")}
						</td>
					</tr>
					))}
				</tbody>
			</table>
		</div>

		<div className = "text-center">
			<div className = "mt-2">
				<Button variant = "primary" onClick = {newFlashcard}>New Flashcard</Button>
			</div>
		</div>
	</main>
	)
}
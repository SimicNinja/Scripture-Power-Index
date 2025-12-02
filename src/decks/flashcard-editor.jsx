import React, {useState} from "react";
import {Verse} from "../cards/verse";
import Button from 'react-bootstrap/Button';

export function CardEditor(props)
{
	const [selectedVerses, setVerses] = useState([]);

	function toggleVerse(verse)
	{
		setVerses((prev) =>
		{
			const exists = prev.find((v) => v.verseID === verse.verseID);

			if(exists)
			{
				return prev.filter((v) => v.verseID !== verse.verseID);
			}
			else
			{
				return [...prev, verse];
			}
		});
	}

	function saveFlashcard()
	{
		const newFlashcard = {id: Date.now(), verses: selectedVerses};
		console.log("Saved flashcard: ", newFlashcard);
	}

	return (
	<main>
		<h1 className = "text-center pt-2">Flashcard Editor</h1>

		{/* <!-- Shell of how access to scripture API will operate with javascript support.--> */}
		<div className = "Verse Selection Pane">
			<p className = "px-3">Select the verse(s) you would like on your flashcard. Use the links above to navigate.</p>

			<div>
				<ul className = "Verse Block px-3 m-0">
				{
					props.scriptures.map(v => (
					<Verse 
						verseID = {v.scripture} 
						verseText = {`${v.verse} ${v.text}`}
						onToggle = {() => toggleVerse({verseID: v.scripture, verseText: `${v.verse} ${v.text}`})}
						isSelected = {selectedVerses.some((sv) => sv.verseID === v.scripture)}
					/>
					))
				}
				</ul>
			</div>

			<div className = "text-center">
				<Button variant = "primary" onClick = {saveFlashcard}>Save Flashcard</Button>
			</div>
		</div>
	</main>
	)
}
import React, {useEffect, useState} from "react";
import {Verse} from "../cards/verse";
import Button from 'react-bootstrap/Button';

export function CardEditor(props)
{
	const [flashcardID, setFlashcardID] = useState("untitled");
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

	function generateFlashcardID(selectedVerses)
	{
		const sorted = [...selectedVerses].sort((a, b) => a.verseID - b.verseID);
		const verseNumbers = sorted.map(v => parseInt(v.verseID, 10));

		// Handle empty selection
		if (verseNumbers.length === 0) 
		{
			return;
		}

		let ranges = [];
		let start = verseNumbers[0];
		let end = verseNumbers[0];

		for (let i = 1; i < verseNumbers.length; i++)
		{
			// Check if the current verse is consecutive
			if (verseNumbers[i] === end + 1)
			{
				end = verseNumbers[i];
			}
			// Not consecutive, save the previous range and start a new one
			else
			{
				ranges.push(start === end ? `${start}` : `${start}-${end}`);
				start = verseNumbers[i];
				end = verseNumbers[i];
			}
		}
		ranges.push(start === end ? `${start}` : `${start}-${end}`);

		// Get book & chapter from first verse in props.scriptures
		const firstVerse = props.scriptures.find(v => v.verse === verseNumbers[0]);
		return `${firstVerse.book} ${firstVerse.chapter}:${ranges.join(',')}`;
	}

	function saveFlashcard()
	{
		const newFlashcard = {id: flashcardID, verses: selectedVerses};
		console.log("Saved flashcard: ", newFlashcard);
	}

	useEffect(() =>
	{
		setFlashcardID(generateFlashcardID(selectedVerses));
	}, [selectedVerses]);

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
						verseID = {v.verse} 
						verseText = {`${v.verse} ${v.text}`}
						onToggle = {() => toggleVerse({verseID: v.verse, verseText: `${v.verse} ${v.text}`})}
						isSelected = {selectedVerses.some((sv) => sv.verseID === v.verse)}
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
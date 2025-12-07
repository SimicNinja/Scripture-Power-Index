import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";

export function ChapterSelection(props)
{
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	async function pickChapter(chapterNum)
	{
		if(loading || error) return;

		try
		{
			setLoading(true);
			setError(null);

			const bookName = props.book.name;
			const chapter = chapterNum;
			const verseRange = "1-99"; // Fetch all verses in the chapter

			const query = `${bookName}+${chapter}:${verseRange}`;
			const params = new URLSearchParams({q: query});
			const url = `/api/scriptures/?${params.toString()}`;

			const response = await fetch(url);
			if(!response.ok)
			{
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const json = await response.json();

			props.setPayload(json.scriptures);

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

	return (
	<main>
		<h1 className = "text-center pt-2">Chapter Selection</h1>

		<h2 className = "text-center pt-2">Selected Book: {props.book.name}</h2>

		<div className = "chapterGrid">
			{Array.from({length: props.book.chapters}, (_, index) => 
			{
				const chapterNum = index + 1;
				return (
					<Button variant = "primary" key = {chapterNum} className = "chapterBtn m-2"
					onClick = {() => pickChapter(chapterNum)}>{chapterNum}</Button>
				);
			})}
		</div>
	</main>
	);
}

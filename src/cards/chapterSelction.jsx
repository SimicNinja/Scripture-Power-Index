import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";

export function ChapterSelection({ setPayload })
{
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetch("/api/scriptures/?q=2+Nephi+3%3A1-99")
		.then(response =>
		{
			if(!response.ok)
			{
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			console.log("Testing");
			return response.json();
		})
		.then(json =>
		{
			setPayload(json.scriptures);
			console.log(json.scriptures);
			setLoading(false);
		})
		.catch(err =>
		{
			console.error("Error fetching data:", err);
			setError(err.message);
			setLoading(false);
		});
	}, []);

	function openCardEditor()
	{
		navigate("/card-edit");
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
	<main>
		<Button variant="primary" onClick={openCardEditor}>
			Select This Chapter
		</Button>
	</main>
	);
}

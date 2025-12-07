import React from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import tableOfContents from "../cards/tableOfContents.json";

export function BookSelection(props)
{
	const navigate = useNavigate();
	const volumes = {}

	tableOfContents.books.forEach(book => 
	{
		const key = book.volumeOfScripture;
		if(!volumes[key])
		{
			volumes[key] = [];
		}
		volumes[key].push(book);
	});

	function pickBook(book)
	{
		props.setPayload(book);
		navigate("/chapter-select");
	}

	return (
	<main>
		{Object.entries(volumes).map(([volume, books]) =>
		(
		<div key = {volume}>
			<h3 className = "text-center pt-2">{volume}</h3>

			<div className = "bookGrid" id = {volume.replace(/\s+/g, '')}>
				{books.map(book =>
				(
				<Button key = {book.name} className = "bookBtn" variant = "primary"
					onClick = {() => pickBook(book)}>
					
					{/* Full name on screens small or larger */}
					<span className = "d-none d-sm-inline">{book.name}</span>

					{/* Abbreviation on xs screens */}
					<span className = "d-inline d-sm-none">{book.abbr}</span>
				</Button>
				))}				
			</div>
		</div>
		))}
	</main>
	)
}
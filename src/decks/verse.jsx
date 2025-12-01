import React from "react";
import {useState} from "react";

export function Verse({verseID, verseText})
{
	const [selected, toggleSelected] = useState(false);
	
	return (
		<li id = {verseID} className = {`verse ${selected ? "rounded-2" : ""}`} 
			onClick = {() => toggleSelected(!selected)}>
			<p className = "m-0 px-1 py-1">{verseText}</p>
		</li>
	)
}
import React from "react";
import {useState} from "react";

export function Verse({verseID, verseText, onToggle, isSelected})
{
	return (
		<li className = {`verse ${isSelected ? "rounded-2" : ""}`}
			id = {verseID} 
			onClick = {onToggle}>
			<p className = "m-0 px-1 py-1">{verseText}</p>
		</li>
	)
}
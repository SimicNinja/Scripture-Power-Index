import React from "react";
import { NavLink } from "react-router-dom";

export function DeckEditor()
{
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
					<tr>
						<td><a href = "flashcard-editor.html">1 Nephi 3:7</a></td>
						<td>I will go and do...</td>
						
					</tr>
					<tr>
						<td><a href = "flashcard-editor.html">Ether 12:27</a></td>
						<td>And if men come unto me...</td>
					</tr>
					<tr>
						<td><a href = "flashcard-editor.html">2 Nephi 9:50</a></td>
						<td>Come, my brethren, every one...</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div className = "text-center"><button id = "Flashcard Edit" className = "btn btn-primary">
			
			<NavLink className = "button-link" to = "card-edit">New Flashcard</NavLink></button></div>
	</main>
	)
}
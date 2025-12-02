import React from "react";
import { NavLink } from "react-router-dom";
import { Verse } from "./verse";

export function CardEditor({scriptures})
{
	return (
	<main>
		<h1 className = "text-center pt-2">Flashcard Editor</h1>

		{/* <!-- Shell of how access to scripture API will operate with javascript support.--> */}
		<div className = "Verse Selection Pane">
			<p className = "px-3">Select the verse(s) you would like on your flashcard. Use the links above to navigate.</p>

			<div>
				<ul className = "Verse Block px-3 m-0">
					{
						scriptures.map(v => (
							<Verse verseID = {v.scripture} verseText = {`${v.verse} ${v.text}`}/>
						))
					}
				</ul>
			</div>

			<div className = "text-center">
				<NavLink to = "/deck-edit" className = "btn btn-primary">Save</NavLink>
			</div>
		</div>
	</main>
	)
}
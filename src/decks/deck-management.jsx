import React from "react";
import { NavLink } from "react-router-dom";

export function DeckManager()
{
	return (
	<main>
		<p className = "px-4 my-3 text-center">
			This is a list of all the decks you have made and those that have been shared with you. Simply click or tap on the title of a deck to edit it!
		</p>
		<div className = "mx-4 d-flex">
			<table className = "table table-hover table-striped table-bordered table-sm">
				<thead>
					<tr>
						<th scope = "col">Deck Title</th>
						<th scope = "col"># of Terms</th>
						<th scope = "col">Creator</th>
						<th scope = "col" className = "d-none d-lg-table-cell">Date Created</th>
					</tr>
				</thead>
				<tbody className = "table-group-divider">
					<tr>
						<td><a className = "link" href = "deck-editor.html">Scripture Mastery</a></td>
						<td>100</td>
						<td>The Church of Jesus Christ of Latter-day Saints</td>
						<td className = "d-none d-lg-table-cell">2012-07-13</td>
					</tr>
					<tr>
						<td><a className = "link" href = "deck-editor.html">The Restoration</a></td>
						<td>18</td>
						<td>You</td>
						<td className = "d-none d-lg-table-cell">2023-04-08</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div className = "text-center"><button id = "Create Deck" className = "btn btn-primary ">
			<NavLink className = "button-link" to = "/deck-edit">Create a New Deck</NavLink>
		</button></div>
	</main>
	)
}
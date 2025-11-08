import React from "react";
import { NavLink } from "react-router-dom";

export function About()
{
	return (
	<main>
		<div>
			<h1 className = "text-center">Welcome to the Scripture Power Study Tool!</h1>
			<p className = "px-4">
				Have you ever tried to make flashcards on your phone?
				Did you try typing your favorite passages of scripture in only to realize that it took you 30 minutes to finish 5 of them?
				Scripture Power is a flashcard application catered specifically to memorizing passages from the standard works of The Church of Jesus Christ of Latter-day Saints.
				The main goal is to minimize your time spent on creating flashcards by having all of the verses popluated by the application given a specific reference (i.e. 1 Nephi 3:7).
				Furthurmore, you can draw upon all the flashcard decks that other individuals have made!
			</p>
			<h2 className = "text-center">Please <NavLink className = "nav-link" to = "login">Login</NavLink> to Continue!</h2>
		</div>
	</main>
	)
}
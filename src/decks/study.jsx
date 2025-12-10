import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate, NavLink} from "react-router-dom";

export function Study(props)
{
	const cards = deserializeDeck(props.currentDeck);
	const [order, setOrder] = useState(() => shuffleIndices(cards.length));
	const [currentPosition, setPosition] = useState(0);
	const currentCardIndex = order[currentPosition];
	const currentCard = cards[currentCardIndex];

	function deserializeDeck(deck)
	{
		return deck.flashcards.map((card) =>
		{
			const combinedText = (card.verses).map((v) => v.verseText?.trim()).join("\n");
			return (
			{
				id: card.id,
				combinedText,
			});
		});
	}

	function shuffleIndices(length)
	{
  		const arr = Array.from({ length }, (_, i) => i);
  		for (let i = length - 1; i > 0; i--)
  		{
    		const j = Math.floor(Math.random() * (i + 1));
    		[arr[i], arr[j]] = [arr[j], arr[i]];
  		}
		return arr;
	}

	return (
	<main>
		<h1 className = "text-center">Studying Deck: {props.currentDeck.title}</h1>

		<section className = "flashcardViewer text-center p-2 m-auto">
			<strong>{currentCard?.id}</strong>
			<pre style = {{ whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>
				{currentCard?.combinedText}
			</pre>
		</section>

		<div className = "text-center">
			<Button onClick = {() => setPosition(p => (p - 1 + order.length) % order.length)}>Prev</Button>
			<Button onClick = {() => setPosition(p => (p + 1) % order.length)}>Next</Button>
		</div>
	</main>
	)
}
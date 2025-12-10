import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate, NavLink} from "react-router-dom";

export function Study(props)
{
	const cards = deserializeDeck(props.currentDeck);
	const [order, setOrder] = useState(() => shuffleIndices(cards.length));
	const [currentPosition, setPosition] = useState(0);
	const [flipped, setFlipped] = useState(true); // False = front (Verse ID), True = back (Verse Text)
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
	
	// Reset flipped whenever the card changes
	useEffect(() =>
	{
		setFlipped(true);
	}, [currentCardIndex]);

	
	// Add keyboard listeners: Spacebar to flip, Left & Right arrows to navigate.
	useEffect(() =>
	{
		function onKey(e)
		{
			if (e.code === "Space" || e.code === "ArrowDown" || e.code === "ArrowUp")
			{
				e.preventDefault();
				setFlipped(f => !f);
			}
			else if (e.code === "ArrowLeft")
			{
				e.preventDefault();
				setPosition(p => (p - 1 + order.length) % order.length)
			}
			else if (e.code === "ArrowRight")
			{
				e.preventDefault();
				setPosition(p => (p + 1) % order.length)
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	return (
	<main>
		<h1 className = "text-center">Studying Deck: {props.currentDeck.title}</h1>
		<h2 className = "text-center">Card {currentPosition + 1} of {order.length}</h2>

		<section className = "flashcardViewer text-center p-2 m-auto">
			{!flipped && 
				<strong className = "m-auto">{currentCard?.id}</strong>
			}

			{flipped && 
				<pre className = "text-start ms-4 mt-2" style={{ whiteSpace: "pre-wrap"}}>
					{currentCard?.combinedText}
				</pre>
			}
		</section>

		<div className = "text-center mt-3">
			<Button className = "flashcardButton" onClick = {() => setPosition(p => (p - 1 + order.length) % order.length)}>Prev</Button>
			<Button className = "flashcardButton ms-2" onClick = {() => setOrder(shuffleIndices(cards.length))}>Shuffle</Button>
			<Button className = "flashcardButton ms-2" onClick = {() => setFlipped(f => !f)}>Flip</Button>
			<Button className = "flashcardButton ms-2" onClick = {() => setPosition(p => (p + 1) % order.length)}>Next</Button>
		</div>
	</main>
	)
}
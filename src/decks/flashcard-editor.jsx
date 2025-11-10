import React from "react";
import { NavLink } from "react-router-dom";

export function CardEditor()
{
	return (
	<main>
		<h1 className = "text-center pt-2">Flashcard Editor</h1>

		{/* <!-- Shell of how access to scripture API will operate with javascript support.--> */}
		<div className = "Verse Selection Pane">
			<p className = "px-3">Select the verse you would like on your flashcard. Use the links above to navigate.</p>

			<div>
				<ul className = "Verse Block px-3 m-0">
					<li id="2 ne_32.1" className = "verse rounded-2"><p className = "m-0 px-1 py-1">1 And now, behold, my beloved brethren, I suppose that ye ponder somewhat in your hearts concerning that which ye should do after ye have entered in by the way.  But, behold, why do ye ponder these things in your hearts?</p></li>
					<li id="2 ne_32.2" className = "verse"><p className = "m-0 px-1 py-1">2 Do ye not remember that I said unto you that after ye had received the Holy Ghost ye could speak with the tongue of angels? And now, how could ye speak with the tongue of angels save it were by the Holy Ghost?</p></li>
					<li id="2 ne_32.3" className = "verse"><p className = "m-0 px-1 py-1">3 Angels speak by the power of the Holy Ghost; wherefore, they speak the words of Christ.  Wherefore, I said unto you, feast upon the words of Christ; for behold, the words of Christ will tell you all things what ye should do.</p></li>
					<li id="2 ne_32.4" className = "verse"><p className = "m-0 px-1 py-1">4 Wherefore, now after I have spoken these words, if ye cannot understand them it will be because ye ask not, neither do ye knock; wherefore, ye are not brought into the light, but must perish in the dark.</p></li>
					<li id="2 ne_32.5" className = "verse"><p className = "m-0 px-1 py-1">5 For behold, again I say unto you that if ye will enter in by the way, and receive the Holy Ghost, it will show unto you all things what ye should do.</p></li>
					<li id="2 ne_32.6" className = "verse"><p className = "m-0 px-1 py-1">6 Behold, this is the doctrine of Christ, and there will be no more doctrine given until after he shall manifest himself unto you in the flesh.  And when he shall manifest himself unto you in the flesh, the things which he shall say unto you shall ye observe to do.</p></li>
					<li id="2 ne_32.7" className = "verse"><p className = "m-0 px-1 py-1">7 And now I, Nephi, cannot say more; the Spirit stoppeth mine utterance, and I am left to mourn because of the unbelief, and the wickedness, and the ignorance, and the stiffneckedness of men; for they will not search knowledge, nor understand great knowledge, when it is given unto them in plainness, even as plain as word can be.</p></li>
					<li id="2 ne_32.8" className = "verse"><p className = "m-0 px-1 py-1">8 And now, my beloved brethren, I perceive that ye ponder still in your hearts; and it grieveth me that I must speak concerning this thing.  For if ye would hearken unto the Spirit which teacheth a man to pray, ye would know that ye must pray; for the evil spirit teacheth not a man to pray, but teacheth him that he must not pray.</p></li>
					<li id="2 ne_32.9" className = "verse"><p className = "m-0 px-1 py-1">9 But behold, I say unto you that ye must pray always, and not faint; that ye must not perform any thing unto the Lord save in the first place ye shall pray unto the Father in the name of Christ, that he will consecrate thy performance unto thee, that thy performance may be for the welfare of thy soul.</p></li>
				</ul>
			</div>

			<div className = "text-center"><button id = "SaveFlashcard" className = "btn btn-primary "><NavLink to = "/deck-edit" className = "button-link">Save</NavLink></button></div>
		</div>
	</main>
	)
}
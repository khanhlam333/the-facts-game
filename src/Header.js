import './Header.css';

export default function Header () {
    return(
        <div className="header">
            <h1 style={{textAlign: "center"}}>The Facts Game</h1>
            <p><span className="bold">The Facts Game</span> is based on Hangman, but instead of a hangman, the players'll get to read facts about a random subject belonging to the category you've chosen.</p>
            <p>The word to guess is represented by a row of dashes representing each letter of the word. If the player suggests a letter which occurs in the word, the letter will appear in its correct position, and the Number of Facts will increase. If the suggested letter does not occur in the word, the Number of Facts decrease.</p>
            <p>The goal of the game is not entirely about figuring out the mysterious word, but it's more about playing strategically to earn as many Number of Facts as possible, so that at the end of the game, you get to gain more interesting knowledge about the subject.</p>
            <p className="bold">The word to guess is a noun.</p>
        </div>
    )
}
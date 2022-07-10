import './Rules.css';

export default function Rules () {
    return(
        <div className="rules">
            <h2 style={{textAlign: "center"}}>RULES</h2>
            <ol>
              <li>The player can either guess one letter at a time or guess the whole word</li>
              <li>Whenever the player guesses a letter correctly, the Number of Facts will increase by 1. However, if the player guesses a letter incorrectly, it will be decreased by 1</li>
              <li>Whenever the player guesses an entire word correctly in the first try with only one hint to go by, the Number of Facts will increase by 5</li>
              <li>Whenever the player guesses an entire word correctly after several tries, with only one hint to go by, the Number of Facts will increase by 3</li>
              <li>Whenever the player guesses an entire word correctly after several tries, with more than one hints, the Number of Facts will increase by 2</li>
              <li>However, if the player guesses the entire word incorrectly, the Number of Facts will decrease by 2</li>
            </ol>
        </div>
    )
}

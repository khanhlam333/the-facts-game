# The Facts Game
## Overview
The Facts Game is based on [Hangman](https://en.wikipedia.org/wiki/Hangman_(game)), but instead of a hangman, the players'll get to read facts about a random subject belonging to the category you've chosen.

The word to guess is represented by a row of dashes representing each letter of the word. If the player suggests a letter which occurs in the word, the letter will appear in its correct position, and the Number of Facts will increase. If the suggested letter does not occur in the word, the Number of Facts decrease.

The goal of the game is not entirely about figuring out the mysterious word, but it's more about playing strategically to earn as many Number of Facts as possible, so that at the end of the game, you get to gain more interesting knowledge about the subject.

[React](https://reactjs.org/) was used to build The Facts Game.

**Note: All the facts shown in the game were all taken from multiple online sources, which I have noted at the end of each fact.** 


## Rules
1. The player can either guess one letter at a time or guess the whole word
2. Whenever the player guesses a letter correctly, the Number of Facts will increase by 1. However, if the player guesses a letter incorrectly, it will be decreased by 1
3. Whenever the player guesses an entire word correctly in the first try with only one hint to go by, the Number of Facts will increase by 5
4. Whenever the player guesses an entire word correctly after several tries, with only one hint to go by, the Number of Facts will increase by 3
5. Whenever the player guesses an entire word correctly after several tries, with more than one hints, the Number of Facts will increase by 2
6. However, if the player guesses the entire word incorrectly, the Number of Facts will decrease by 2
---
You can play the game [here](https://khanhlam333.github.io/the-facts-game/)
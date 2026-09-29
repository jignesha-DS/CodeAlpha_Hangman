import random

# List of 5 predefined words
words = ["python", "computer", "programming", "developer", "college"]

# Select a random word
word = random.choice(words)

# Store guessed letters
guessed_letters = []

# Maximum incorrect guesses
max_attempts = 6
incorrect_guesses = 0

print("================================")
print("       HANGMAN GAME")
print("================================")
print("Guess the word one letter at a time!")
print("You have 6 incorrect guesses.\n")

# Main game loop
while incorrect_guesses < max_attempts:

    # Display the word with guessed letters
    display_word = ""

    for letter in word:
        if letter in guessed_letters:
            display_word += letter + " "
        else:
            display_word += "_ "

    print("Word:", display_word)

    # Check if the word is completely guessed
    if all(letter in guessed_letters for letter in word):
        print("\n🎉 Congratulations! You guessed the word!")
        print("The word was:", word)
        break

    # Take input from user
    guess = input("Enter a letter: ").lower()

    # Check input
    if len(guess) != 1 or not guess.isalpha():
        print("Please enter only one letter.\n")
        continue

    # Check if letter was already guessed
    if guess in guessed_letters:
        print("You already guessed that letter.\n")
        continue

    # Add letter to guessed letters
    guessed_letters.append(guess)

    # Check whether guess is correct
    if guess in word:
        print("✅ Correct guess!\n")
    else:
        incorrect_guesses += 1
        print("❌ Wrong guess!")
        print("Incorrect guesses:", incorrect_guesses)
        print("Attempts remaining:", max_attempts - incorrect_guesses)
        print()

# If player loses
if incorrect_guesses == max_attempts:
    print("💀 Game Over!")
    print("The correct word was:", word)
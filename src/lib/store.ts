import { create } from 'zustand';
import buzzwordsData from '@/data/buzzwords.json';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

interface BuzzWord {
  word: string;
  hint: string;
}

interface GameState {
  currentWord: BuzzWord | null;
  guessedLetters: string[];
  wrongGuesses: number;
  maxWrongGuesses: number;
  gameStatus: GameStatus;
  isHintVisible: boolean;
  
  // Aktionen
  startGame: () => void;
  guessLetter: (letter: string) => void;
  resetGame: () => void;
  toggleHint: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentWord: null,
  guessedLetters: [],
  wrongGuesses: 0,
  maxWrongGuesses: 6,
  gameStatus: 'idle',
  isHintVisible: false,

  startGame: () => {
    const buzzwords = buzzwordsData.buzzwords;
    const randomIndex = Math.floor(Math.random() * buzzwords.length);
    const selectedWord = buzzwords[randomIndex];
    
    set({
      currentWord: selectedWord,
      guessedLetters: [],
      wrongGuesses: 0,
      gameStatus: 'playing',
      isHintVisible: false,
    });
  },

  guessLetter: (letter: string) => {
    const { currentWord, guessedLetters, wrongGuesses, maxWrongGuesses } = get();
    
    if (!currentWord || guessedLetters.includes(letter) || 
        get().gameStatus !== 'playing') {
      return;
    }
    
    const normalizedLetter = letter.toUpperCase();
    const normalizedWord = currentWord.word.toUpperCase();
    const newGuessedLetters = [...guessedLetters, normalizedLetter];
    
    // Prüfe, ob der geratene Buchstabe im Wort vorkommt
    const isCorrectGuess = normalizedWord.includes(normalizedLetter);
    const newWrongGuesses = isCorrectGuess ? wrongGuesses : wrongGuesses + 1;
    
    // Prüfe, ob das Spiel gewonnen wurde
    const isWordGuessed = [...normalizedWord].every(
      char => char === ' ' || newGuessedLetters.includes(char)
    );
    
    // Prüfe, ob das Spiel verloren wurde
    const isGameLost = newWrongGuesses >= maxWrongGuesses;
    
    let newGameStatus: GameStatus = 'playing';
    if (isWordGuessed) newGameStatus = 'won';
    if (isGameLost) newGameStatus = 'lost';
    
    set({
      guessedLetters: newGuessedLetters,
      wrongGuesses: newWrongGuesses,
      gameStatus: newGameStatus,
    });
  },

  resetGame: () => {
    set({
      currentWord: null,
      guessedLetters: [],
      wrongGuesses: 0,
      gameStatus: 'idle',
      isHintVisible: false,
    });
  },

  toggleHint: () => {
    set(state => ({ isHintVisible: !state.isHintVisible }));
  },
})); 
import "./App.css";
import { useState, useEffect, useRef } from "react";

const initialState = {
  userChoice: null,
  computerChoice: null,
  result: null,
  userScore: 0,
  computerScore: 0,
  userHandSrc: "",
  computerHandSrc: "",
  message: "Click on 👊🏽✋🏽✌🏽 to start...",
  refresh: "",
};

const App = () => {
  const [state, setState] = useState(initialState);

  const computerHandRef = useRef(null);
  const playerHandRef = useRef(null);
  const winnerRef = useRef(null);
  const MessageRef = useRef(null);

  const choices = [
    { icon: "👊🏽", name: "rock" },
    { icon: "✋🏽", name: "paper" },
    { icon: "✌🏽", name: "scissors" },
  ];
  // from this array we will make three buttons
  const userSelectionButtons = choices.map((choice, index) => (
    <button key={choice.name} onClick={() => handleClick(choice.name)}>
      {choice.icon}
    </button>
  ));

  // this is when the game start. we get handleClick value from selections button  (rock paper scissors) depending on user click
  const handleClick = (value) => {
    setState((prevState) => ({
      ...prevState,
      message: "",
      refresh: "",
      userChoice: value,
      computerChoice: generateComputerChoice(),
      result: null,
      computerHandSrc: "./images/rock.png",
      userHandSrc: "./images/rock.png",
    }));
    playerHandRef.current.classList.add("scalable");
    computerHandRef.current.classList.add("scalable");
    playerHandRef.current.style.animation = "shakePlayerHand 2s ease";
    computerHandRef.current.style.animation = "shakeComputerHand 2s ease";
  };

  const generateComputerChoice = () => {
    const randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice].name;
  };

  // Restarting the game
  const Restart = () => {
    setState((prevState) => ({
      ...prevState,
      refresh: "",
      result: null,
      message: "New Round",
      computerHandSrc: "./images/rock.png",
      userHandSrc: "./images/rock.png",
      userScore: 0,
      computerScore: 0,
    }));
    MessageRef.current.style.bottom = "30%";
    MessageRef.current.style.fontSize = "1.5rem";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // compering user choice and computer choice to set the result and the score.
      switch (state.userChoice + state.computerChoice) {
        case "scissorspaper":
        case "rockscissors":
        case "paperrock":
          setState((prevState) => ({
            ...prevState,
            result: "YOU WIN 💪🏽 !     ",
            refresh: <i className="fa fa-refresh"></i>,
            userScore: prevState.userScore + 1,
            computerHandRef: "hsl(177, 58%, 22%)",
          }));
          winnerRef.current.style.color = "hsl(177, 58%, 22%)";
          break;
        case "paperscissors":
        case "scissorsrock":
        case "rockpaper":
          setState((prevState) => ({
            ...prevState,
            result: "YOU LOSE 😏 !     ",
            refresh: <i className="fa fa-refresh"></i>,
            computerScore: prevState.computerScore + 1,
          }));
          winnerRef.current.style.color = "hsl(0, 47%, 32%)";
          break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
          setState((prevState) => ({
            ...prevState,
            result: "IT ' S A DRAW 👏🏽 !      ",
            refresh: <i className="fa fa-refresh"></i>,
          }));
          winnerRef.current.style.color = "hsl(210, 18%, 30%)";
          break;
        default:
          setState(() => initialState);
      }
      // changing the src property of hands img depending on the user and computer choice
      setState((prevState) => ({
        ...prevState,
        userHandSrc: `./images/${state.userChoice}.png`,
        computerHandSrc: `./images/${state.computerChoice}.png`,
      }));
    }, 2000);
    return () => clearTimeout(timer);
  }, [state.userChoice, state.computerChoice]);

  return (
    <div>
      <h1>Rock - Paper - Scissors - React Game</h1>
      <div className="game">
        <div className="scores">
          <h2>You : {state.userScore}</h2>
          <h2>Computer : {state.computerScore}</h2>
        </div>
        <div className="hands">
          <img
            ref={playerHandRef}
            className="playerHand"
            src={state.userHandSrc}
            alt=""
            title="Your Hand"
            onAnimationEnd={() => (playerHandRef.current.style.animation = "")}
          />
          <img
            ref={computerHandRef}
            className="computerHand"
            src={state.computerHandSrc}
            alt=""
            title="Computer Hand"
            onAnimationEnd={() =>
              (computerHandRef.current.style.animation = "")
            }
          />
        </div>
        <h2 className="message" ref={MessageRef}>
          {state.message}
        </h2>
        <h2 className="winner" ref={winnerRef}>
          {state.result}
          <span onClick={() => Restart()} title="Restart">
            {state.refresh}
          </span>
        </h2>
        <div className="selections">{userSelectionButtons}</div>
      </div>
      <p className="githubIcon">
        Code on &nbsp;
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/alimadhibujar/React-Rock-Scissors-Paper"
        >
          <i className="fa fa-github" title="github"></i>
        </a>
      </p>
    </div>
  );
};
export default App;

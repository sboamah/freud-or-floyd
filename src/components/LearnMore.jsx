export default function LearnMore() {
  // function freudPron() {
  //   let pron = new Audio("assets/audios/freud_pronounce.mp3");
  //   pron.play();
  // }

  // function floydPron() {
  //   let pron = new Audio("assets/audios/floyd_pronounce.mp3");
  //   pron.play();
  // }
  return (
    <div className="center">
      <h1>How to Play</h1>
      <p>
        Press the button of the name you think the quote is from. Click "Next"
        to see the next question Click "See Score" to see your final score out
        of 100% (i.e. 3/5 questions correct is a 60% score). Displayed on the
        game is (respectively):
      </p>
      <ul>
        <li>Title of the Game</li>
        <li>Tagline</li>
        <li>Score Keeper</li>
        <li>Quote</li>
        <li>Current score vs. Highest score every recorded</li>
        <li>Buttons for each potential answer</li>
      </ul>
      <h1>Meet the choices:</h1>
      <h2>
        Sigmund Freud
        <img
          // onClick={freudPron}
          src="assets/images/soundIcon.png"
          alt="Sound Icon"
        />
      </h2>
      <img
        style={{ width: 200 }}
        src="assets/images/freudBio.jpg"
        alt="Sigmund Freud"
      />
      <p>
        Sigmund Freud was an Austrian neurologist and the founder of
        psychoanalysis.
      </p>

      <h2>
        Floyd Mayweather Jr.
        <img
          // onClick={floydPron}
          style={{ width: 20 }}
          src="assets/images/soundIcon.png"
          alt="Sound Icon"
        />
      </h2>
      <img
        style={{ width: 200 }}
        src="assets/images/floydBio.jpg"
        alt="Floyd Mayweather"
      />
      <p>
        Floyd Mayweather is an American boxing promoter and former boxer with a
        record of 26 consecutive wins in world title fights.
      </p>

      <a href="/">Back</a>
    </div>
  );
}

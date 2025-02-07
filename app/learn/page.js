import Link from "next/link";
import Image from "next/image";
export default function Page() {
  return (
    <>
    <div className="flex gap-4 flex-col mx-[100px]">
      <h1 className="font-serif text-5xl">How to Play</h1>
      <p>Press the button of the name you think the quote is from.</p>
      <p>Click &quot;Next&quot; to see the next question </p>
      <p>
        Click &quot;See Score&quot; to see your final score out of 100% (i.e.
        3/5 questions correct is a 60% score).
      </p>
      <p>Displayed on the game is (respectively):</p>
      <ul>
        <li>Title of the Game</li>
        <li>Tagline</li>
        <li>Score Keeper</li>
        <li>Quote</li>
        <li>Current score vs. Highest score every recorded</li>
        <li>Buttons for each potential answer</li>
      </ul>
      <hr />
      <h1>Meet the choices:</h1>
      <section className="grid grid-cols-2 gap-4">
        <div>
          <h2>Sigmund Freud</h2>
          <Image
            alt="Sigmund Freud"
            src="/freudBio.jpg"
            width={200}
            height={200}
            style={{ width: '100%', height: '200px' }}
          />
          <p>
            Sigmund Freud was an Austrian neurologist and the founder of
            psychoanalysis.
          </p>
        </div>
        <div>
          <h2>Floyd Mayweather Jr.</h2>
          <Image
            alt="Floyd Mayweather"
            src="/floydBio.jpg"
            width={200}
            height={200}
            style={{ width: '100%', height: '200px' }}
          />
          <p>
            Floyd Mayweather is an American boxing promoter and former boxer
            with a record of 26 consecutive wins in world title fights.
          </p>
        </div>
      </section>
      <Link
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        href="/"
        rel="noopener noreferrer"
      >
        Back
      </Link></div>
    </>
  );
}

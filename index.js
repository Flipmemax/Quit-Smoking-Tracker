// This Quit Smoking Tracker runs in the Terminal.
// It keeps track of how many days it has been since your quitdate, how much money this saved you and how many cigarettes you have NOT smoked!

// this program needs 4 arguments to run:
//<date> <priceperpack> <cigarettesperpack> <cigarettessmokedperday>

// Date format: month-day-year - examples: april -27-2021 / 04-27-2021 / 4-27-21
// Example:
// $ node index.js 04-27-2021 7.50 19 15

function validateNumberOfInputs(argv) {
  if (argv.length !== 6) {
    console.log(`
    You gave ${argv.length - 2} argument(s) to the program
    
    Please provide 4 arguments for
    
    Date: month-day-year / mm-dd-yyyy - Examples: april-27-2021 / 04-27-2021 / 4-27-21
    Price per pack
    Cigarettes per pack
    Cigarettes you smoke per day
    
    Example:

    $ node index.js 4-27-2021 7.50 19 19

    `);

    process.exit();
  }
}

function validateNumbers(
  priceperpack,
  cigarettepackvolume,
  cigarettesperday,
  argv
) {
  if (
    isNaN(priceperpack) ||
    isNaN(cigarettepackvolume) ||
    isNaN(cigarettesperday)
  ) {
    console.log(`
  Please make sure the following input is in numbers:

  Cost per pack, example: 7.50            | your input: ${argv[3]}
  Cigarettes in a pack, example: 19       | your input: ${argv[4]}
  Cigarettes smoked per day, example: 19  | your input: ${argv[5]}

  Example of full correct input:

  $ node index.js 4-27-2021 7.50 19 19

  `);

    process.exit();
  }

  if (cigarettesperday > cigarettepackvolume) {
    console.log(`
    Please make sure to give the right input.
    
    You can't possibly smoke more cigarettes than your pack contains, right?
    Or are you really going to tell me your pack contains ${argv[4]} cigarettes and you smoke ${argv[5]} cigarettes?
    
    Example of full correct input:
    
    $ node index.js 4-27-2021 7.50 19 15

    `);

    process.exit();
  }
}

function daysSinceQuitDay(date) {
  const qDay = new Date(date);
  (currentDate = new Date()),
    (difference = 0),
    (daysSince = 1000 * 60 * 60 * 24);

  const diff = currentDate - qDay;

  return Math.floor(diff / daysSince);
}

function costPerDayCalculator(
  day,
  packcost,
  cigarettesperday,
  cigarettepackvolume
) {
  const costs =
    cigarettesperday < cigarettepackvolume
      ? ((day * packcost) / cigarettepackvolume) * cigarettesperday
      : day * packcost;

  return costs.toFixed(2);
}

function cigarettesNotSmokedCalculator(day, cigarettesperday) {
  const cigarettesNotSmoked = day * cigarettesperday;
  return cigarettesNotSmoked;
}

function quoteGenerator(aquote) {
  const thisQuote = aquote[Math.floor(Math.random() * aquote.length)];
  return thisQuote;
}

function formatOutPut(userObject) {
  return `
    Congrats! You haven't smoked for ${userObject.quitDay} days
    You have saved your lungs from ${userObject.cigarettesNotSmoked} cigarettes!

    That's a great achievement! Keep up the good work!

    Not smoking has saved you €${userObject.moneySaved}!

    ${userObject.randomQuote}
    
`;
}

function quitSmokingTracker() {
  validateNumberOfInputs(process.argv);

  const quotes = require("./quotes.json");

  const quitDay = daysSinceQuitDay(process.argv[2]);
  const costPerPack = parseFloat(process.argv[3]);
  const cigarettesInAPack = parseInt(process.argv[4]);
  const cigarettesPerDay = parseInt(process.argv[5]);

  validateNumbers(
    costPerPack,
    cigarettesInAPack,
    cigarettesPerDay,
    process.argv
  );

  const cigarettesNotSmoked = cigarettesNotSmokedCalculator(
    quitDay,
    cigarettesPerDay
  );

  const moneySaved = costPerDayCalculator(
    quitDay,
    costPerPack,
    cigarettesPerDay,
    cigarettesInAPack
  );

  const randomQuote = quoteGenerator(quotes);

  const user = {
    quitDay: quitDay,
    costPerPack: costPerPack,
    cigarettesInAPack: cigarettesInAPack,
    cigarettesNotSmoked: cigarettesNotSmoked,
    moneySaved: moneySaved,
    randomQuote: randomQuote,
  };

  const outPut = formatOutPut(user);

  console.log(outPut);
}

quitSmokingTracker();

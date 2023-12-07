const path = "./day-1/input.txt";
const file = Bun.file(path);
const text = await file.text().then((res) => {
    getTotalSum(res);
});

// const input = `1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet`;

// const input2 = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`;

// getTotalSum(input2);

function findDigit(encodedString) {
    const listOfNumbers = {
        zero: "0",
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
    };
    const onlyDigits = new RegExp(
        /(?:zero|one|two|three|four|five|six|seven|eight|nine|orez|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|[0-9])/i
    );
    const matchedItem = encodedString.match(onlyDigits);
    // this means that we found a digit
    if (parseInt(matchedItem)) {
        return matchedItem[0];
    } else {
        // this means that we found a regular string
        if (listOfNumbers[matchedItem]) {
            return parseInt(listOfNumbers[matchedItem[0]]);
            // this means that we found a backward string
        } else {
            const matchedString = matchedItem[0];
            const reversedString = matchedString.split("").reverse().join("");
            return parseInt(listOfNumbers[reversedString]);
        }
    }
}

function getTotalSum(input) {
    const lines = input.split("\n");

    const numbers = [];
    lines.forEach((line) => {
        const prevReversed = line.split("").reverse().join("");
        const firstDigit = findDigit(line);
        const lastDigit = findDigit(prevReversed);
        const sumAsNumber = parseInt(
            firstDigit.toString() + lastDigit.toString()
        );
        if (sumAsNumber && sumAsNumber > 0) {
            numbers.push(sumAsNumber);
        }
    });
    console.log("total sum", numbers);
    const totalSum = numbers.reduce((prev, curr) => {
        return prev + curr;
    }, 0);
    console.log(totalSum);
}

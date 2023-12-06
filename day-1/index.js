const path = "./day-1/input.txt";
const file = Bun.file(path);
const text = await file.text().then((res) => {
    getTotalSum(res);
});

// const input = `1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet`;

function findDigit(encodedString) {
    const onlyDigits = new RegExp(/[0-9]/m);
    const firstIndex = encodedString.search(onlyDigits);
    if (firstIndex >= 0) {
        return encodedString[firstIndex];
    }
    return null;
}

function getTotalSum(input) {
    const lines = input.split("\n");

    const numbers = [];
    lines.forEach((line) => {
        const prevReversed = line.split("").reverse().join("");
        const firstDigit = findDigit(line);
        const lastDigit = findDigit(prevReversed);
        const sumAsNumber = parseInt(firstDigit + lastDigit);
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

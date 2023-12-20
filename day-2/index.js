const path = "./day-2/input.txt";
const file = Bun.file(path);
const text = await file.text().then((res) => {
    sumPossibleGames(res);
});

// const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

/*
expect
4 red, 2 green, 6 blue = 4 * 2 * 6 = 48
1 red, 3 green, 4 blue = 12
20 red, 13 green, 6 blue = 1560
14 red, 3, green, 15 blue = 630
6 red, 3 green, 2 blue = 36
total = 2286
*/

// sumPossibleGames(input);

function sumPossibleGames(input) {
    const lines = input.split("\n");

    const answer = lines.reduce((prevValue, currValue) => {
        const lineArray = currValue.split(":");
        const gamesListString = lineArray[1].trim();
        const gameId = parseInt(lineArray[0].split(" ")[1]);
        const gamesArray = gamesListString.split(";");

        const minimumNumberOfCubes = {
            red: 0,
            green: 0,
            blue: 0,
        };
        const possibleGames = gamesArray.reduce((previous, current) => {
            current
                .trim()
                .split(",")
                .map((el) => {
                    const blocksString = el.trim().split(" ");
                    const numberOfBlocks = parseInt(blocksString[0]);
                    if (
                        numberOfBlocks > minimumNumberOfCubes[blocksString[1]]
                    ) {
                        minimumNumberOfCubes[blocksString[1]] = numberOfBlocks;
                    }
                });
            return minimumNumberOfCubes;
        }, []);
        return (
            prevValue +
            possibleGames.red * possibleGames.green * possibleGames.blue
        );
    }, 0);
    console.log("answer", answer);
    return answer;
}

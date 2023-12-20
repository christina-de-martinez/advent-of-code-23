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

// sumPossibleGames(input);

function sumPossibleGames(input) {
    const lines = input.split("\n");

    const maximumNumberOfCubes = {
        red: 12,
        green: 13,
        blue: 14,
    };

    const answer = lines.reduce((prev, curr) => {
        const lineArray = curr.split(":");
        const gamesListString = lineArray[1].trim();
        const gameId = parseInt(lineArray[0].split(" ")[1]);
        const gamesArray = gamesListString.split(";");

        const possibleGames = gamesArray.filter((element) =>
            element
                .trim()
                .split(",")
                .every((el) => {
                    const blocksString = el.trim().split(" ");
                    const numberOfBlocks = parseInt(blocksString[0]);
                    return (
                        numberOfBlocks <= maximumNumberOfCubes[blocksString[1]]
                    );
                })
        );

        if (possibleGames.length === gamesArray.length) {
            return prev + gameId;
        }
        return prev;
    }, 0);

    console.log("answer", answer);

    return answer;
}

type Position = [number, number];

enum CellColor {
    Pink = 1,
    Lavender = 2,
    Peach = 3,
    Mint = 4
}

interface FloodFillConfig {
    img: number[][];
    startColor: number;
    newColor: number;
} 

const initializeFloodFill = (
    img: number[][],
    sr: number,
    sc: number,
    newColor: number
): FloodFillConfig | null => {

    const startColor = img[sr]?.[sc];

    if (startColor === undefined || startColor === newColor) {
        return null;
    }

    return {
        img,
        startColor,
        newColor
    };
}; 

const getNeighbors = (
    row: number,
    col: number,
    img: number[][]
): Position[] => {

    const neighbors: Position[] = [];
    if (row > 0) {
        neighbors.push([row - 1, col]);
    }

    if (row < img.length - 1) {
        neighbors.push([row + 1, col]);
    }

    if (col > 0) {
        neighbors.push([row, col - 1]);
    }
 
    const cols = img[0]?.length ?? 0;

    if (col < cols - 1) {
        neighbors.push([row, col + 1]);
    }

    return neighbors;
}; 

const floodFill = (
    img: number[][],
    sr: number,
    sc: number,
    newColor: number
): number[][] => {

    const config = initializeFloodFill(
        img,
        sr,
        sc,
        newColor
    );

    if (!config) {
        return img;
    }

    const queue: Position[] = [[sr, sc]];

    while (queue.length > 0) {

        const [r, c] = queue.shift()!;

        if (config.img[r]?.[c] === config.startColor) {

            config.img[r][c] = config.newColor;

            const neighbors = getNeighbors(r, c, config.img);

            queue.push(...neighbors);
        }
    }

    return config.img;
}; 

const image = [
    [1, 1, 1, 2, 2],
    [1, 1, 0, 2, 2],
    [1, 0, 1, 1, 1],
    [2, 2, 1, 0, 1],
    [2, 2, 1, 1, 1]
];

const result = floodFill(
    image,
    0,
    0,
    CellColor.Lavender
);

console.log(result); 

const grid = document.getElementById("grid");

if (grid) {

    result.forEach(row => {

        row.forEach(cell => {

            const div = document.createElement("div");

            div.classList.add("cell");

            switch (cell) {

                case CellColor.Pink:
                    div.classList.add("pink");
                    break;

                case CellColor.Lavender:
                    div.classList.add("lavender");
                    break;

                case CellColor.Peach:
                    div.classList.add("peach");
                    break;

                case CellColor.Mint:
                    div.classList.add("mint");
                    break;

                default:
                    div.classList.add("empty");
            }

            grid.appendChild(div);
        });
    });
}
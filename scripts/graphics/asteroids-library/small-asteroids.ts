export function createSmallAsteroidTypeOne() {
    // 40x40
    var newShape = new Kinetic.Line({
        x: 200,
        y: 200,
        points: [
            0, 0,
            30, 0,
            40, 40,
            0, 30,
            0, 0
        ],
        closed: true,
        // width: 40,
        // height: 40,
        stroke: 'yellowgreen',
        fill: 'transparent',
        offset: { x: 20, y: 20 }
    });

    return newShape;
}
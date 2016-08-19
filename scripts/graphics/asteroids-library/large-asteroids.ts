export function createLargeAsteroidTypeOne() {
    // 160x160
    var newShape = new Kinetic.Line({
        x: 200,
        y: 200,
        points: [
            40, 0,
            80, 0,
            160, 20,
            160, 80,
            40, 160,
            0, 120,
            0, 40,
            40, 0
        ],
        closed: true,
        // width: 160,
        // height: 160,
        stroke: 'yellowgreen',
        fill: 'transparent',
        offset: { x: 80, y: 80 }
    });

    return newShape;
}
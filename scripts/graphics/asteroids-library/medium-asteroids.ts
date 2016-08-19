export function createMediumAsteroidTypeOne() {
    // 80x80
    var newShape = new Kinetic.Line({
        x: 200,
        y: 200,
        points: [
            30, 0,
            70, 0,
            80, 50,
            70, 80,
            10, 80,
            0, 30,
            30, 0
        ],
        closed: true,
        width: 80,
        height: 80,
        stroke: 'yellowgreen',
        fill: 'transparent',
        offset: { x: 40, y: 40 }
    });

    return newShape;
}
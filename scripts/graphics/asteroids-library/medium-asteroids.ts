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

export function createMediumAsteroidTypeTwo() {
    // 80x80
    var newShape = new Kinetic.Line({
        x: 200,
        y: 200,
        points: [
            0, 0,
            50, 30,
            60, 0,
            80, 80,
            50, 50,
            20, 80,
            0, 80,
            30, 40,
            0, 0
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

export function createMediumAsteroidTypeThree() {
    // 80x80
    var newShape = new Kinetic.Line({
        x: 200,
        y: 200,
        points: [
            20, 0,
            30, 10,
            60, 0,
            80, 60,
            40, 80,
            30, 70,
            30, 60,
            0, 30,
            20, 0
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
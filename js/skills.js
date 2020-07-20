let Matter = require('matter-js');
let MatterWrap = require('matter-wrap');

$(document).ready(function () {

    let viewWidth = $(window).width();
    let viewHeight = $(window).height();

    let skills = [{
        name: "Mule",
        skill: 100,
        file: "mule.png"
    },{
        name: "html5",
        skill: 100,
        file: "html5icon.png"
    },{
        name: "React",
        skill: 100,
        file: "react-logo.png"
    },{
        name: "node",
        skill: 100,
        file: "nodejsicon.png"
    },{
        name: "heroku",
        skill: 100,
        file: "heroku_logo.png"
    },{
        name: "bootstrap",
        skill: 100,
        file: "bootstrapIcon.png"
    }];
    let path = 'assets/img/';

    var options = {
        isStatic: true,
        render: {
            fillStyle: '#bd5d38'
        }
    };

    let skillBodies = [];

    Matter.use(
        MatterWrap
    );
    //a change

    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    let canvasWidth = Math.min(viewWidth * .9, 800);
    let canvasHeight = canvasWidth * .75;
    let borderWidth = canvasWidth * .05;
    let numBalls = 5;
    let ballRadius = canvasWidth * .008;
    let gap = (canvasWidth - (numBalls * ballRadius * 2) - (2 * borderWidth)) / (numBalls + 1);
    let firstGap = gap + borderWidth;
    let firstGap2 = firstGap + ((gap + (ballRadius * 2)) / 2);
    let numBalls2 = numBalls - 1;
    let vGap = ((.5 * gap) - ballRadius) * 1.6;
    let vGapAdjusted = (2 * vGap) + (2 * ballRadius);
    let numRows = 6;
    let skillRadius = canvasWidth * .05
    let startHeightV = vGapAdjusted;
    let secondStartV = startHeightV - (2 * ballRadius) - vGap;

    let polygonRadius = canvasWidth * .075;

    // create engine
    var engine = Engine.create(),
        world = engine.world;
    // engine.timing.timeScale = .5;

    // console.log(document.getElementById("skillsDisplay"));
    // create renderer
    var render = Render.create({
        element: document.getElementById("skillsDisplay"),
        engine: engine,
        options: {
            width: canvasWidth,
            height: canvasHeight,
            background: 'white',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // var skillOptions = {
    //     background: '#bd5d38',
    //     render: {
    //         sprite: {
    //             texture: ''
    //         }
    //     }
    // }

    skills.forEach(skill => {
        let newBody = Bodies.circle(canvasWidth / 2, 100, skillRadius, {
            friction: .2,
            restitution: .85,
            density: .5,
            frictionAir: 0.03,
            render: {
                fillStyle: '#bd5d38',
                sprite: {
                    texture: path + skill.file,
                    xScale: (2 * skillRadius) / 100,
                    yScale: (2 * skillRadius) / 100
                }
            }
        });

        skillBodies.push(newBody);
    });

    World.add(world, skillBodies);

    // add bodies
    // var stack = Composites.stack(100, 100, 10, 5, 0, 0, function (x, y) {
    //     return Bodies.circle(x, y, Common.random(10, 20), { friction: .2, restitution: .85, density: .5, frictionAir: 0.03 });
    // });

    // World.add(world, stack);

    var staticStack = Composites.stack(firstGap, startHeightV, numBalls, numRows / 2, gap, vGapAdjusted, function (x, y) {
        return Bodies.circle(x, y, ballRadius, options);
    });

    var staticStack2 = Composites.stack(firstGap2, secondStartV, numBalls2, numRows / 2, gap, vGapAdjusted, function (x, y) {
        return Bodies.circle(x, y, ballRadius, options);
    });

    World.add(world, staticStack);
    World.add(world, staticStack2);

    // these static walls will not be rendered in this sprites example, see options
    let bumperWidth = canvasWidth * .2;

    // console.log(Math.sin(30) * -50);

    // var triangleStack = Composites.stack(borderWidth, secondStartV - (Math.sin(30) * -50), 2, 3, canvasWidth - 300, vGapAdjusted, function (x, y) {
    //     let angle = x > canvasWidth / 2 ? 0 : Math.PI;
    //     return Bodies.polygon(x, y, 3, 50, {isStatic: true, angle: angle , render: { fillStyle: '#bd5d38'}, chamfer: { radius: 5 } });
    // });
    // World.add(world, triangleStack);

    World.add(world, [
        // Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
        // Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
        // Bodies.circle(100, 100, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 }),
        // Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 }),
        // Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 }),
        Bodies.polygon(borderWidth, secondStartV + ballRadius, 3, polygonRadius, {isStatic: true, angle: Math.PI , render: { fillStyle: '#bd5d38'}, chamfer: { radius: 5 } }),
        Bodies.polygon(borderWidth, secondStartV + vGapAdjusted + (4*ballRadius) , 3, polygonRadius, {isStatic: true, angle: Math.PI , render: { fillStyle: '#bd5d38'}, chamfer: { radius: 5 } }),
        Bodies.polygon(borderWidth, secondStartV + (vGapAdjusted * 2) + (6*ballRadius) , 3, polygonRadius, {isStatic: true, angle: Math.PI , render: { fillStyle: '#bd5d38'}, chamfer: { radius: 5 } }),
        Bodies.polygon(canvasWidth - borderWidth, secondStartV + ballRadius, 3, polygonRadius, {isStatic: true, render: { fillStyle: '#bd5d38'}, chamfer: { radius: 5 } }),
        Bodies.polygon(canvasWidth - borderWidth, secondStartV + vGapAdjusted + (4*ballRadius) , 3, polygonRadius, {isStatic: true, render: { fillStyle: '#bd5d38'}, chamfer: { radius: 5 } }),
        Bodies.polygon(canvasWidth - borderWidth, secondStartV + (vGapAdjusted * 2) + (6*ballRadius) , 3, polygonRadius, {isStatic: true, render: { fillStyle: '#bd5d38'}, chamfer: { radius: 5 } }),
        // Bodies.circle(200, 100, 50, { isStatic: true }),
        // Bodies.rectangle(bumperWidth / 2, canvasHeight * .1, bumperWidth, 10, { isStatic: true, angle: Math.PI * 0.12, render: { fillStyle: '#bd5d38' }, chamfer: { radius: 5 } }),
        // Bodies.rectangle(canvasWidth - (bumperWidth / 2), canvasHeight * .1, bumperWidth, 10, { isStatic: true, angle: Math.PI * -0.12, render: { fillStyle: '#bd5d38' }, chamfer: { radius: 5 } }),
        Bodies.rectangle(borderWidth / 2, canvasHeight / 2, borderWidth, canvasHeight, options),
        Bodies.rectangle(canvasWidth - (borderWidth / 2), canvasHeight / 2, borderWidth, canvasHeight, options)
    ]);

    // World.add(world, [
    //     Bodies.rectangle(200, 150, 700, 20, { isStatic: true, angle: Math.PI * 0.06 }),
    //     Bodies.rectangle(500, 350, 700, 20, { isStatic: true, angle: -Math.PI * 0.06 }),
    //     Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04 })
    // ]);

    // add mouse control
    // var mouse = Mouse.create(render.canvas),
    //     mouseConstraint = MouseConstraint.create(engine, {
    //         mouse: mouse,
    //         constraint: {
    //             stiffness: 0.2,
    //             render: {
    //                 visible: false
    //             }
    //         }
    //     });

    // World.add(world, mouseConstraint);

    // // keep the mouse in sync with rendering
    // render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, Composite.allBodies(world));

    // console.log(render.bounds.min.x);
    // console.log(render.bounds.max.x);
    // console.log(render.bounds.min.y);
    // console.log(render.bounds.max.y);

    // wrapping using matter-wrap plugin
    for (var i = 0; i < skillBodies.length; i += 1) {
        skillBodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
    };

    // for (var i = 0; i < skillBodies.length; i += 1) {
    //     skillBodies[i].plugin.wrap = {
    //         min: { x: 200, y: 200 },
    //         max: { x: 800, y: 600 }
    //     };
    // };

});
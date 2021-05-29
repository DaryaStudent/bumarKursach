const randFuncEnum = {
    'DefaultRand' : Randomer.nextDefaultRand,
    'SimpleCongruence' : Randomer.nextSimpleCongruence,
    'LinearCongruence' : Randomer.nextLinearCongruence,
    'Triangle' : Randomer.nextTriangle,
    'Trapezoidal' : Randomer.nextTrapezoidal,
    'Gauss' : Randomer.nextGauss,
    'Muller' : Randomer.nextMuller,
    'Exp' : Randomer.nextExp,
    'Erlang' : Randomer.nextErlang,
    'HyperExp' : Randomer.nextHyperExp,
}

document.getElementById('funcSelect').onchange = function(e) {
    if (e.target.value === 'Exp' || e.target.value === 'HyperExp') {
        document.getElementById('lambda-wrapper').style.display = 'block';
    } else {
        document.getElementById('lambda-wrapper').style.display = 'none';
    }

    if (e.target.value === 'Erlang') {
        document.getElementById('order-wrapper').style.display = 'block';
    } else {
        document.getElementById('order-wrapper').style.display = 'none';
    }
}

document.getElementById('button').onclick = function () {
    let numsCnt = document.getElementById('numbersCnt').value;
    let groupsCnt = document.getElementById('groupsCnt').value;
    let methodName = document.getElementById('funcSelect').value;

    let lambda = document.getElementById('lambda').value;
    let order = document.getElementById('order').value;

    let randData = {
        min: 0,
        max: 1,
        lambda: lambda,
        order: order
    }

    let groups = Sprending.calcResMassive(numsCnt, groupsCnt, methodName, randData);

    let maxGroup = groups[0];
    for (let group of groups) {
        maxGroup = group > maxGroup ? group : maxGroup;
    }

    let data = {
        minX: 0,
        maxX: 1,
        maxY: maxGroup,
        groups: groups,
    }

    Renderer.setLayout(document.getElementById('graphicLayout'));
    Renderer.renderData(data);
}

document.getElementById('theme-selector').onchange = function(e) {
    switch (e.target.value) {
        case 'sklad':
            document.getElementById('sklad-wrapper').style.display = 'block';
            document.getElementById('sprending-wrapper').style.display = 'none';
            document.getElementById('proc-wrapper').style.display = 'none';
            break;
        case 'spreding':
            document.getElementById('sprending-wrapper').style.display = 'block';
            document.getElementById('sklad-wrapper').style.display = 'none';
            document.getElementById('proc-wrapper').style.display = 'none';
            break;
        case 'proc':
            document.getElementById('proc-wrapper').style.display = 'block';
            document.getElementById('sklad-wrapper').style.display = 'none';
            document.getElementById('sprending-wrapper').style.display = 'none';
            break;
    }
}


document.getElementById('canvas-btn').onclick = function () {
    let maxClientRequest = [
        [0,210,260,310,360,410],
        [48, 0, 152, 204, 256, 308],
        [32, 60, 0, 116, 144, 172],
        [20, 38, 56, 0, 92, 110],
        [12, 17, 22, 27, 0, 37],
        [5, 10, 15, 20, 25, 0],
    ]

    let minCntProduct = [
        Number.parseInt(document.getElementById('minProd1').value),
        Number.parseInt(document.getElementById('minProd2').value),
        Number.parseInt(document.getElementById('minProd3').value),
        Number.parseInt(document.getElementById('minProd4').value),
        Number.parseInt(document.getElementById('minProd5').value),
        Number.parseInt(document.getElementById('minProd6').value),
    ]

    let buyCntProd = [
        Number.parseInt(document.getElementById('buyProd1').value),
        Number.parseInt(document.getElementById('buyProd2').value),
        Number.parseInt(document.getElementById('buyProd3').value),
        Number.parseInt(document.getElementById('buyProd4').value),
        Number.parseInt(document.getElementById('buyProd5').value),
        Number.parseInt(document.getElementById('buyProd6').value),
    ]

    let startCntProd = [
        0,
        0,
        0,
        0,
        0,
        0
    ]

    let method = randFuncEnum[document.getElementById('skladFuncSelect').value];

    let days = 90;

    let obj = Sklad.simulate(startCntProd, minCntProduct, buyCntProd, maxClientRequest, days, method)
    console.log(obj)

    document.getElementById('coef').innerText = obj.sumSells/(obj.sumSells+obj.sumLosses)*100 + '%';

    SkladRenderer.setLayout(document.getElementById('sells-canvas'));
    SkladRenderer.render({
        maxY: obj.maxSellsY,
        maxX: obj.maxX,
        graphics : obj.graphicsSells,
    });

    SkladRenderer.setLayout(document.getElementById('looses-canvas'));
    SkladRenderer.render({
        maxY: obj.maxLoosesY,
        maxX: obj.maxX,
        graphics : obj.graphicsLooses,
    });
}
//
// let graphics = {
//     1 : {
//         graphic : [1,2,3,4,5],
//         color : '#0000FF'
//     },
//     2 : {
//         graphic : [2,3,4,5,6],
//         color : '#FF0000'
//     },
//     3 : {
//         graphic : [3,4,5,6,7],
//         color : '#00FF00'
//     },
//     4 : {
//         graphic : [4,5,6,7,8],
//         color : '#FF00FF'
//     },
//     5 : {
//         graphic : [5,6,7,8,9],
//         color : '#000000'
//     },
// }
// let obj = {
//     maxY: 9,
//     maxX: 5,
//     graphics : graphics
// }

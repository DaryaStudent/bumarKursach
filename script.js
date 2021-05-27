
const randFuncEnum = {
    'DefaultRand' : Randomer.nextDefaultRand,
    'SimpleCongruence' : Randomer.nextSimpleCongruence,
    'LinearCongruence' : Randomer.nextLinearCongruence,
    'Triangle' : Randomer.nextTriangle,
    'Trapezoidal' : Randomer.nextTrapezoidal,
    'Gauss' : Randomer.nextGauss,
    'Muller' : Randomer.nextMuller,
    'Exp' : Randomer.nextExp,
}


let button = document.getElementById('button');

document.getElementById('funcSelect').onchange = function(e) {
    if (e.target.value === 'Exp') {
        document.getElementById('lambda-wrapper').style.display = 'block';
    } else {
        document.getElementById('lambda-wrapper').style.display = 'none';
    }
}

button.onclick = function () {
    let numsCnt = document.getElementById('numbersCnt').value;
    let groupsCnt = document.getElementById('groupsCnt').value;
    let methodName = document.getElementById('funcSelect').value;

    let lambda = document.getElementById('lambda').value;

    let randData = {
        min: 0,
        max: 1,
        lambda: lambda
    }

    let groups = calcResMassive(numsCnt, groupsCnt, methodName, randData);
    console.log(groups);

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

function calcResMassive(numsCnt, groupsCnt, randName, randData){

    let randNext = randFuncEnum[randName];

    //randConfig//////////////////
    if (randName === 'SimpleCongruence' || randName === 'LinearCongruence') {
        randData.prevElem = 1;
    }
    //randConfigEnd///////////////

    let prevRand = randNext(randData);
    let randNums = [prevRand];
    min = prevRand;
    max = prevRand;
    randData.prevElem = prevRand;

    for (let i = 1; i < numsCnt; i++) {
        let curRandElem = randNext(randData);
        randData['prevElem'] = curRandElem;
        randNums.push(curRandElem);
        max = max < curRandElem ? curRandElem : max;
        min = min > curRandElem ? curRandElem : min;
    }

    let groupSize = (max - min) / groupsCnt;
    let groups = [];
    for (let i = 0; i < groupsCnt; i++) {
        groups[i] = 0;
    }

    console.log(randNums);

    let groupIndex = 0;
    for (let i = 0; i < numsCnt; i++) {
        groupIndex = Math.floor((randNums[i] - min) / groupSize);
        if (groupIndex === groupsCnt) {
            groupIndex--;
        }
        groups[groupIndex]++;
    }

    return groups;
}



// SkladRenderer.setLayout(document.getElementById('canvas'));
//
// document.getElementById('canvas-btn').onclick = function () {
//     SkladRenderer.render(obj);
// }
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

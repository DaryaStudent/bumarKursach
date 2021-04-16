
const randFuncEnum = {
    'DefaultRand' : Randomer.nextDefaultRand,
    'SimpleCongruence' : Randomer.nextSimpleCongruence,
    'LinearCongruence' : Randomer.nextLinearCongruence,
    'Triangle' : Randomer.nextTriangle,
    'Trapezoidal' : Randomer.nextTrapezoidal,
    'Gauss' : Randomer.nextGauss,
    'Muller' : Randomer.nextMuller,
}


let button = document.getElementById('button');

button.onclick = function () {
    let numsCnt = document.getElementById('numbersCnt').value;
    let groupsCnt = document.getElementById('groupsCnt').value;
    let methodName = document.getElementById('funcSelect').value;


    let groups = calcResMassive(numsCnt, groupsCnt, methodName);
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

function calcResMassive(numsCnt, groupsCnt, randName, min = 0, max = 1){

    let randNext = randFuncEnum[randName];

    //randConfig//////////////////
    let randData = {
        min: min,
        max: max,
    };

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

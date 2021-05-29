class Sprending{
    static calcResMassive(numsCnt, groupsCnt, randName, randData){

        let randNext = randFuncEnum[randName];

        //randConfig//////////////////
        if (randName === 'SimpleCongruence' || randName === 'LinearCongruence') {
            randData.prevElem = 1;
        }
        //randConfigEnd///////////////

        let prevRand = randNext(randData);
        let randNums = [prevRand];
        let min = prevRand;
        let max = prevRand;
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
}
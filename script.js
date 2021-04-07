function randomGenerator(min = 0, max = 1) {
    return Math.random() * (max - min);
}

function minusRandomGenerator(min = 0, max = 1) {
    return Math.random() * (max - min) * -1;
}

let functions = [randomGenerator, minusRandomGenerator];

let button = document.getElementById("inp-btn");
button.addEventListener('click', (e)=>{
    let numbersCnt = document.getElementById("inp1").value;
    let groupsCnt = document.getElementById("inp2").value;
    let funcInd = document.querySelector('input[name="radio1"]:checked').value;
    let groups = generateGroups(numbersCnt, groupsCnt, functions[funcInd])
    console.log(groups);
})

function generateGroups(numbersCnt, groupsCnt, func) {
    let groups = [];
    let groupSize = Math.ceil(numbersCnt/groupsCnt);

    let number = 0;
    let i = 0;
    while (i < numbersCnt) {
        number = func();
        groups[Math.floor(number/groupSize)].push(number);
        i++;
    }

    return groups;
}
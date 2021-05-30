
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
    document.getElementById('prod1Eff').innerText = obj.prodInfo.sells[0]/(obj.prodInfo.sells[0]+obj.prodInfo.looses[0])*100 + '%';
    document.getElementById('prod2Eff').innerText = obj.prodInfo.sells[1]/(obj.prodInfo.sells[1]+obj.prodInfo.looses[1])*100 + '%';
    document.getElementById('prod3Eff').innerText = obj.prodInfo.sells[2]/(obj.prodInfo.sells[2]+obj.prodInfo.looses[2])*100 + '%';
    document.getElementById('prod4Eff').innerText = obj.prodInfo.sells[3]/(obj.prodInfo.sells[3]+obj.prodInfo.looses[3])*100 + '%';
    document.getElementById('prod5Eff').innerText = obj.prodInfo.sells[4]/(obj.prodInfo.sells[4]+obj.prodInfo.looses[4])*100 + '%';
    document.getElementById('prod6Eff').innerText = obj.prodInfo.sells[5]/(obj.prodInfo.sells[5]+obj.prodInfo.looses[5])*100 + '%';

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

document.getElementById('startSim').onclick = function() {
    let maxTimeKeyBoard = document.getElementById('maxTimeKeyBoard').value;
    let maxTimeCpu = document.getElementById('maxTimeCpu').value;
    let maxTimePrint = document.getElementById('maxTimePrint').value;
    let maxTimeMonitor = document.getElementById('maxTimeMonitor').value;
    let simTime = document.getElementById('simTime').value;

    let res = ProcSim.start(maxTimeKeyBoard, maxTimeCpu, maxTimePrint, maxTimeMonitor, simTime)

    kolichestvoZadach.value = res[0];
    koefTimeClaviatura.value = res[1];
    koefTimeProcessor.value = res[2];
    koefTimePrinter.value = res[3];
    koefTimeMonitor.value = res[4];
    sumTimeClaviatura.value = res[5];
    sumTimeProcessor.value = res[6];
    sumTimePrinter.value = res[7];
    sumTimeMonitor.value = res[8];
    prostoyClaviatura.value = res[9];
    prostoyProcessor.value = res[10];
    prostoyPrinter.value = res[11];
    prostoyMonitor.value = res[12];
    sumFirstTypeTask.value = res[13];
    sumSecondTypeTask.value = res[14];

    avgTimeClaviatura.value = res[15];
    avgTimeProcessor.value = res[16];
    avgTimePrinter.value = res[17];
    avgTimeMonitor.value = res[18];

    console.log(res);
}
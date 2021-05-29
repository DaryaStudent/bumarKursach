class Sklad{

    static curCntProduct = undefined
    static minCntProduct = undefined
    static buyCntProduct = undefined
    static maxClientRequest = undefined
    static curDayRequest = undefined
    static days = 90
    static curDay = 0
    static method = Randomer.nextDefaultRand
    static sellsPerDay = []
    static notSellsPerDay = []

    static simulate(startCntProd, minCntProduct, buyCntProd, maxClientRequest, days, method){

        this.curCntProduct = startCntProd;
        this.minCntProduct = minCntProduct;
        this.buyCntProduct = buyCntProd;
        this.maxClientRequest = maxClientRequest;
        this.days = days;
        this.method = method;
        this.curDay = 0;

        for (this.curDay = 0; this.curDay < days; this.curDay++) {
            this.buyProducts();
            this.generateRequest();
            this.sellProducts();
        }
        console.log(this.notSellsPerDay)
        console.log(this.sellsPerDay)


        return this.getSellsSumPerDay()

    }

    static getSellsSumPerDay(){

        let sumSellsPerProduct = {
            0 : {
                graphic : [this.sellsPerDay[0][0]],
                color : '#0000FF'
            },
            1 : {
                graphic : [this.sellsPerDay[0][1]],
                color : '#FF0000'
            },
            2 : {
                graphic : [this.sellsPerDay[0][2]],
                color : '#00FF00'
            },
            3 : {
                graphic : [this.sellsPerDay[0][3]],
                color : '#FF00FF'
            },
            4 : {
                graphic : [this.sellsPerDay[0][4]],
                color : '#FFFF00'
            },
            5 : {
                graphic : [this.sellsPerDay[0][5]],
                color : '#000000'
            },
        }

        let sumLoosePerProduct = {
            0 : {
                graphic : [this.notSellsPerDay[0][0]],
                color : '#0000FF'
            },
            1 : {
                graphic : [this.notSellsPerDay[0][1]],
                color : '#FF0000'
            },
            2 : {
                graphic : [this.notSellsPerDay[0][2]],
                color : '#00FF00'
            },
            3 : {
                graphic : [this.notSellsPerDay[0][3]],
                color : '#FF00FF'
            },
            4 : {
                graphic : [this.notSellsPerDay[0][4]],
                color : '#FFFF00'
            },
            5 : {
                graphic : [this.notSellsPerDay[0][5]],
                color : '#000000'
            },
        }

        for (let curDay = 1; curDay < this.days; curDay++){
            for (let i = 0; i < 6; i++){
                sumSellsPerProduct[i].graphic.push(sumSellsPerProduct[i].graphic[curDay-1]+this.sellsPerDay[curDay][i])
                sumLoosePerProduct[i].graphic.push(sumLoosePerProduct[i].graphic[curDay-1]+this.notSellsPerDay[curDay][i])
            }
        }

        let maxSellsY = sumSellsPerProduct[0].graphic[this.days-1];
        let maxLoosesY = sumLoosePerProduct[0].graphic[this.days-1];
        let sumSells = 0;
        let sumLooses = 0;
        for (let i = 0; i < 6; i++){
            maxSellsY = Math.max(maxSellsY,sumSellsPerProduct[i].graphic[this.days-1])
            maxLoosesY = Math.max(maxLoosesY,sumLoosePerProduct[i].graphic[this.days-1])
            sumSells += sumSellsPerProduct[i].graphic[this.days-1];
            sumLooses += sumLoosePerProduct[i].graphic[this.days-1];
        }

        return {
            sumSells: sumSells,
            sumLosses: sumLooses,
            maxSellsY: maxSellsY,
            maxLoosesY: maxLoosesY,
            maxX: this.days,
            graphicsSells : sumSellsPerProduct,
            graphicsLooses : sumLoosePerProduct
        };
    }

    static sellProducts(){
        this.sellsPerDay[this.curDay] = [];
        this.notSellsPerDay[this.curDay] = [];
        for (let i = 0; i < 6; i++) {
            if (this.curDayRequest[i] <= this.curCntProduct[i]) {
                this.sellsPerDay[this.curDay][i] = this.curDayRequest[i];
                this.curCntProduct[i] -= this.curDayRequest[i];
                this.notSellsPerDay[this.curDay][i] = 0;
            } else {
                this.notSellsPerDay[this.curDay][i] = this.curDayRequest[i] - this.curCntProduct[i];
                this.sellsPerDay[this.curDay][i] = this.curCntProduct[i];
                this.curCntProduct[i] = 0;
            }
        }
    }

    static generateRequest(){
        this.curDayRequest = [];
        for (let i = 0; i < 6; i++)
            for (let j = 0; j < 6; j++) {
                if (!this.curDayRequest[i])
                    this.curDayRequest[i] = 0;
                this.curDayRequest[i] += Math.round(this.method({min: 0, max: this.maxClientRequest[i][j]}))
            }
    }

    static buyProducts(){
        for (let i in this.curCntProduct) {
            if (this.curCntProduct[i] <= this.minCntProduct[i]) {
                this.curCntProduct[i] += this.buyCntProduct[i];
            }
        }
    }
}
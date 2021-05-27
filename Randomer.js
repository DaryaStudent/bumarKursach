class Randomer {

    //done
    static nextDefaultRand(data = {min:0, max:2147483647}) {
        return Math.random() * (data.max - data.min) + data.min;
    }

    //done
    static nextTriangle(data = {min:0, max:1}) {
        let randData = {
            min : data.min,
            max : data.max/2,
        };
        let firstNumber = Randomer.nextDefaultRand(randData);
        let secondNumber = Randomer.nextDefaultRand(randData);
        return firstNumber + secondNumber;
    }

    static nextLinearCongruence(data = {min:0, max:1, prevElem:1}) {
        let m = Math.pow(2, 21);
        let a = 325;
        let c = 1337;

        return (a * data.prevElem + c) % m;
    }

    static nextSimpleCongruence(data = {min:0, max:1, prevElem:1}) {
        let a = 1337;
        let p = Math.pow(10, 16);
        return ((a * data.prevElem) % p);
    }

    //done
    static nextTrapezoidal(data = {min:0, max:1}) {
        let l1 = (data.max - data.min)/4;
        let firstNumber = Randomer.nextDefaultRand({min:data.min, max:data.min + l1});
        let secondNumber = Randomer.nextDefaultRand({min:data.min, max:data.max/2 + l1});
        return firstNumber + secondNumber;
    }

    static nextGauss(data = {min:0, max:1}) {
        let n = 12;
        let sigma = Math.sqrt(12 / n);
        let randStandard = Randomer.nextDefaultRand();

        for (let index = 0; index < n; index++)
        {
            randStandard += Randomer.nextDefaultRand();
        }

        return sigma * (randStandard - (n / 2));
    }

    static nextMuller(data = {min:0, max:1}) {
        let mx = 0;
        let sigma = 1;

        let firstNumber = 1 - Randomer.nextDefaultRand({min:0, max:1});
        let secondNumber = 1 - Randomer.nextDefaultRand({min:0, max:1});
        let randCalculatedNormal = Math.sqrt(-2 * Math.log(firstNumber)) * Math.sin(2 * Math.PI * secondNumber);

        return mx + sigma * randCalculatedNormal;
    }

    static nextExp(data = {min:0, max:1, lambda: 1}){
        return -Math.log(Math.random() * (data.max - data.min) + data.min)/data.lambda;
    }
}
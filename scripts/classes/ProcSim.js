class ProcSim{
    static start(maxTimeKeyBoard, maxTimeProc, maxTimePrint, maxTimeMonitor, simTime) {

        let sumTimeClaviatura = 0.0;
        let koefTimeClaviatura = 0;
        let sumTimeProcessor = 0.0;
        let koefTimeProcessor = 0;
        let sumTimePrinter = 0.0;
        let koefTimePrinter = 0;
        let sumTimeMonitor = 0.0;
        let koefTimeMonitor = 0;
        let kolichestvoZadach = 0;

        let prostoyPrinter = 0;
        let prostoyProcessor1 = 0;
        let prostoyProcessor2 = 0;
        let prostoyClaviatura = 0;
        let prostoyMonitor = 0;

        let isMonitorReady = true;
        let isPrinterReady = true;
        let isFirstMachineWork = false;
        let isSecondMachineWork = false;

        let endOfFirst = -1;
        let endOfSecond = -1;
        let endOfPrint = -1;
        let endOfScreen = -1;
        let endOfType = -1;

        let isTypoReady = true;

        let firstTypeTask = false;
        let secondTypeTask = false;
        let sumFirstTypeTask = 0.0;
        let sumSecondTypeTask = 0.0;

        let firstTypeTasks = new Queue();
        let secondTypeTasks = new Queue();
        let toPrinter = new Queue();
        let toMonitor = new Queue();

        let r = new Random();
        let r1 = new Random();
        let r2 = new Random();

        firstTypeTasks.Enqueue(1);
        secondTypeTasks.Enqueue(1);

        for (let i = 0; i < simTime; i++)
        {
            if (i == endOfType)
            {
                var task = r.Next(1, 3);

                if (task == 1) firstTypeTasks.Enqueue(1);

                else secondTypeTasks.Enqueue(1);

                isTypoReady = true;
            }

            if (i == endOfPrint)
            {
                isPrinterReady = true;

                if (toPrinter.Any())
                {
                    toPrinter.Dequeue();
                    isPrinterReady = false;

                    var time = GetTime(maxTimePrint, r1);
                    endOfPrint = i + time;
                    sumTimePrinter += time;
                    koefTimePrinter++;
                }
            }

            if (i == endOfScreen)
            {
                isMonitorReady = true;

                if (toMonitor.Any())
                {
                    toMonitor.Dequeue();
                    isMonitorReady = false;

                    var time = GetTime(maxTimeMonitor, r1);
                    endOfScreen = i + time;
                    sumTimeMonitor += time;
                    koefTimeMonitor++;
                }
            }

            if (i == endOfFirst)
            {
                isFirstMachineWork = false;

                kolichestvoZadach++;

                if (firstTypeTask)
                {
                    sumSecondTypeTask++;

                    firstTypeTask = false;

                    if (isMonitorReady)
                    {
                        isMonitorReady = false;

                        var time = GetTime(maxTimeMonitor, r1);
                        endOfScreen = i + time;
                        sumTimeMonitor += time;

                        koefTimeMonitor++;
                    }

                    else toMonitor.Enqueue(1);
                }
                else
                {
                    sumFirstTypeTask++;

                    if (isPrinterReady)
                    {
                        isPrinterReady = false;

                        var time = GetTime(maxTimePrint, r1);
                        endOfPrint = i + time;
                        sumTimePrinter += time;

                        koefTimePrinter++;
                    }
                    else toPrinter.Enqueue(1);
                }
            }

            if (i == endOfSecond)
            {
                isSecondMachineWork = false;

                kolichestvoZadach++;

                if (secondTypeTask)
                {
                    sumFirstTypeTask++;
                    secondTypeTask = false;

                    if (isMonitorReady)
                    {
                        isMonitorReady = false;

                        var time = GetTime(maxTimeMonitor, r1);
                        endOfScreen = i + time;
                        sumTimeMonitor += time;

                        koefTimeMonitor++;
                    }

                    else toMonitor.Enqueue(1);
                }
                else
                {
                    sumSecondTypeTask++;
                    if (isPrinterReady)
                    {
                        isPrinterReady = false;

                        var time = GetTime(maxTimePrint, r1);
                        endOfPrint = i + time;
                        sumTimePrinter += time;

                        koefTimePrinter++;
                    }

                    else toPrinter.Enqueue(1);
                }
            }

            if (!isFirstMachineWork)
            {
                if (secondTypeTasks.Any())
                {
                    firstTypeTask = true;

                    var time = GetTime(maxTimeProc, r1);
                    endOfFirst = i + time;
                    sumTimeProcessor += time;

                    koefTimeProcessor++;
                    isFirstMachineWork = true;
                    secondTypeTasks.Dequeue();
                }

                else
                {
                    if (firstTypeTasks.Any())
                    {
                        var time = GetTime(maxTimeProc, r1);
                        endOfFirst = i + time;
                        sumTimeProcessor += time;

                        koefTimeProcessor++;
                        isFirstMachineWork = true;
                        firstTypeTasks.Dequeue();
                    }
                }
            }

            if (!isSecondMachineWork)
            {
                if (secondTypeTasks.Any())
                {
                    secondTypeTask = true;

                    var time = GetTime(maxTimeProc, r1);
                    endOfSecond = i + time;
                    sumTimeProcessor += time;

                    koefTimeProcessor++;
                    isSecondMachineWork = true;
                    secondTypeTasks.Dequeue();
                }

                else
                {
                    if (firstTypeTasks.Any())
                    {
                        var time = GetTime(maxTimeProc, r1);
                        endOfSecond = i + time;
                        sumTimeProcessor += time;

                        koefTimeProcessor++;
                        isSecondMachineWork = true;
                        firstTypeTasks.Dequeue();
                    }
                }
            }

            if (isStartOfPrint(r2) && isTypoReady)
            {
                isTypoReady = false;

                var time = GetTime(maxTimeKeyBoard, r1);
                endOfType = i + time;
                sumTimeClaviatura += time;

                koefTimeClaviatura++;
            }

            if (isPrinterReady)
            {
                prostoyPrinter++;
            }

            if (isMonitorReady)
            {
                prostoyMonitor++;
            }

            if (isFirstMachineWork)
            {
                prostoyProcessor1++;
            }

            if (isSecondMachineWork)
            {
                prostoyProcessor2++;
            }

            if (isTypoReady)
            {
                prostoyClaviatura++;
            }
        }

        // textBoxKolichestvoZadach.Text = Convert.ToString(kolichestvoZadach);

        // if (koefTimeClaviatura != 0)
        // {
        //     textBoxKoefTimeClaviatura.Text = Convert.ToString(sumTimeClaviatura / dlitelnostRaboti);
        // }

        // if (koefTimeProcessor != 0)
        // {
        //     textBoxKoefTimeProcessor.Text = Convert.ToString(sumTimeProcessor / dlitelnostRaboti); 
        // }

        // if (koefTimePrinter != 0)
        // {
        //     textBoxKoefTimePrinter.Text = Convert.ToString(sumTimePrinter / dlitelnostRaboti); 
        // }

        // if (koefTimeMonitor != 0)
        // {
        //     textBoxKoefTimeMonitor.Text = Convert.ToString(sumTimeMonitor / dlitelnostRaboti); 
        // }

        // textBoxSumTimeClaviatura.Text = Convert.ToString(sumTimeClaviatura);
        // textBoxSumTimeProcessor.Text = Convert.ToString(sumTimeProcessor);
        // textBoxSumTimePrinter.Text = Convert.ToString(sumTimePrinter);
        // textBoxSumTimeMonitor.Text = Convert.ToString(sumTimeMonitor);

        // textBoxVremyaProstoyaClaviatura.Text = Convert.ToString(prostoyClaviatura);
        // textBoxVremyaProstoyaPrinter.Text = Convert.ToString(prostoyPrinter);
        // textBoxVremyaProstoyaMonitor.Text = Convert.ToString(prostoyMonitor);

        // textBoxZadachi1Tip.Text = Convert.ToString(Convert.ToInt32((sumFirstTypeTask / kolichestvoZadach) * 100));
        // textBoxZadachi2Tip.Text = Convert.ToString(Convert.ToInt32((sumSecondTypeTask / kolichestvoZadach) * 100));

        return [
            kolichestvoZadach,
            sumTimeClaviatura / simTime,
            sumTimeProcessor / simTime,
            sumTimePrinter / simTime,
            sumTimeMonitor / simTime,
            sumTimeClaviatura,
            sumTimeProcessor,
            sumTimePrinter,
            sumTimeMonitor,
            prostoyClaviatura,
            prostoyPrinter,
            prostoyMonitor,
            (sumFirstTypeTask / kolichestvoZadach) * 100,
            (sumSecondTypeTask / kolichestvoZadach) * 100
        ]
    }
}


class Queue{
    first = undefined;
    last = undefined;
    length = 0;

    Enqueue = function(elem) {
        elem = {
            data: elem,
            prev: undefined,
            next: undefined,
        }
        if (this.length > 0) {
            elem.prev = this.last;
            this.last.next = elem;
            this.last = elem;
        } else {
            this.first = elem;
            this.last = elem;
        }
        this.length++;
    }

    Dequeue = function() {
        if (this.length === 0) {
            return null;
        }
        let data = this.first.data;
        if (this.length > 1){
        this.first = this.first.next;
        this.first.prev.next = undefined;
        this.first.prev = undefined;
        } else {
            this.first = undefined;
            this.last = undefined;
        }
        this.length--;
        return data;
    }

    Any = function() {
        return this.first ? true : false;
    }
}

class Random{
    Next(min, max){
        return Math.round(Math.random() * (max-min + 1) + min - 0.5)
    }
}

function GetTime(max, r){
    return r.Next(1, max);
}

function isStartOfPrint(r){
    return r.Next(1, 100) < 20;
}

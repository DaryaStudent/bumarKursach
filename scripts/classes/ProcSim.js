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

        let isKeyBoardReady = true;

        let firstTypeTask = false;
        let secondTypeTask = false;
        let sumFirstTypeTask = 0.0;
        let sumSecondTypeTask = 0.0;

        let firstTypeTasks = new Queue();
        let secondTypeTasks = new Queue();
        let toPrinter = new Queue();
        let toMonitor = new Queue();

        let r = new Random();

        firstTypeTasks.Enqueue(1);
        secondTypeTasks.Enqueue(1);

        for (let i = 0; i < simTime; i++)
        {
            if (i === endOfType)
            {
                let task = r.Next(1, 3);

                if (task === 1) firstTypeTasks.Enqueue(1);
                else secondTypeTasks.Enqueue(1);

                isKeyBoardReady = true;
            }

            if (i === endOfPrint)
            {
                isPrinterReady = true;

                if (toPrinter.Any())
                {
                    toPrinter.Dequeue();
                    isPrinterReady = false;

                    let time = r.Next(1, maxTimePrint);
                    endOfPrint = i + time;
                    sumTimePrinter += Math.min(time, simTime-i);
                    koefTimePrinter++;
                }
            }

            if (i === endOfScreen)
            {
                isMonitorReady = true;

                if (toMonitor.Any())
                {
                    toMonitor.Dequeue();
                    isMonitorReady = false;

                    let time = r.Next(1, maxTimeMonitor);
                    endOfScreen = i + time;
                    sumTimeMonitor += Math.min(time, simTime-i);
                    koefTimeMonitor++;
                }
            }

            if (i === endOfFirst)
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

                        let time = r.Next(1, maxTimeMonitor);
                        endOfScreen = i + time;
                        sumTimeMonitor += Math.min(time, simTime-i);

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

                        let time = r.Next(1, maxTimePrint);
                        endOfPrint = i + time;
                        sumTimePrinter += Math.min(time, simTime-i);

                        koefTimePrinter++;
                    }
                    else toPrinter.Enqueue(1);
                }
            }

            if (i === endOfSecond)
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

                        let time = r.Next(1, maxTimeMonitor);
                        endOfScreen = i + time;
                        sumTimeMonitor += Math.min(time, simTime-i);

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

                        let time = r.Next(1, maxTimePrint);
                        endOfPrint = i + time;
                        sumTimePrinter += Math.min(time, simTime-i);

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

                    let time = r.Next(1, maxTimeProc);
                    endOfFirst = i + time;
                    sumTimeProcessor += Math.min(time, simTime-i);

                    koefTimeProcessor++;
                    isFirstMachineWork = true;
                    secondTypeTasks.Dequeue();
                }

                else
                {
                    if (firstTypeTasks.Any())
                    {
                        let time = r.Next(1, maxTimeProc);
                        endOfFirst = i + time;
                        sumTimeProcessor += Math.min(time, simTime-i);

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

                    let time = r.Next(1, maxTimeProc);
                    endOfSecond = i + time;
                    sumTimeProcessor += Math.min(time, simTime-i);

                    koefTimeProcessor++;
                    isSecondMachineWork = true;
                    secondTypeTasks.Dequeue();
                }

                else
                {
                    if (firstTypeTasks.Any())
                    {
                        let time = r.Next(1, maxTimeProc);
                        endOfSecond = i + time;
                        sumTimeProcessor += Math.min(time, simTime-i);

                        koefTimeProcessor++;
                        isSecondMachineWork = true;
                        firstTypeTasks.Dequeue();
                    }
                }
            }

            if (isStartOfPrint(r) && isKeyBoardReady)
            {
                isKeyBoardReady = false;

                let time = r.Next(1, maxTimeKeyBoard);
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

            if (isKeyBoardReady)
            {
                prostoyClaviatura++;
            }
        }

        return [
            kolichestvoZadach,
            sumTimeClaviatura / simTime,
            sumTimeProcessor / simTime / 2,
            sumTimePrinter / simTime,
            sumTimeMonitor / simTime,
            sumTimeClaviatura,
            sumTimeProcessor,
            sumTimePrinter,
            sumTimeMonitor,
            prostoyClaviatura,
            simTime*2 - sumTimeProcessor,
            prostoyPrinter,
            prostoyMonitor,
            sumFirstTypeTask,
            sumSecondTypeTask
        ]
    }
}


class Queue{
    first = undefined;
    last = undefined;
    length = 0;

    Enqueue = (elem) => {
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

    Dequeue = () => {
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

    Any = () => {
        return !!this.first;
    }
}

class Random{
    Next(min, max){
        return Math.round(Math.random() * (max-min + 1) + min - 0.5)
    }
}

function isStartOfPrint(r){
    return r.Next(1, 100) < 20;
}

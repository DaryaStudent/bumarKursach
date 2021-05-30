class ProcSim {
    static start(maxTimeKeyBoard, maxTimeProc, maxTimePrint, maxTimeMonitor, simTime) {

        let sumTimeClaviatura = 0.0;
        let keyBoardTasksCnt = 0;
        let sumTimeCpu = 0.0;
        let cpuTasksCnt = 0;
        let sumTimePrinter = 0.0;
        let printerTasksCnt = 0;
        let sumTimeMonitor = 0.0;
        let monitorTasksCnt = 0;
        let allTasksCnt = 0;
        let inactiveTimePrinter = 0;
        let inactiveTimeCpu1 = 0;
        let inactiveTimeCpu2 = 0;
        let inactiveTimeKeyBoard = 0;
        let inactiveTimeMonitor = 0;
        let isKeyBoardReady = true;
        let isMonitorReady = true;
        let isPrinterReady = true;
        let isFirstCpuActive = false;
        let isSecondCpuActive = false;
        let endTimeOfFirstCpuActive = -1;
        let endTimeOfSecondCpuActive = -1;
        let endTimeOfPrint = -1;
        let endTimeOfScreen = -1;
        let endTimeOfKeyBoard = -1;
        let firstTypeTask = false;
        let secondTypeTask = false;
        let sumFirstTypeTask = 0.0;
        let sumSecondTypeTask = 0.0;
        let firstTypeTaskQueue = new Queue();
        let secondTypeTasksQueue = new Queue();
        let toPrinterTaskQueue = new Queue();
        let toMonitorTaskQueue = new Queue();
        let random = new Random();
        firstTypeTaskQueue.Enqueue(1);
        secondTypeTasksQueue.Enqueue(1);

        for (let curTime = 0; curTime < simTime; curTime++) {

            if (curTime === endTimeOfKeyBoard) {
                let task = random.Next(1, 3);
                if (task === 1) firstTypeTaskQueue.Enqueue(1);
                else secondTypeTasksQueue.Enqueue(1);
                isKeyBoardReady = true;
            }

            if (curTime === endTimeOfPrint) {
                isPrinterReady = true;
                if (toPrinterTaskQueue.Any()) {
                    toPrinterTaskQueue.Dequeue();
                    isPrinterReady = false;
                    let time = random.Next(1, maxTimePrint);
                    endTimeOfPrint = curTime + time;
                    sumTimePrinter += Math.min(time, simTime - curTime);
                    printerTasksCnt++;
                }
            }

            if (curTime === endTimeOfScreen) {
                isMonitorReady = true;
                if (toMonitorTaskQueue.Any()) {
                    toMonitorTaskQueue.Dequeue();
                    isMonitorReady = false;
                    let time = random.Next(1, maxTimeMonitor);
                    endTimeOfScreen = curTime + time;
                    sumTimeMonitor += Math.min(time, simTime - curTime);
                    monitorTasksCnt++;
                }
            }

            if (curTime === endTimeOfFirstCpuActive) {
                isFirstCpuActive = false;
                allTasksCnt++;
                if (firstTypeTask) {
                    sumSecondTypeTask++;
                    firstTypeTask = false;
                    if (isMonitorReady) {
                        isMonitorReady = false;
                        let time = random.Next(1, maxTimeMonitor);
                        endTimeOfScreen = curTime + time;
                        sumTimeMonitor += Math.min(time, simTime - curTime);
                        monitorTasksCnt++;
                    } else {
                        toMonitorTaskQueue.Enqueue(1);
                    }
                } else {
                    sumFirstTypeTask++;
                    if (isPrinterReady) {
                        isPrinterReady = false;
                        let time = random.Next(1, maxTimePrint);
                        endTimeOfPrint = curTime + time;
                        sumTimePrinter += Math.min(time, simTime - curTime);
                        printerTasksCnt++;
                    } else {
                        toPrinterTaskQueue.Enqueue(1);
                    }
                }
            }

            if (curTime === endTimeOfSecondCpuActive) {
                isSecondCpuActive = false;
                allTasksCnt++;
                if (secondTypeTask) {
                    sumFirstTypeTask++;
                    secondTypeTask = false;
                    if (isMonitorReady) {
                        isMonitorReady = false;
                        let time = random.Next(1, maxTimeMonitor);
                        endTimeOfScreen = curTime + time;
                        sumTimeMonitor += Math.min(time, simTime - curTime);
                        monitorTasksCnt++;
                    } else {
                        toMonitorTaskQueue.Enqueue(1);
                    }
                } else {
                    sumSecondTypeTask++;
                    if (isPrinterReady) {
                        isPrinterReady = false;
                        let time = random.Next(1, maxTimePrint);
                        endTimeOfPrint = curTime + time;
                        sumTimePrinter += Math.min(time, simTime - curTime);
                        printerTasksCnt++;
                    } else toPrinterTaskQueue.Enqueue(1);
                }
            }

            if (!isFirstCpuActive) {
                if (secondTypeTasksQueue.Any()) {
                    firstTypeTask = true;
                    let time = random.Next(1, maxTimeProc);
                    endTimeOfFirstCpuActive = curTime + time;
                    sumTimeCpu += Math.min(time, simTime - curTime);
                    cpuTasksCnt++;
                    isFirstCpuActive = true;
                    secondTypeTasksQueue.Dequeue();
                } else {
                    if (firstTypeTaskQueue.Any()) {
                        let time = random.Next(1, maxTimeProc);
                        endTimeOfFirstCpuActive = curTime + time;
                        sumTimeCpu += Math.min(time, simTime - curTime);
                        cpuTasksCnt++;
                        isFirstCpuActive = true;
                        firstTypeTaskQueue.Dequeue();
                    }
                }
            }

            if (!isSecondCpuActive) {
                if (secondTypeTasksQueue.Any()) {
                    secondTypeTask = true;
                    let time = random.Next(1, maxTimeProc);
                    endTimeOfSecondCpuActive = curTime + time;
                    sumTimeCpu += Math.min(time, simTime - curTime);
                    cpuTasksCnt++;
                    isSecondCpuActive = true;
                    secondTypeTasksQueue.Dequeue();
                } else {
                    if (firstTypeTaskQueue.Any()) {
                        let time = random.Next(1, maxTimeProc);
                        endTimeOfSecondCpuActive = curTime + time;
                        sumTimeCpu += Math.min(time, simTime - curTime);
                        cpuTasksCnt++;
                        isSecondCpuActive = true;
                        firstTypeTaskQueue.Dequeue();
                    }
                }
            }

            if (isStartOfPrint(random) && isKeyBoardReady) {
                isKeyBoardReady = false;
                let time = random.Next(1, maxTimeKeyBoard);
                endTimeOfKeyBoard = curTime + time;
                sumTimeClaviatura += Math.min(time, simTime - curTime);
                keyBoardTasksCnt++;
            }

            inactiveTimePrinter += isPrinterReady ? 1 : 0;
            inactiveTimeMonitor += isMonitorReady ? 1 : 0;
            inactiveTimeCpu1 += isFirstCpuActive ? 1 : 0;
            inactiveTimeCpu2 += isSecondCpuActive ? 1 : 0;
            inactiveTimeKeyBoard += isKeyBoardReady ? 1 : 0;
        }

        return [
            allTasksCnt,
            sumTimeClaviatura / simTime,
            sumTimeCpu / simTime / 2,
            sumTimePrinter / simTime,
            sumTimeMonitor / simTime,
            sumTimeClaviatura,
            sumTimeCpu,
            sumTimePrinter,
            sumTimeMonitor,
            inactiveTimeKeyBoard,
            simTime * 2 - sumTimeCpu,
            inactiveTimePrinter,
            inactiveTimeMonitor,
            sumFirstTypeTask,
            sumSecondTypeTask,
            sumTimeClaviatura / keyBoardTasksCnt,
            sumTimeCpu / cpuTasksCnt,
            sumTimePrinter / printerTasksCnt,
            sumTimeMonitor / monitorTasksCnt,
        ]
    }
}


class Queue {
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
        if (this.length > 1) {
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

class Random {
    Next(min, max) {
        return Math.round(Math.random() * (max - min + 1) + min - 0.5)
    }
}

function isStartOfPrint(r) {
    return r.Next(1, 100) < 20;
}

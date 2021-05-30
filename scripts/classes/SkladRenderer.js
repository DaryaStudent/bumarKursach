class SkladRenderer {

    static layout = undefined
    static layoutHeight = undefined
    static layoutWidth = undefined
    static ctx = undefined
    static realGraphicTopX = undefined
    static realGraphicTopY = undefined
    static realGraphicBotX = undefined
    static realGraphicBotY = undefined
    static realGraphicWidth = undefined
    static realGraphicHeight = undefined
    static maxX = undefined
    static maxY = undefined

    static setLayout(elem){
        this.layout = elem;
        this.layoutWidth = elem.width;
        this.layoutHeight = elem.height;
        this.ctx = elem.getContext('2d');
        this.realGraphicBotX = 30;
        this.realGraphicTopX = this.layoutWidth - 30;
        this.realGraphicTopY = 30;
        this.realGraphicBotY = this.layoutHeight - 30;
        this.realGraphicWidth = this.realGraphicTopX - this.realGraphicBotX;
        this.realGraphicHeight = this.realGraphicBotY - this.realGraphicTopY;
    }

    static render(data){
        SkladRenderer.clearLayout();
        SkladRenderer.renderInterface(data);
        SkladRenderer.renderGraphics(data);
    }

    static renderOsi(){
        let ctx = this.ctx;

        ctx.fillStyle = "black"; // Задаём чёрный цвет для линий
        ctx.lineWidth = 1.0; // Ширина линии
        ctx.beginPath(); // Запускает путь
        ctx.moveTo(this.realGraphicBotX, this.realGraphicTopY); // Указываем начальный путь
        ctx.lineTo(this.realGraphicBotX, this.realGraphicBotY); // Перемешаем указатель
        ctx.lineTo(this.realGraphicTopX, this.realGraphicBotY); // Ещё раз перемешаем указатель
        ctx.stroke(); // Делаем контур
    }

    static renderOy(data){
        let ctx = this.ctx;
        ctx.fillStyle = "black"; // Задаём чёрный цвет для линий
        ctx.lineWidth = 1.0; // Ширина линии

        let extra = Math.pow(10,Math.floor(Math.log10(data.maxY))-1)
        let maxY = Math.ceil(data.maxY / extra) * extra;
        this.maxY = maxY;
        for(let i = 0; i < 6; i++) {
            ctx.fillText((5-i)*(maxY/5) + "", 0, i * this.realGraphicHeight/5 + this.realGraphicTopY + 2);
            ctx.beginPath();
            ctx.moveTo(this.realGraphicBotX - 2, i * this.realGraphicHeight/5 + this.realGraphicTopY);
            ctx.lineTo(this.realGraphicBotX + 2, i * this.realGraphicHeight/5 + this.realGraphicTopY);
            ctx.stroke();
        }
    }

    static renderOx(data){
        let ctx = this.ctx;
        ctx.fillStyle = "black"; // Задаём чёрный цвет для линий
        ctx.lineWidth = 1.0; // Ширина линии

        let maxX = data.maxX
        this.maxX = maxX;
        for(let i = 0; i < 6; i++) {
            ctx.fillText(i * Math.floor(maxX/5) + "", i * this.realGraphicWidth/5 + this.realGraphicTopY - 3, this.realGraphicBotY + 15);
            ctx.beginPath();
            ctx.moveTo(i * this.realGraphicWidth/5 + this.realGraphicTopY, this.realGraphicBotY - 2);
            ctx.lineTo(i * this.realGraphicWidth/5 + this.realGraphicTopY, this.realGraphicBotY + 2);
            ctx.stroke();
        }
    }

    static renderGrid(){
        let ctx = this.ctx;
        ctx.fillStyle = "black"; // Задаём чёрный цвет для линий
        ctx.lineWidth = 1.0; // Ширина линии

        for(let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(this.realGraphicBotX, i * this.realGraphicHeight/5 + this.realGraphicTopY);
            ctx.lineTo(this.realGraphicBotX + this.realGraphicWidth, i * this.realGraphicHeight/5 + this.realGraphicTopY);
            ctx.stroke();
        }

        for(let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(i * this.realGraphicWidth/5 + this.realGraphicTopY, this.realGraphicBotY - this.realGraphicHeight);
            ctx.lineTo(i * this.realGraphicWidth/5 + this.realGraphicTopY, this.realGraphicBotY);
            ctx.stroke();
        }
    }

    static renderInterface(data){
        this.renderOsi();
        this.renderOx(data);
        this.renderOy(data);
        this.renderGrid(data);
    }

    static renderGraphics(data){
        console.log(data)
        for (let product in data.graphics) {
            this.renderGraphic(data.graphics[product])
        }
    }

    static renderGraphic(data){

        let ctx = this.ctx;
        // ctx.fillStyle = data.color;
        ctx.strokeStyle = data.color;
        ctx.lineWidth = 1.0;

        let prevX = this.realGraphicBotX;
        let prevY = this.realGraphicBotY;
        let curX = undefined;
        let curY = undefined;
        let x = 0;
        for (let y of data.graphic){
            if (x++ > this.maxY) {
                break;
            }

            curX = this.realGraphicBotX + (x/this.maxX)*this.realGraphicWidth;
            curY = this.realGraphicBotY - (y/this.maxY)*this.realGraphicHeight;

            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(curX,curY);
            ctx.stroke();

            prevX = curX;
            prevY = curY;
        }
    }

    static clearLayout(){
        this.ctx.clearRect(0, 0, this.layout.width, this.layout.height);
    }
}
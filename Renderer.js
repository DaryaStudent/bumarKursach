class Renderer {

    static layout = undefined;
    static layoutHeight = 0;

    static setLayout(domElem) {
        this.layout = domElem;
        this.layoutHeight = domElem.clientHeight;
    }

    static renderData(data) {
        //cleaning
        while (Renderer.layout.firstChild) {
            Renderer.layout.removeChild(Renderer.layout.firstChild);
        }

        //rendering
        let groups = data.groups;
        for (let group of groups) {
            let column = Renderer._createColumnDomElem(group / data.maxY * Renderer.layoutHeight);
            Renderer.layout.appendChild(column);
        }
    }

    static _createColumnDomElem(height) {
        let column = document.createElement('div');
        column.classList.add('graphicColumn');
        column.style.height = height + 'px';
        return column;
    }
}
export default class BaseRecorder {
    constructor() {
        this.elements = [];
    }

    setElements(elements) {
        this.elements = [...elements];
    }
}

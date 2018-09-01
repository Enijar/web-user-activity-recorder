import BaseRecorder from "./BaseRecorder";

export default class ClickRecorder extends BaseRecorder {
    recorder = 'click';

    start(startTime) {
        this.startTime = startTime;

        document.addEventListener('click', this.handleClick);
    }

    stop() {
        document.removeEventListener('click', this.handleClick);
    }

    record(event) {
        const timestamp = Date.now() - this.startTime;
        const element = event.target.nodeName.toLowerCase();

        this.updateData({timestamp, element});
    }

    handleClick = event => this.record(event);
}

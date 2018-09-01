import BaseRecorder from "./BaseRecorder";

export default class ResizeRecorder extends BaseRecorder {
    recorder = 'resize';

    start(startTime) {
        this.startTime = startTime;

        this.record();
        window.addEventListener('resize', this.handleResize);
    }

    stop() {
        window.removeEventListener('resize', this.handleResize);
    }

    record() {
        const timestamp = Date.now() - this.startTime;
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.updateData({timestamp, width, height});
    }

    handleResize = () => this.record();
}

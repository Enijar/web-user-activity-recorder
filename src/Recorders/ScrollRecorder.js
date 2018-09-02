import BaseRecorder from "./BaseRecorder";

export default class ScrollRecorder extends BaseRecorder {
    recorder = 'scroll';

    start(startTime) {
        this.startTime = startTime;

        this.record();
        window.addEventListener('scroll', this.handleScroll);
    }

    stop() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    record() {
        const timestamp = Date.now() - this.startTime;
        const {documentElement} = document;
        const x = (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0);
        const y = (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0);

        this.updateSession({timestamp, x, y});
    }

    handleScroll = () => this.record();
}

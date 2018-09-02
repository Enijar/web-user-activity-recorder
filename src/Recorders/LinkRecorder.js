import BaseRecorder from "./BaseRecorder";

export default class LinkRecorder extends BaseRecorder {
    recorder = 'link';
    links = [];

    start(startTime) {
        this.startTime = startTime;
        this.links = [...document.querySelectorAll('a')];

        this.links.map(link => link.addEventListener('click', this.handleClick));
    }

    stop(stopTime) {
        this.links.map(link => link.removeEventListener('click', this.handleClick));
    }

    record(event) {
        const timestamp = Date.now() - this.startTime;
        const {href} = event.target;

        this.updateSession({timestamp, href});
    }

    handleClick = event => this.record(event);
}

import ClickRecorder from "./Recorders/ClickRecorder";
import FormRecorder from "./Recorders/FormRecorder";
import LinkRecorder from "./Recorders/LinkRecorder";
import ResizeRecorder from "./Recorders/ResizeRecorder";
import ScrollRecorder from "./Recorders/ScrollRecorder";

export default class Recorder {
    startTime = 0;
    stopTime = 0;

    recorders = [
        new ScrollRecorder(),
        new LinkRecorder(),
        new ClickRecorder(),
        new ResizeRecorder(),
        new FormRecorder()
    ];

    start() {
        this.startTime = Date.now();

        this.recorders.map(recorder => recorder.start(this.startTime));

        console.info('Recording...');
    }

    stop() {
        this.stopTime = Date.now();

        this.recorders.map(recorder => recorder.stop(this.stopTime));

        console.info('Recording stopped');
    }

    getReport() {
        let reports = [];

        this.recorders.map(recorder => reports = reports.concat(recorder.getReport()));

        console.log('reports', reports);
    }
}

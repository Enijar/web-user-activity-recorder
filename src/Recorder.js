import ClickRecorder from "./Recorders/ClickRecorder";
import FormRecorder from "./Recorders/FormRecorder";
import LinkRecorder from "./Recorders/LinkRecorder";
import ResizeRecorder from "./Recorders/ResizeRecorder";
import ScrollRecorder from "./Recorders/ScrollRecorder";
import {uploadSegment, uuid} from "./utils";
import {STORAGE_KEY, SESSION_TIMEOUT} from "./consts";

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

        const sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        sessions.session = sessions.session || {};

        if (!sessions.session.lastUpdate || Date.now() - sessions.session.lastUpdate >= SESSION_TIMEOUT) {
            // Start new session
            sessions.session.id = uuid();
            sessions.session.lastUpdate = Date.now();
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));

        this.recorders.map(recorder => recorder.start(this.startTime));

        console.info('Recording...');

        // Upload all locally-stored session segments
        sessions.segments && sessions.segments.map(segment => uploadSegment(sessions, segment));
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

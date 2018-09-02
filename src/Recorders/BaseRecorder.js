import {STORAGE_KEY} from "../consts";
import {uuid, uploadSegment} from "../utils";

export default class BaseRecorder {
    startTime = 0;
    recorder = null;
    segments = [];

    getReport() {
        return this.segments;
    }

    updateSession(segment) {
        segment.sessionStartTime = this.startTime;
        segment.recorder = this.recorder;

        const sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        sessions.segments = sessions.segments || [];
        segment.sessionId = sessions.session.id;
        segment.id = uuid();

        sessions.segments.push(segment);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        this.segments.push(segment);

        uploadSegment(sessions, segment);
    }
}

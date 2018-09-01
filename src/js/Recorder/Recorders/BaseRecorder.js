const STORAGE_KEY = 'web_user_activity_recorder';

export default class BaseRecorder {
    startTime = 0;
    nodes = [];
    recorder = null;
    data = [];

    start() {
        //
    }

    stop() {
        //
    }

    getReport() {
        return this.data;
    }

    updateData(data) {
        data.sessionStartTime = this.startTime;
        data.recorder = this.recorder;

        // TODO: Switch to IndexedDB?
        // TODO: Sync data with server and delete from localStorage once synced
        const recordedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        recordedData.segments = recordedData.segments || [];
        recordedData.segments.push(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recordedData));

        this.data.push(data);
    }
}

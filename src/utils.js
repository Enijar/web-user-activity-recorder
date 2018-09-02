import {STORAGE_KEY, SEGMENT_URL} from "./consts";

const uuid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const uploadSegment = (sessions, segment) => new Promise(async resolve => {
    try {
        const res = await fetch(SEGMENT_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({segment})
        });

        const {success} = await res.json();

        if (success) {
            const sessions = JSON.parse(localStorage.getItem(STORAGE_KEY));
            sessions.segments = sessions.segments.filter(s => s.id !== segment.id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        }
    } catch (err) {
        //
    }

    resolve();
});

export {uuid, uploadSegment}

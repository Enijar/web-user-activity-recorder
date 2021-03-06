import BaseRecorder from "./BaseRecorder";
import {WHITELISTED_ELEMENTS} from "../consts";

const HIDE_DATA = true;
const getFields = elements => elements.filter(element => WHITELISTED_ELEMENTS.includes(element.nodeName.toLowerCase()));
const getFormData = (elements = []) => getFields(elements).map(field => {
    const {type, name, value} = field;
    const data = {type, name, value};

    if (HIDE_DATA) {
        data.value = ''.padStart(data.value.length, '*');
    }

    return data;
});

export default class FormRecorder extends BaseRecorder {
    recorder = 'form';
    forms = [];
    fields = [];

    start(startTime) {
        this.startTime = startTime;
        this.forms = [...document.querySelectorAll('form')];

        this.forms.map(form => {
            const fields = getFields([...form.elements]);
            this.fields = this.fields.concat(fields);
        });
        this.forms.map(form => form.addEventListener('submit', this.handleSubmit));
        this.fields.map(field => field.addEventListener('input', this.handleInput));
    }

    stop() {
        this.forms.map(form => form.removeEventListener('submit', this.handleSubmit));
        this.fields.map(field => field.removeEventListener('input', this.handleInput));
    }

    handleInput = event => {
        const timestamp = Date.now() - this.startTime;
        const action = 'input';
        const {type, name, value} = event.target;
        const data = {type, name, value};

        if (HIDE_DATA) {
            data.value = ''.padStart(data.value.length, '*');
        }

        this.updateSession({timestamp, action, data});
    };

    handleSubmit = event => {
        const timestamp = Date.now() - this.startTime;
        const action = 'submit';
        const data = getFormData([...event.target.elements]);

        this.updateSession({timestamp, action, data});
    };
}

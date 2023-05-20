import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');

const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const save_FormData = () => {
	const form_Data = {
		email: emailInput.value,
		message: messageInput.value,
	};
	localStorage.setItem('feedback-form-state', JSON.stringify(form_Data));
};

const load_FormData = () => {
	const savedData = localStorage.getItem('feedback-form-state');
	const { email, message } = savedData ? JSON.parse(savedData) : {};
	emailInput.value = email;
	messageInput.value = message;
};

const handleSubmit = event => {
	event.preventDefault();

	const form_Data = {
		email: emailInput.value,
		message: messageInput.value,
	};

	localStorage.removeItem('feedback-form-state');

	emailInput.value = '';
	messageInput.value = '';

	console.log(form_Data);
};

form.addEventListener('input', throttle(save_FormData, 500));
window.addEventListener('DOMContentLoaded', load_FormData);
form.addEventListener('submit', handleSubmit);

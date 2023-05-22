import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const saveFormData = () => {
	const formData = {
		email: emailInput.value,
		message: messageInput.value,
	};
	localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const loadFormData = () => {
	const savedData = localStorage.getItem('feedback-form-state');
	if (savedData) {
		const { email, message } = JSON.parse(savedData);
		emailInput.value = email;
		messageInput.value = message;
	}
};

const handleSubmit = event => {
	event.preventDefault();

	const formData = {
		email: emailInput.value,
		message: messageInput.value,
	};

	localStorage.removeItem('feedback-form-state');

	emailInput.value = '';
	messageInput.value = '';

	console.log(formData);
};

form.addEventListener('input', throttle(saveFormData, 500));
window.addEventListener('DOMContentLoaded', loadFormData);
form.addEventListener('submit', handleSubmit);

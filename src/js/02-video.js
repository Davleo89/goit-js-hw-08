import Vimeo from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const asynchronous = async () => {
	try {
		const time_Seconds = await player.getCurrentTime();
		localStorage.setItem('current-time', time_Seconds);
	} catch (error) {
		console.error('Error getting the current playing time of the video', error);
	}
};

player.on('play', throttle(asynchronous, 1000));

const current_Time = localStorage.getItem('current-time');
current_Time ? player.setCurrentTime(current_Time) : null;

import Vimeo from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

player.on(
	'play',
	throttle(async () => {
		try {
			const timeSeconds = await player.getCurrentTime();
			localStorage.setItem('current-time', timeSeconds);
		} catch (error) {
			console.error(
				'Error getting the current playing time of the video',
				error
			);
		}
	}, 1000)
);

const currentTime = localStorage.getItem('current-time');
currentTime ? player.setCurrentTime(currentTime) : null;

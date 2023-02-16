'use client';
import { useEffect, useState } from 'react';

export default function Page() {
	//
	const [recognition, setRecognition] = useState(null);

	//
	useEffect(() => {
		const recognition = new window.webkitSpeechRecognition();
		//
		recognition.continous = true;
		recognition.interimResulst = false;
		recognition.lan = 'en-US';

		//
		recognition.addEventListener('result', onSpeakReulsts);

		setRecognition(recognition);
	}, []);

	//
	const handleOnSpeakStart = () => {
		recognition.start();
	};

	const handleOnSpeakStop = () => {
		recognition.stop();
	};

	const onSpeakReulsts = (speechEvent: any) => {
		console.log('on results');
		// get all transcripts: it can be muiltiple resulsts but the one with the highest onfidence makes sense
		for (const res of speechEvent.results) {
			console.log('text said:', res[0].transcript);
		}
	};

	return (
		<div className='w-screen h-screen flex flex-col items-center justify-center'>
			<button onClick={handleOnSpeakStart}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-6 h-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z'
					/>
				</svg>
			</button>

			<button onClick={handleOnSpeakStop}>Stop</button>
		</div>
	);
}

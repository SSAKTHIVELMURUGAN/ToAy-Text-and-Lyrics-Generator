// Check browser support for SpeechRecognition
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
        console.log('Speech recognition started');
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        document.getElementById('transcription').value = finalTranscript;
    };

    document.getElementById('startButton').addEventListener('click', () => {
        recognition.start();
        document.getElementById('startButton').disabled = true;
        document.getElementById('stopButton').disabled = false;
    });

    document.getElementById('stopButton').addEventListener('click', () => {
        recognition.stop();
        document.getElementById('startButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
    });
} else {
    console.error('Speech recognition not supported by this browser');
}

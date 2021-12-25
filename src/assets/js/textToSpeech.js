const textToSpeech = (text) => {
	var msg = new SpeechSynthesisUtterance();
	msg.text = text;
	window.speechSynthesis.speak(msg);
	return msg
};

export default textToSpeech
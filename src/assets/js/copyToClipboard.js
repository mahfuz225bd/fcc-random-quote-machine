export default const copyToClipboard = (text) => {
	navigator.clipboard.writeText(text);
};
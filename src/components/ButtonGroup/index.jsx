import PropTypes from 'prop-types';
import styles from './ButtonGroup.module.css';

export default function ButtonGroup({
	btnSpeakAction,
	btnCopyAction,
	btnNewQuoteAction,
	disableButtons,
	speaking
}) {
	return (
		<div className={styles['button-group']}>
	{/* <button
				id="btnSpeak"
				title="Speak quote"
				onClick={btnSpeakAction}
				disabled={disableButtons || speaking}				
			>
				<i className="fas fa-microphone" aria-hidden="true"></i> {speaking ? 'Speaking' : 'Speak'}
			</button>
			<button
				title="Copy quote"
				onClick={btnCopyAction}
				disabled={disableButtons}
			>
				<i className="fas fa-copy" aria-hidden="true"></i> Copy
			</button> */}
			<button
				title="Get new quote"
				onClick={btnNewQuoteAction}
				disabled={disableButtons}
			>
				New Quote
			</button>
		</div>
	);
}

ButtonGroup.propTypes = {
	btnCopyAction: PropTypes.func.isRequired,
	btnNewQuoteAction: PropTypes.func.isRequired,
	btnSpeakAction: PropTypes.func.isRequired,
	disableButtons: PropTypes.bool.isRequired,
	speaking: PropTypes.bool.isRequired
};

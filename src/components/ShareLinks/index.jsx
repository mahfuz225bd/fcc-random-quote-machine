import React from 'react';
import PropTypes from 'prop-types';
import styles from './ShareLinks.module.css';

export default function ShareLinks({ shareText, disableButtons }) {
	return (
		<div className={styles['share-links']}>
			<a
				href={`https://www.facebook.com/dialog/feed?
	&app_id=593793028397202
	&link=https%3A%2F%2Fwww.quickanddirtytips.com%2Fsites%2Fdefault%2Ffiles%2Fimages%2F204%2Fquotation-marks.jpg
	&display=popup
	&quote=${encodeURIComponent(shareText)}
	&hashtag=#quotes`}
				title="Share with facebook"
				target="_blank"
				rel="noreferrer"
				hidden={disableButtons}
			>
				<i className="fab fa-facebook-square" aria-hidden="true"></i>
			</a>

			<a
				href={`https://twitter.com/intent/tweet?
		hashtags=quotes
		&text=${encodeURIComponent(shareText)}`}
				title="Share with twitter"
				target="_blank"
				rel="noreferrer"
				hidden={disableButtons}
			>
				<i className="fab fa-twitter-square" aria-hidden="true"></i>
			</a>
		</div>
	);
}

ShareLinks.propTypes = {
	shareText: PropTypes.string.isRequired,
	disableButtons: PropTypes.bool.isRequired,
};

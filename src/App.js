import React, { Component, createRef } from 'react';
import styles from './App.module.css';

import getRandomColor from './assets/js/getRandomColor';
import copyToClipboard from './assets/js/copyToClipboard';
import textToSpeech from './assets/js/textToSpeech';

import ShareLinks from './components/ShareLinks';
import ButtonGroup from './components/ButtonGroup';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quotes: [],
			quote: '',
			author: '',
			color: '',
			disableButtons: false,
			animatedQuote: false,
			speaking: false,
		};

		this.refMsgCopied = createRef();
	}

	componentDidMount() {
		fetch(
			'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
		)
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					quotes: data.quotes,
				});

				this.changeRandomQuote();
			})
			.catch((err) => console.error(err));
	}

	componentDidUpdate() {
		// Changing random color
		const root = document.querySelector(':root');
		root.style.setProperty('--color', this.state.color);
	}

	changeRandomQuote = () => {
		// Disable buttons + enable animateQuote
		this.setState({
			disableButtons: true,
			animatedQuote: true,
		});

		// Empty quote and author from state
		this.setState({
			quote: '',
			author: '',
		});

		// Get random quote form state
		const getRandomQuote =
			this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)];

		// Set random quote to state with delaying 1s and make disable=false of #btnNewQuote + remove .animated of #quoteSign
		setTimeout(() => {
			this.setState({
				quote: getRandomQuote.quote,
				author: getRandomQuote.author,
				color: getRandomColor(),
			});

			this.setState({
				disableButtons: false,
				animatedQuote: false,
			});
		}, 1000);
	};

	render() {
		const { quote, author, disableButtons, animatedQuote, speaking } =
			this.state;
		const quoteNarration = `${author} said, "${quote}"`;
		return (
			<div className={styles['wrapper']}>
				{/* Alert message, if copied */}
				<div className={styles['msg-copied']} ref={this.refMsgCopied}>
					<i className="fas fa-check-circle" aria-hidden="true"></i> Copied!
				</div>
				<main className={styles['quote-container']}>
					{/* Quote body */}
					<section className={styles['quote-body']}>
						<p>
							<span
								className={
									animatedQuote
										? `${styles['quote-sign']} ${styles['animated']}`
										: styles['quote-sign']
								}
							>
								<i className="fas fa-quote-left" aria-hidden="true"></i>
							</span>
							{quote}
						</p>
						<span className={styles['author']}>- {author}</span>
					</section>

					{/* Quote footer */}
					<section className={styles['quote-footer']}>
						<ShareLinks shareText={quoteNarration} hideLinks={disableButtons} />
						<ButtonGroup
							btnSpeakAction={() => {
								this.setState({
									speaking: true,
								});

								const speak = textToSpeech(quoteNarration);
								speak.onend = () => {
									this.setState({
										speaking: false,
									});
								};
							}}
							btnCopyAction={() => {
								copyToClipboard(quoteNarration);
								alert('Copied');
							}}
							btnNewQuoteAction={() => this.changeRandomQuote()}
							disableButtons={disableButtons}
							speaking={speaking}
						/>
					</section>
				</main>
				<footer>
					by{' '}
					<a
						href="http://codepen.io/mahfuz225bd"
						target="_blank"
						rel="noreferrer"
					>
						Muhammad Sultan Al Mahfuz
					</a>
					.
				</footer>
			</div>
		);
	}
}

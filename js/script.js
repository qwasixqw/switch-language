'use strict';

const allLangs = ['ru', 'en', 'de'];
let currentLang = localStorage.getItem('lang') || checkBrowserLang() ||'ru';

const langButtons = document.querySelectorAll('[data-btn]');
const currentPathName = window.location.pathname;

let currentTextObj = {};

const homeTexts = {
	'home_page-title': {
		ru: 'Домашняя страница',
		en: 'Homepage',
		de: 'Startseite',
	},
	'home_page-1': {
		ru: 'Первый параграф',
		en: 'First paragraph',
		de: 'Erster Paragraph',
	},
	'home_page-2': {
		ru: 'Второй параграф',
		en: 'Second paragraph',
		de: 'Zweiter Absatz',
	},
	'home_page-3': {
		ru: 'Третий параграф',
		en: 'Third paragraph',
		de: 'Dritter Absatz',
	},
	'home_page-4': {
		ru: 'Другая страница',
		en: 'Another page',
		de: 'Eine andere Seite',
	},
};
const anotherTexts = {
	'another_page-title': {
		ru: 'Другая страница',
		en: 'Another page',
		de: 'Eine andere Seite',
	},
	'another_page-1': {
		ru: 'Первый параграф',
		en: 'First paragraph on another page',
		de: 'Erster Paragraph auf einer anderen Seite',
	},
	'another_page-2': {
		ru: 'Второй параграф',
		en: 'Second paragraph on another page',
		de: 'Zweiter Absatz auf einer anderen Seite',
	},
	'another_page-3': {
		ru: 'Третий параграф',
		en: 'Third paragraph on another page',
		de: 'Dritter Absatz auf einer anderen Seite',
	},
	'another_page-4': {
		ru: 'Домашняя страница',
		en: 'Homepage',
		de: 'Startseite',
	},
};

function checkPathName() {
	switch (currentPathName) {
		case '/index.html':
			currentTextObj = homeTexts;
			break;
		case '/another_page.html':
			currentTextObj = anotherTexts;
			break;
		default:
			currentTextObj = homeTexts;
			break;
	}
}
checkPathName();

function changeLength() {
	for (const key in currentTextObj) {
		const elem = document.querySelector(`[data-lang="${key}"]`);

		if (elem) {
			elem.textContent = currentTextObj[key][currentLang];
		}
	}
}
changeLength();

langButtons.forEach((btn) => {
	btn.addEventListener('click', (event) => {
		currentLang = event.target.dataset.btn;

		localStorage.setItem('lang', currentLang);

		resetActiveClass(langButtons, 'header__btn_active');

		btn.classList.add('header__btn_active');

		changeLength();
	});
});

function resetActiveClass(arr, active) {
	arr.forEach((item) => {
		item.classList.remove(active);
	});
}

function checkActiveLangButton() {
	switch(currentLang) {
		case 'ru':
			langButtons[0].classList.add('header__btn_active');
			break;
		case 'en':
			langButtons[1].classList.add('header__btn_active');
			break;
		case 'de':
			langButtons[2].classList.add('header__btn_active');
			break;
		default:
			langButtons[0].classList.add('header__btn_active');
			break;
	}
}

checkActiveLangButton();

function checkBrowserLang() {
	const navLang = navigator.language.slice(0, 2).toLowerCase();
	const result = allLangs.some((lang) => lang === navLang);

	if (result) {
		return navLang;
	}
}
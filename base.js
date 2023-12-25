//base 

import './struct.js';

//scripties: a small javascript generated element, run inner text to generate html structure
var handleScripties = () => {
	$el('[scr-on]').forEach(el => el.replaceChildren(...new Function(el.innerText)()))
}

var router = $router();
router.on('after-update', () => handleScripties());
handleScripties();
router.attachToDom()
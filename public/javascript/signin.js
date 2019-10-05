
	const signinButton = document.getElementById('signinbutton')
	const registerButton = document.getElementById('registerbutton')
	const menu1 = document.getElementById('menu1');
	const menu2 = document.getElementById('menu2');
	const content = document.getElementById('content');
	const x = window.matchMedia("(max-width: 767px)")
	const buttons = document.getElementsByClassName('buttons');

	
	//  signinButton.addEventListener('click', (e) => {
	// 	if (menu1.style.display === 'none') {
	// 		menu1.style.display = 'block'
	// 		menu2.style.display = 'none'
	// 	} else {
	// 		menu2.style.display = 'none'
			
	// 	}
	// })

	// registerButton.addEventListener('click', (e) => {
	// 	if (menu2.style.display === 'none') {
	// 		menu2.style.display = 'block'
	// 		menu1.style.display = 'none'
	// 	} else {
	// 		menu1.style.display = 'none'
	// 	}
	// })

	
	
	 const siginHandler = () => {
		if (menu1.style.display === 'none') {
			menu1.style.display = 'block'
			menu2.style.display = 'none'
		} else {
			menu2.style.display = 'none'
			
		}
	}

	const	registerHandler = () => {
		if (menu2.style.display === 'none') {
			menu2.style.display = 'block'
			menu1.style.display = 'none'
		} else {
			menu1.style.display = 'none'
		}
	}

	const removeTab = (x) => {	
		if (x.matches) { // If media query matches
			menu1.style.display = 'none'
			signinButton.addEventListener('click', siginHandler)
			registerButton.addEventListener('click', registerHandler)			
			content.classList.remove('content-tab');		
		} else {
			menu1.style.display = 'block'
			menu2.style.display = 'block'
			buttons.style.display = 'none'
			signinButton.removeEventListener('click', siginHandler)
			registerButton.removeEventListener('click', registerHandler)
			content.classList.add('content-tab');
			}
	}



removeTab(x) // Call listener function at run time
x.addListener(removeTab) // Attach listener function on state changes 
	


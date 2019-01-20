var container = document.getElementById('container');
var randomword = words[Math.floor(Math.random() * words.length)];
var letters = [];
var row = 1;

function rows() {
	for (var i = 1; i <= 5; i++) {
		for (var a = 0; a < randomword.length; a++) {
			var box = document.createElement('input');
			box.id = 'box'+ i + '_' + a;
			box.maxlength = '1';
			document.getElementById('container').appendChild(box);
		}
	}
	document.getElementById('box1_0').value = randomword[0];
}

function typer(evt) {
	if(goNextEmptyColumn() <=5) {
		document.getElementById('box' + row + '_' + goNextEmptyColumn()).focus();
	}

	if(evt.key === 'Enter' && goNextEmptyColumn() === undefined) {
		check();
	}

	if(evt.key === 'F12') {
		window.location = window.location;
	}
}

function goNextEmptyColumn(e) {
	for (var i = 0; i < 5; i++) {
		if (row <= 5) {
			if (document.getElementById('box' + row + '_' + i).value === '') {
				return i;
			}
		}
	}
}

function typeWord() {
	var typedWord = [];
	for (var i = 0; i < randomword.length; i++) {
		typedWord.push(document.getElementById('box' + row + '_' + i).value)
	}
	return typedWord
}

function check() {
	var Input = assembleWord();
	var willekeurigWoord = [];
	var guessed = [];
	var restart = [];
	var guess = Input.join('');
	console.log(guess);

	for (a = 0; a < randomword; a++) {
		willekeurigWoord.push(randomword[a])
	}

	if (Input === randomword) {
		return true;
	}

	for (var i = 0; i < randomword; i++) {
		if (willekeurigWoord[i].toUpperCase() === Input[i].toUpperCase()) {
			document.getElementById('box' + row + '_' + i).style.backgroundColor = '#47d147'; 
			willekeurigWoord[i] = '';
			Input[i] = '*';
			guessed.push(willekeurigWoord[i]); 
		}
	}

	for (var i = 0; i < randomword; i++) {
		if (willekeurigWoord.indexOf(Input[i]) != -1) {
			willekeurigWoord[willekeurigWoord.indexOf(Input[i])] = '';
			Input[i] = '*';
			document.getElementById('box' + row + '_' + i).style.borderRadius = '50%';
			document.getElementById('box' + row + '_' + i).style.backgroundColor = 'yellow';
		}
	}

	if (guess == randomword) {
		alert('Gewonnen! Refresh met "F12" om opnieuw te spelen.');

	} else if(row >= 5 && guess != randomword) {
		alert('Verloren. Het woord was:' + ' ' + randomword +' ' + 'Refresh met \"F12\"om opnieuw te spelen');
	}

	if (guess != randomword) {
		row++
	}

	if (row <= 5) {
		document.getElementById('box' + row + '_0').value = randomword[0]
	}
}

row();
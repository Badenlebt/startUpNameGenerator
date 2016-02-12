Math.rand = function( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 )) + min;
};


var startUpNameGenerator = function( params ) {
	var baseLibrary = {
		'vowels': [
			{ 'letter':	'a', 'value': 0.0 },	// -1 means sharp, +1 means soft, 0 is neutral
			{ 'letter': 'e', 'value': -0.5 },
			{ 'letter': 'i', 'value': -1.0 },
			{ 'letter': 'o', 'value': 0.5 },
			{ 'letter': 'u', 'value': 1.0 },
			{ 'letter': 'y', 'value': -0.25 }
		],
		'consonants': [
			{ 'letter': 'b', 'value': 0.25 },
			{ 'letter': 'c', 'value': -0.25 },
			{ 'letter': 'd', 'value': 0.0 },
			{ 'letter': 'f', 'value': -0.25 },
			{ 'letter': 'g', 'value': 0.0 },
			{ 'letter': 'h', 'value': 0.0 },
			{ 'letter': 'j', 'value': 0.5 },
			{ 'letter': 'k', 'value': -0.5 },
			{ 'letter': 'l', 'value': 0.25 },
			{ 'letter': 'm', 'value': 0.25 },
			{ 'letter': 'n', 'value': 0.0 },
			{ 'letter': 'p', 'value': -0.25 },
			{ 'letter': 'qu', 'value': -0.5 },
			{ 'letter': 'r', 'value': 0.0 },
			{ 'letter': 's', 'value': -0.25 },
			{ 'letter': 't', 'value': -0.75 },
			{ 'letter': 'v', 'value': 0.0 },
			{ 'letter': 'w', 'value': 0.75 },
			{ 'letter': 'x', 'value': -1.0 },
			{ 'letter': 'z', 'value': 0.25 },
			{ 'letter': 'ng', 'value': 1.0 },
			{ 'letter': 'ck', 'value': -1.0 },
			{ 'letter': 'nt', 'value': 0.0 },
			{ 'letter': 'tr', 'value': 0.0 }
		]
	};
	
	var options = $.extend({
		baseElem:	"sungBase",
		count:		5
	}, params || {});
	
	var $baseElem = $( '#' + options.baseElem ),
		$sliderSharpGentleElem,
		$valueSharpGentleElem,
		$sliderSyllablesElem,
		$valueSyllablesElem,
		$buttonElem,
		$outputElem;
	
	// private functions
	var _createHtmlElems = function() {
	
		// generate controls
		
		// sharp-gentle value
		var $sliderLabelLeft = $( '<label>' );
		$sliderLabelLeft.attr( 'for', 'sharp-gentle' );
		$sliderLabelLeft.html( '<b>sound</b> sharp' );
		
		var $sliderLabelRight = $( '<label>' );
		$sliderLabelRight.attr( 'for', 'sharp-gentle' );
		$sliderLabelRight.html( 'gentle' );
		
		$sliderSharpGentleElem = $( '<input>' );
		$sliderSharpGentleElem.attr( 'type', 'range' );
		$sliderSharpGentleElem.attr( 'name', 'sharp-gentle' );
		$sliderSharpGentleElem.attr( 'min', '-1' );
		$sliderSharpGentleElem.attr( 'max', '1' );
		$sliderSharpGentleElem.attr( 'step', '0.01' );
		$sliderSharpGentleElem.attr( 'value', '0' );
		$sliderSharpGentleElem.bind( 'mousemove', function( event ) {
			_updateSharpGentleValueElem( $(this).val() );
		});
		
		$valueSharpGentleElem = $( '<span>' );
		$valueSharpGentleElem.addClass( 'sungSliderValue' );
		$valueSharpGentleElem.html( '0' );
		
		
		var $sharpGentleRow = $( '<div>' );
		$sharpGentleRow.addClass( 'sungFormRow' );
		
		$sharpGentleRow.append( $sliderLabelLeft );
		$sharpGentleRow.append( $sliderSharpGentleElem );
		$sharpGentleRow.append( $sliderLabelRight );
		$sharpGentleRow.append( $valueSharpGentleElem );
		
		// syllables value
		var $syllablesLabelLeft = $( '<label>' );
		$syllablesLabelLeft.attr( 'for', 'syllables' );
		$syllablesLabelLeft.html( '<b>syllables</b> less' );
		var $syllablesLabelRight = $( '<label>' );
		$syllablesLabelRight.attr( 'for', 'syllables' );
		$syllablesLabelRight.html( ' more' );
				
		$sliderSyllablesElem = $( '<input>' );
		$sliderSyllablesElem.attr( 'type', 'range' );
		$sliderSyllablesElem.attr( 'name', 'syllables' );
		$sliderSyllablesElem.attr( 'min', '1' );
		$sliderSyllablesElem.attr( 'max', '5' );
		$sliderSyllablesElem.attr( 'step', '01' );
		$sliderSyllablesElem.attr( 'value', '2' );
		$sliderSyllablesElem.bind( 'mousemove', function( event ) {
			_updateSyllableValueElem( $(this).val() );
		});
		
		$valueSyllablesElem = $( '<span>' );
		$valueSyllablesElem.addClass( 'sungSliderValue' );
		$valueSyllablesElem.html( '2' );
		
		var $syllablesRow = $( '<div>' );
		$syllablesRow.addClass( 'sungFormRow' );
		
		$syllablesRow.append( $syllablesLabelLeft );
		$syllablesRow.append( $sliderSyllablesElem );
		$syllablesRow.append( $syllablesLabelRight );
		$syllablesRow.append( $valueSyllablesElem );
				
		//button		
		$buttonElem = $( '<input>' );
		$buttonElem.attr( 'type', 'submit' );
		$buttonElem.attr( 'name', 'submit' );
		$buttonElem.attr( 'value', 'generate!' );
		$buttonElem.bind( 'click', function( event ) {
			event.preventDefault();
			_generateNames();
		});
		
		var $submitRow = $( '<div>' );
		$submitRow.addClass( 'sungFormRow centered' );
		
		var $buttonWrapper = $( '<span>' );
		$buttonWrapper.addClass( 'submitButtonWrapper' );
		
		$buttonWrapper.append( $buttonElem );
		
		$submitRow.append( $buttonWrapper );
				
		// append rows to base
		$baseElem.append( $sharpGentleRow );
		$baseElem.append( $syllablesRow );
		$baseElem.append( $submitRow );
		
		// generate output elem
		$outputElem = $( '<div>' );
		$outputElem.addClass( 'sungOutput' );
		
		$baseElem.append( $outputElem );
		
	}
	
	var _updateSharpGentleValueElem = function( value ) {
		$valueSharpGentleElem.html( value );
	}
	
	var _updateSyllableValueElem = function( value ) {
		$valueSyllablesElem.html( value );
	}	
	
	var _generateNames = function() {
		
		var sharpGentleValue = parseFloat( $sliderSharpGentleElem[0].value );
		
		var syllablesValue = parseFloat( $sliderSyllablesElem[0].value );
		
		
		var actualLibrary = _calcActualLibrary( sharpGentleValue );
		
		var maxVowelValue = actualLibrary.vowels[ actualLibrary.vowels.length - 1 ].value;
		var maxConsonantValue = actualLibrary.consonants[ actualLibrary.consonants.length - 1 ].value;
		
		var names = [];
		
		for ( var num = 0; num < options.count; num++ ) {
			var name = '';
			var randVal;
			
			for ( var cnt = 0; cnt < syllablesValue; cnt++ ) {
				randVal = Math.rand( 1, maxConsonantValue );			
				
				for ( var con = 0; con < actualLibrary.consonants.length; con++ ) {
					if ( actualLibrary.consonants[con].value >= randVal ) {
						name += actualLibrary.consonants[con].letter;
						break;
					}
				}
				
				randVal = Math.rand( 1, maxVowelValue );
				
				for ( var vow = 0; vow < actualLibrary.vowels.length; vow++ ) {
					if ( actualLibrary.vowels[vow].value >= randVal ) {
						name += actualLibrary.vowels[vow].letter;
						break;
					}
				}
			}
			
			names[num] = name;
		}
		
		var namesString = '';
		
		for ( var i = 0; i < names.length; i++ ) {
			namesString += '&nbsp;' + ( i + 1 ) + ': ' + names[i] + '<br/>';
		}	
		
		$outputElem.html( 
			'<em>Input:</em><br/> '
			+ '&nbsp;-&nbsp;sharpGentleValue:&nbsp;' + sharpGentleValue + '<br/>'
			+ '&nbsp;-&nbsp;syllablesValue:&nbsp;' + syllablesValue + '<br/>'
			+ '<br/><br/>'
			+ '<em>Names:</em><br/>'
			+ namesString
		);
		
		
	}
	
	var _calcActualLibrary = function( sgVal ) {
		var returnLibrary = {
			vowels:			[],
			consonants:		[]
		};
		var baseVowels = baseLibrary.vowels,
			baseConsonants = baseLibrary.consonants,
			vowels = [],
			consonants = [],
			vowelsSum = 0,
			consonantsSum = 0;
		
		for ( var i = 0; i < baseVowels.length; i++ ) {
			var myVal = Math.round( Math.pow( 2 - Math.abs( baseVowels[i].value - sgVal ), 2 ) * 100 );
			if ( myVal > 0 ) {
				vowelsSum += myVal;
				vowels[vowels.length] = { letter: baseVowels[i].letter, value: vowelsSum };
			}
		}
		returnLibrary.vowels = vowels;
		
		for ( var i = 0; i < baseConsonants.length; i++ ) {
			var myVal = Math.round( Math.pow( 2 - Math.abs(baseConsonants[i].value - sgVal ),2 ) * 100 );
			if ( myVal > 0 ) {
				consonantsSum += myVal;
				consonants[consonants.length] = { letter: baseConsonants[i].letter, value: consonantsSum };
			}
		}
		returnLibrary.consonants = consonants;
		
		return returnLibrary;
	}
	
	// public functions
	var _printLibrary = function( library ) {
		
		var returnString = '';
		
		for ( var a in library ) {
			returnString += a + ":<br/>\n";
			
			for ( var i = 0; i < library[a].length; i++ ) {
				for ( var b in library[a][i] ) {
					returnString += "&nbsp;&nbsp;&nbsp;&nbsp;" + b + ': ' + library[a][i][b];
				}
				returnString += "<br/>\n";
			}
		}
		
		return returnString;
	};
	
	
	// init
	_createHtmlElems();
};

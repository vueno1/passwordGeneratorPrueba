console.log ("hola")
///////////
//VARIABLES//
////////////

//INPUT RANGO//
const characterAmountRange = document.getElementById ("characterAmountRange")

//INPUT CANTIDAD NUMEROS
const characaterAmountNumber = document.getElementById ("characterAmountNumber")

//CHECKBOX → Mayusculas, numeros, simbolos
const includeUppercaseElement = document.getElementById ("includeUppercase")
const includeNumbersElement = document.getElementById ("includeNumbers")
const includeSymbolsElement = document.getElementById ("includeSymbols")

//CONTENEDOR FORMULARIO
const form = document.getElementById ("passwordGeneratorForm")
const passwordDisplay = document.getElementById ("passwordDisplay")

//guardamos en constantes los codigos ASCII:
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90) // A → Z
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122) // a → z 
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57) //0 → 9
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47) //guarda los simbolos

//Como los codes de los simbolos no estan juntos, 
//los tengo que llamar por separado y concatenarlos
//SYMBOL_CHAR_CODES.concat (array.....(low, high))
.concat(arrayFromLowToHigh(58, 64))
.concat(arrayFromLowToHigh(91, 96))
.concat(arrayFromLowToHigh(123, 126))

//FUNCION PARA AUMENTAR RANGO DE CARACTERES y sincronizar entre NUMERO Y RANGO.
const syncCharacterAmount = (e) =>{
  const value = e.target.value
  characaterAmountNumber.value = value
  characterAmountRange.value = value
}
//EVENTO PARA INPUT CANTIDAD NUMEROS
characaterAmountNumber.addEventListener ("input", syncCharacterAmount)
//EVENTO PARA TAMAÑO DE RANGO
characterAmountRange.addEventListener ("input", syncCharacterAmount)

//FUNCION GENERADORA DE PASSWORD: 
function generatePassword (characterAmount,includeUppercase,includeNumbers, includeSymbols,) {
  //uso de ASCII CODES para buscar caracteres.
  console.log (UPPERCASE_CHAR_CODES)
  //String.fromCharCode (65) //devuelve A (UNICODE)

  let charCodes = LOWERCASE_CHAR_CODES
  if (includeUppercase) charCodes = charCodes.concat (UPPERCASE_CHAR_CODES)
  if (includeSymbols) charCodes = charCodes.concat (SYMBOL_CHAR_CODES)
  if (includeNumbers) charCodes = charCodes.concat (NUMBER_CHAR_CODES)

  const passwordCharacters = []
  for (let i = 0; i<characterAmount; i++) {
    const characterCode = charCodes[Math.floor (Math.random ()*charCodes.length)]
    passwordCharacters.push (String.fromCharCode (characterCode))
  }
  return passwordCharacters.join ("")
}

//funcion para guardar en orden y guardarlos en una array.
function arrayFromLowToHigh  (low, high) {
  const array = [] //inicializa con array vacio.

  //hacemos el conteo
  //i = low 
  //condicion: i menor o igual a high
  //va sumando i + 1 hasta que llegue al numero high
  for (let i = low; i<= high; i++) {
    //cada i pusheo a mi array.
    array.push (i)
  }
  return array
}

//EVENTO a la hora de generar PASSWORD.
form.addEventListener ("submit", e =>{
  e.preventDefault ()

  //traemos lo que viene x input en NUMEROS + todo lo que se tildo!
  const characterAmount = characaterAmountNumber.value

  const includeUppercase= includeUppercaseElement.checked //checked: es la tilde en checkbox
  const includeNumbers = includeNumbersElement.checked 
  const includeSymbols = includeSymbolsElement.checked 

  //creo funcion para generar password y paso como parametros lo que traje de input: 
  const password = generatePassword (
    //parametros deben incluir ↓ 
    characterAmount, //cantidad de caracteres
    includeUppercase, //mayuscula
    includeNumbers, //numeros
    includeSymbols, //simbolos

  )

  passwordDisplay.innerText = password

})
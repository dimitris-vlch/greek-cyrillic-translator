// Mapping of Modern Greek letters to Cyrillic equivalents.
// The mapping is based on visual similarity and common phonetic correspondence.
const greekToCyrillicMap = {
  // uppercase
  'Α': 'А', 'Β': 'В', 'Γ': 'Г', 'Δ': 'Д', 'Ε': 'Е',
  'Ζ': 'З', 'Η': 'Н', 'Θ': 'Ф', 'Ι': 'І', 'Κ': 'К',
  'Λ': 'Л', 'Μ': 'М', 'Ν': 'Н', 'Ξ': 'Ѯ', 'Ο': 'О',
  'Π': 'П', 'Ρ': 'Р', 'Σ': 'С', 'Τ': 'Т', 'Υ': 'У',
  'Φ': 'Ф', 'Χ': 'Х', 'Ψ': 'Ѱ', 'Ω': 'Ѡ',

  // lowercase
  'α': 'а', 'β': 'в', 'γ': 'г', 'δ': 'д', 'ε': 'е',
  'ζ': 'з', 'η': 'н', 'θ': 'ф', 'ι': 'і', 'κ': 'к',
  'λ': 'л', 'μ': 'м', 'ν': 'н', 'ξ': 'ѯ', 'ο': 'о',
  'π': 'п', 'ρ': 'р', 'σ': 'с', 'ς': 'с', 'τ': 'т',
  'υ': 'у', 'φ': 'ф', 'χ': 'х', 'ψ': 'ѱ', 'ω': 'ѡ'
};

/**
 * Transliterate a string of Modern Greek text to its Cyrillic representation.
 * Accented characters are normalised to their base form before transliteration.
 *
 * @param {string} text - The input string containing Greek characters
 * @returns {string} - The transliterated string in Cyrillic
 */
function transliterate(text) {
  let result = '';

  for (const char of text) {
    // Normalise the character to decompose diacritics (NFD) and remove them.
    const baseChar = char.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (greekToCyrillicMap[baseChar]) {
      // Append the Cyrillic equivalent.
      result += greekToCyrillicMap[baseChar];
    } else {
      // Leave characters that are not Greek untouched.
      result += char;
    }
  }

  return result;
}

// Bind event handler to the button after DOM content has loaded.
document.addEventListener('DOMContentLoaded', () => {
  const inputElement = document.getElementById('input-text');
  const outputElement = document.getElementById('output-text');
  const button = document.getElementById('transliterate-button');

  button.addEventListener('click', () => {
    const inputText = inputElement.value;
    const transliterated = transliterate(inputText);
    outputElement.value = transliterated;
  });

  // Trigger transliteration when the Enter key is pressed in the input area.
  // Shift+Enter will still insert a newline for multi‑line input.
  inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const transliterated = transliterate(inputElement.value);
      outputElement.value = transliterated;
    }
  });
});

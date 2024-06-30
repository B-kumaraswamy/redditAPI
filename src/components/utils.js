
/* receives encoded data and returns as plain text */
export function decodeHtmlEntities(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }

  const textArea = document.createElement('textarea');
  textArea.innerHTML = str;
  return textArea.value;
}


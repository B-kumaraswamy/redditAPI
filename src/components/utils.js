export function decodeHtmlEntities(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }

  const textArea = document.createElement('textarea');
  textArea.innerHTML = str;
  return textArea.value;
}

/*
textArea.innerHTML = str;:

This line sets the innerHTML property of the textarea element. The innerHTML property is a string property that represents the HTML content inside the element.

By assigning str to textArea.innerHTML, you're essentially setting the content of the textarea to the value of the str variable.

This step is crucial because textarea elements can interpret HTML content, including encoded entities like &lt;, &gt;, &amp;, etc., and display them as plain text within the element.

*/
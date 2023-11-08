function includeHTML() {
    var z, i, elmnt, file, xhttp, title;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        title = elmnt.getAttribute("w3-title");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var my_awesome_script = document.createElement('script');

                        my_awesome_script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js');

                        elmnt.innerHTML = this.responseText
                        elmnt.appendChild(my_awesome_script);

                        Array.from(elmnt.querySelectorAll('.nav-link'))
                          .find(el => el.textContent === title).classList.add('active');

                        elmnt.querySelector('#title').innerText = title;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

includeHTML();
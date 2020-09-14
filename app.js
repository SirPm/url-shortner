// Logic to toggle menu

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
})


// Logic to shorten url's

// Selectors

const link = document.getElementById('link');
const shortnerBtn = document.getElementById('shortenLink');
const result = document.querySelector('.result');
const loadingDiv = document.querySelector('.loading-div');


// Variables, Arrays e.t.c.

let linksArray = [];


// Events

shortnerBtn.addEventListener('click', shortenLink);
result.addEventListener('click', copyLink);


// Functions

function shortenLink(e) {
    e.preventDefault();
    // Get the value from the input box
    let linkVal = link.value;

    // Check if nothing was typed in the input field
    if(linkVal === '') {
        loadingDiv.innerHTML = `<p class='error-msg'>Please add a link</p>`;
        link.style.border = '2px solid hsl(0, 87%, 67%)';
    } else {
        link.style.border = '2px solid white';
        loadingDiv.innerHTML = `<p class='loading-text'>Link is being shortened please wait...</p>`;

        // Disable input field so user won't be able to input a link while shortening the link
        link.disabled = true;
        fetch(`https://api.shrtco.de/v2/shorten?url=${linkVal}`)
        .then(response => response.json())
        .then(data => {
            // Create a link object to store the original and shortened link
            let linkObj = {
                originalLink: data.result.original_link,
                shortenedLink: data.result.full_short_link2
            }

            // Enable the link back to enable users shorten another link
            link.disabled = false;
            // Put the link object at the top of the linksArray
            linksArray.unshift(linkObj);

            loadingDiv.innerHTML = '';
            // Empty out everything in the results div
            result.innerHTML = '';

            /* Loop through the array of stored links and re-display all the results again according
                to its position in the linksArray
            */
            linksArray.forEach( link => {
                let linkHtmlString = `
                <div>
                    <p class='originalLink'>${link.originalLink}</p>
                    <input class='inputLink' aria-label="shortenedLink" type='text' value='${link.shortenedLink}' />
                    <button class='copy'>Copy</button>
                </div>
            `;

            result.innerHTML += linkHtmlString;
            })
        })
    }
    // Empty out the input field to allow for new input
    link.value = '';
}

function copyLink(e) {
    // Check to only fire this action if we're clicking on the copy button
    if(e.target.classList.contains('copy')) {
        // Select the input text field
        e.target.parentElement.children[1].select();
        e.target.parentElement.children[1].setSelectionRange(0, 99999); //For mobile devices
    
        // Copy the text inside the text field 
        document.execCommand("copy");
    
        // Change the appearance of the button to indicate successfull copying
        e.target.innerHTML = 'Copied!';
        e.target.style.backgroundColor = 'hsl(260, 8%, 14%)';
        e.target.style.border = '1px solid hsl(260, 8%, 14%)';
    }
}

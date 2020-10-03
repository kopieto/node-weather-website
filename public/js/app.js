const weatherForm = document.querySelector('form')  //will search for the first form in the html
const search = document.querySelector('input')      //will search for the first input in the html
const message1 = document.querySelector('#message-1') //after we set uniq id for the p, we target it with #
const message2 = document.querySelector('#message-2')   //check index.hbs
//message1 and message2 are paragraphs. so we can set them down

//message1.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent the page to refresh

    const location = search.value

    message1.textContent ='location loaded'
    message2.textContent = ''
    

    fetch('http://localhost:3000/weather?address='+location).then( (response) => {
     response.json().then((data) => {
       if (data.error) {
            message1.textContent = data.error
       } else {
            message1.textContent = data.location
            message2.textContent = data.forecast
       } 
        })
})
})

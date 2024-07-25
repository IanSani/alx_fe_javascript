document.addEventListener("DOMContentLoaded",()=>{
    const quoteDisplay = document.getElementById('quoteDisplay');
    const showButtonQuote = document.getElementById('newQuote');

    const quotes = [
        {
            text: "The only limit to our realization of tomorrow is our doubts of today.",
            author: "Franklin D. Roosevelt",
            category: "Inspirational"
        },
        {
            text: "Life is what happens when you're busy making other plans.",
            author: "John Lennon",
            category: "Life"
        },
        {
            text: "Get busy living or get busy dying.",
            author: "Stephen King",
            category: "Motivational"
        },
        {
            text: "You have within you right now, everything you need to deal with whatever the world can throw at you.",
            author: "Brian Tracy",
            category: "Encouragement"
        },
        {
            text: "Believe you can and you're halfway there.",
            author: "Theodore Roosevelt",
            category: "Belief"
        }
    ];
    
    function showRandomQuote (){
            const randomIndex = Math.floor(Math.random () *quotes.length);
            return quotes[randomIndex];
        
    };
    //Function to display quotes
    function displayQuote (){
        const quote =showRandomQuote();
        quoteDisplay.innerHTML = `<p> ${quote.text}</p><br><p>${quote.author}</p><br><p>${quote.category}</p>`;
    };
    
    displayQuote();
    showButtonQuote.addEventListener('click',displayQuote);
});
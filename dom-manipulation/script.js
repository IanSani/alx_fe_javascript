document.addEventListener("DOMContentLoaded",()=>{
    const quoteDisplay = document.getElementById('quoteDisplay');
    const showButtonQuote = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const quoteAuthor=document.getElementById('author');


    const quotes = [
        {
            text: "The only limit to our realization of tomorrow is our doubts of today.",
            category: "Inspirational"
        },
        {
            text: "Life is what happens when you're busy making other plans.",
            category: "Life"
        },
        {
            text: "Get busy living or get busy dying.",
            category: "Motivational"
        },
        {
            text: "You have within you right now, everything you need to deal with whatever the world can throw at you.",
            category: "Encouragement"
        },
        {
            text: "Believe you can and you're halfway there.",
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
        quoteDisplay.innerHTML = `<p> ${quote.text}</p><br><p> - ${quote.category}</p>`;
    };

    //Function to add Quote
    function createAddQuoteForm (){
        const text =newQuoteText.value.trim();
        const author = quoteAuthor.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if(text && quoteAuthor && quoteCategory){
            quotes.push({text:text,author:author,category:quoteCategory});
            newQuoteText.value ="";
            quoteAuthor.value ="";
            newQuoteCategory.value ="";
            alert("Quote added successfully");
        }
        else{
            alert("Please add a Quote,author and a Category");
        }
    }
    
    
    displayQuote();
    showButtonQuote.addEventListener('click',displayQuote);
    document.getElementById('addQuote').addEventListener('click',createAddQuoteForm);
});
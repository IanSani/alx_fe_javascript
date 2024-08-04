document.addEventListener("DOMContentLoaded",()=>{
    const quoteDisplay = document.getElementById('quoteDisplay');
    const showButtonQuote = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const quoteAuthor=document.getElementById('author');
    const exportQuotesButton = document.getElementById('exportQuotes');
    const importFileInput = document.getElementById('importFile');
    const categoryFilter = document.getElementById('categoryFilter');

    //We load the tasks 
    const quotes =JSON.parse(localStorage.getItem('quotes')) || [
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
        const quoteCategory = newQuoteCategory.value.trim();

        if(text && quoteCategory){
            quotes.push({text:text,category:quoteCategory});


            //Clear previous Text
            while(quoteDisplay.firstChild){
                quoteDisplay.removeChild(quoteDisplay.firstChild);
            }

            //Create Elements
            const newQuoteDisplay = document.createElement('div');
            const newTextElement = document.createElement('p');
            const newCategoryElement = document.createElement('p');
            
            //Give them input values
            newTextElement.textContent= text;
            newCategoryElement.textContent =`Category: ${quoteCategory}`;

            //Append the elements
            newQuoteDisplay.appendChild(newTextElement);
            newQuoteDisplay.appendChild(newCategoryElement);

            newQuoteText.value ="";
            newQuoteCategory.value ="";
            alert("Quote added successfully");

             //After Quote is Added we save it to LocalStorage
             localStorage.setItem('quotes',JSON.stringify(quotes));
        }
        else{
            alert("Please add a Quote,author and a Category");
        }
    }
    // Populate categories in the dropdown
    function populateCategories() {
        const categories = [...new Set(quotes.map(quote => quote.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        // Set the last selected category from local storage
        const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
        categoryFilter.value = lastSelectedCategory;
        filterQuotes();
    }
    
    function exportQuotes() {
        const dataStr = JSON.stringify(quotes, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "quotes.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    
      function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
          const importedQuotes = JSON.parse(event.target.result);
          quotes.push(...importedQuotes);
          saveQuotes();
          alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
      }

       // Function to filter quotes based on selected category
    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        localStorage.setItem('selectedCategory', selectedCategory);
        const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

        // Display the first quote from the filtered list
        if (filteredQuotes.length > 0) {
            displayQuote(filteredQuotes[0]);
        } else {
            quoteDisplay.innerHTML = "<p>No quotes available in this category.</p>";
        }
    }
    
    

    
    
    displayQuote();
    showButtonQuote.addEventListener('click',displayQuote);
    document.getElementById('addQuote').addEventListener('click',createAddQuoteForm);
    exportQuotesButton.addEventListener('click', exportQuotes);
    importFileInput.addEventListener('change', importFromJsonFile);
});
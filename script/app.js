document.addEventListener('DOMContentLoaded', () => {
    const booksData = [
        // Motivational
        { title: "Atomic Habits", author: "James Clear", category: "Motivational", price: 4000, image: "images/motiv1.jpg" },
        { title: "7 Habits of Highly Effective People", author: "Stephen R. Covey", category: "Motivational", price: 4500, image: "images/motiv2.jpg" },
        { title: "You Are a Badass", author: "Jen Sincero", category: "Motivational", price: 3200, image: "images/motiv3.jpg" },
        { title: "Think and Grow Rich", author: "Napoleon Hill", category: "Motivational", price: 3800, image: "images/motiv4.jpg" },
        { title: "The Power of Now", author: "Eckhart Tolle", category: "Motivational", price: 3900, image: "images/motiv5.jpg" },
        { title: "Awaken the Giant Within", author: "Tony Robbins", category: "Motivational", price: 4200, image: "images/motiv6.jpg" },
        { title: "Drive", author: "Daniel Pink", category: "Motivational", price: 4100, image: "images/motiv7.jpg" },
        { title: "Mindset", author: "Carol Dweck", category: "Motivational", price: 3600, image: "images/motiv8.jpg" },
        { title: "Grit", author: "Angela Duckworth", category: "Motivational", price: 3500, image: "images/motiv9.jpg" },
        { title: "Make Your Bed", author: "William H. McRaven", category: "Motivational", price: 3000, image: "images/motiv10.jpg" },

        // Spiritual
        { title: "Purpose Driven Life", author: "Rick Warren", category: "Spiritual", price: 3500, image: "images/spirit1.jpg" },
        { title: "The Case for Christ", author: "Lee Strobel", category: "Spiritual", price: 3400, image: "images/spirit2.jpg" },
        // ...more spiritual books

        // Fictional
        { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fictional", price: 3000, image: "images/fiction1.jpg" },
        { title: "The Alchemist", author: "Paulo Coelho", category: "Fictional", price: 2800, image: "images/fiction2.jpg" },
        // ...more fictional books

        // Educational
        { title: "Intro to Algorithms", author: "Cormen et al.", category: "Educational", price: 6000, image: "images/edu1.jpg" },
        { title: "Clean Code", author: "Robert C. Martin", category: "Educational", price: 5500, image: "images/edu2.jpg" },
        // ...more educational books
    ];

    const booksContainer = document.querySelector('.books');

    function renderBooks(categoryFilter = null) {
        booksContainer.innerHTML = '';

        const categories = [...new Set(booksData.map(book => book.category))];

        categories.forEach(category => {
            const sectionBooks = booksData.filter(book => book.category === category);
            if (categoryFilter && category !== categoryFilter) return;

            const booksToShow = sectionBooks.slice(0, 10);

            const section = document.createElement('div');
            section.classList.add('books_show');
            section.setAttribute('data-section', category);

            const heading = document.createElement('div');
            heading.classList.add('books_heading');
            heading.innerHTML = `
                <h3>${category}</h3>
                <p>Top picks in the ${category} category</p>
            `;
            booksContainer.appendChild(heading);

            booksToShow.forEach(book => {
                const card = document.createElement('div');
                card.className = 'book_card';
                card.setAttribute('data-category', book.category);
                card.innerHTML = `
                    <img src="${book.image}" alt="${book.title}">
                    <div class="book_card_content">
                        <h3 title="${book.title}">${book.title}</h3>
                        <p>${book.category}</p>
                        <p>${book.author}</p>
                        <p><b>#${book.price}</b></p>
                        <a href="#" class="action"><button>Read More</button></a>
                    </div>
                `;
                section.appendChild(card);
            });

            booksContainer.appendChild(section);
        });
    }

    const searchInput = document.getElementById('search');

    // Search handler
    searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase().trim();

    if (searchText === '') {
    renderBooks(); // Show all books if search is empty
    return;
    }

    const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(searchText) ||
    book.author.toLowerCase().includes(searchText) ||
    book.category.toLowerCase().includes(searchText)
    );

    // Render search results
    booksContainer.innerHTML = '';

    const resultSection = document.createElement('div');
    resultSection.classList.add('books_show');
    resultSection.setAttribute('data-section', 'Search Results');

    const heading = document.createElement('div');
    heading.classList.add('books_heading');
    heading.innerHTML = `
    <h3>Search Results</h3>
    <p>Found ${filteredBooks.length} result(s) matching "${searchText}"</p>
    `;
    booksContainer.appendChild(heading);

    filteredBooks.slice(0, 10).forEach(book => {
    const card = document.createElement('div');
    card.className = 'book_card';
    card.setAttribute('data-category', book.category);
    card.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <div class="book_card_content">
            <h3 title="${book.title}">${book.title}</h3>
            <p>${book.category}</p>
            <p>${book.author}</p>
            <p><b>#${book.price}</b></p>
            <a href="#" class="action"><button>Buy</button></a>
        </div>
    `;
    resultSection.appendChild(card);
    });

    booksContainer.appendChild(resultSection);
    });

    function showLoader() {
        document.getElementById('loader').style.display = 'flex';
    }
    
    function hideLoader() {
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 300); // small delay to smooth transition
    }    

    // Initial render
    renderBooks();

    // Filter by category on click
    document.querySelectorAll('.the_categories a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
    
            // Update active class
            document.querySelectorAll('.the_categories a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
    
            const category = link.textContent.trim();
            if (category === 'All') {
                renderBooks();
            } else {
                renderBooks(category);
            }
        });
    });
    
});
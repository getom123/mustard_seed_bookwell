
document.addEventListener('DOMContentLoaded', () => {
    const booksData = [
        // Motivational
        { title: "Atomic Habits", author: "James Clear", category: "Motivational", price: 4000, image: "media/test.jpg" },
        { title: "7 Habits of Highly Effective People", author: "Stephen R. Covey", category: "Motivational", price: 4500, image: "media/test.jpg" },
        { title: "You Are a Badass", author: "Jen Sincero", category: "Motivational", price: 3200, image: "media/test.jpg" },
        { title: "Think and Grow Rich", author: "Napoleon Hill", category: "Motivational", price: 3800, image: "media/test.jpg" },
        { title: "The Power of Now", author: "Eckhart Tolle", category: "Motivational", price: 3900, image: "media/wb.jpg" },
        { title: "Awaken the Giant Within", author: "Tony Robbins", category: "Motivational", price: 4200, image: "media/test.jpg" },
        { title: "Drive", author: "Daniel Pink", category: "Motivational", price: 4100, image: "media/test.jpg" },
        { title: "Mindset", author: "Carol Dweck", category: "Motivational", price: 3600, image: "media/wb.jpg" },
        { title: "Grit", author: "Angela Duckworth", category: "Motivational", price: 3500, image: "media/test.jpg" },
        { title: "Make Your Bed", author: "William H. McRaven", category: "Motivational", price: 3000, image: "media/test.jpg" },

        // Spiritual
        { title: "Purpose Driven Life", author: "Rick Warren", category: "Spiritual", price: 3500, image: "media/wb.jpg" },
        { title: "The Case for Christ", author: "Lee Strobel", category: "Spiritual", price: 3400, image: "media/test.jpg" },

        // Fictional
        { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fictional", price: 3000, image: "media/wb.jpg" },
        { title: "The Alchemist", author: "Paulo Coelho", category: "Fictional", price: 2800, image: "media/test.jpg" },

        // Educational
        { title: "Intro to Algorithms", author: "Cormen et al.", category: "Educational", price: 6000, image: "media/test.jpg" },
        { title: "Clean Code", author: "Robert C. Martin", category: "Educational", price: 5500, image: "media/wb.jpg" },
    ];

    const booksContainer = document.querySelector('.books');
    const searchInput = document.getElementById('search');

    function showLoader() {
        document.getElementById('loader').style.display = 'flex';
    }

    function hideLoader() {
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 300);
    }

    function renderBooks(categoryFilter = null) {
        booksContainer.innerHTML = '';

        const categories = [...new Set(booksData.map(book => book.category))];

        categories.forEach(category => {
            const sectionBooks = booksData.filter(book => book.category === category);
            if (categoryFilter && category !== categoryFilter) return;

            
            if (sectionBooks.length === 0) return; // Skip empty sections entirely

            const booksToShow = sectionBooks.slice(0, 10);
            
            const heading = document.createElement('div');
            heading.classList.add('books_heading');
            heading.innerHTML = `
                <h3>${category}</h3>
                <p>Top picks in the ${category} category</p>
            `;
            booksContainer.appendChild(heading);

        

            const section = document.createElement('div');
            section.classList.add('books_show');
            section.setAttribute('data-section', category);
            
            booksToShow.forEach(book => {
                const card = document.createElement('div');
                card.className = 'book_card';
                card.setAttribute('data-category', book.category);
                card.innerHTML = `
                    <img src="${book.image}" alt="${book.title}" loading="lazy">
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

    // Search handler
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase().trim();
        showLoader();
    
        setTimeout(() => {
            if (searchText === '') {
                renderBooks();
                hideLoader();
                return;
            }
    
            const filteredBooks = booksData.filter(book =>
                book.title.toLowerCase().includes(searchText) ||
                book.author.toLowerCase().includes(searchText) ||
                book.category.toLowerCase().includes(searchText)
            );
    
            booksContainer.innerHTML = '';
    
            const heading = document.createElement('div');
            heading.classList.add('books_heading');
            heading.innerHTML = `
                <h3>Search Results</h3>
                <p>${filteredBooks.length > 0 ? 'Matching books:' : `No books found matching "${searchText}".`}</p>
            `;
            booksContainer.appendChild(heading);
    
            if (filteredBooks.length === 0) {
                const noResult = document.createElement('div');
                noResult.className = 'no_results';
                noResult.innerHTML = `
                    <p>Can't find what you're looking for? <a href="#request">Request a Book</a></p>
                `;
                booksContainer.appendChild(noResult);
                hideLoader();
                return;
            }
    
            const resultSection = document.createElement('div');
            resultSection.classList.add('books_show');
            resultSection.setAttribute('data-section', 'Search Results');
    
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
            hideLoader();
        }, 300);
    });
    

    // Filter by category with loader + active class
    document.querySelectorAll('.the_categories a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const category = link.textContent.trim();

            document.querySelectorAll('.the_categories a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');

            showLoader();
            setTimeout(() => {
                if (category === 'All') {
                    renderBooks();
                } else {
                    renderBooks(category);
                }
                hideLoader();
            }, 300);
        });
    });

    // Initial load
    renderBooks();
});


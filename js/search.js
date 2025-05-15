/**
 * Search JavaScript 
 * Australian Constitution Guide
 */

// Initialize search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get search elements
    const searchBox = document.getElementById('search-box');
    const searchButton = document.getElementById('search-btn');
    
    // Add event listeners
    if (searchBox && searchButton) {
        // Search on button click
        searchButton.addEventListener('click', function() {
            performSearch(searchBox.value);
        });
        
        // Search on Enter key press
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
});

/**
 * Perform search with the given query
 * @param {string} query - The search query
 */
function performSearch(query) {
    if (!query || query.trim() === '') {
        alert('Please enter a search term');
        return;
    }
    
    console.log(`Searching for: ${query}`);
    
    // In a real application, this would search a database or indexed content
    // For this demo, we'll simulate search results
    
    // Clear any existing search results
    const contentElement = document.getElementById('root');
    if (contentElement) {
        contentElement.innerHTML = `
            <h1>Search Results for "${query}"</h1>
            <div id="search-results"></div>
        `;
        
        // Add a loading indicator
        const searchResultsElement = document.getElementById('search-results');
        searchResultsElement.innerHTML = '<div class="loading-section">Searching...</div>';
        
        // Simulate search delay
        setTimeout(() => {
            // Get search results (in a real app, this would come from a search engine)
            const results = simulateSearch(query);
            
            // Display search results
            displaySearchResults(results, query);
        }, 500);
    }
}

/**
 * Display search results
 * @param {Array} results - The search results
 * @param {string} query - The search query
 */
function displaySearchResults(results, query) {
    const searchResultsElement = document.getElementById('search-results');
    
    if (searchResultsElement) {
        if (results.length === 0) {
            searchResultsElement.innerHTML = `
                <div class="no-results">
                    <p>No results found for "${query}".</p>
                    <p>Try using different keywords or check your spelling.</p>
                </div>
            `;
        } else {
            let resultsHTML = '<div class="results-count">' + results.length + ' result(s) found</div>';
            
            results.forEach(result => {
                resultsHTML += `
                    <div class="search-result">
                        <h3><a href="#${result.sectionId}">${result.title}</a></h3>
                        <div class="result-path">${result.path}</div>
                        <div class="result-excerpt">${result.excerpt}</div>
                    </div>
                `;
            });
            
            searchResultsElement.innerHTML = resultsHTML;
            
            // Add click event listeners to result links
            const resultLinks = searchResultsElement.querySelectorAll('.search-result a');
            resultLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Get the section ID from the href attribute
                    const sectionId = this.getAttribute('href').substring(1);
                    
                    // Update URL hash
                    window.location.hash = sectionId;
                    
                    // Load content for this section
                    loadContent(sectionId);
                    
                    // Update active nav link
                    setActiveNavLink(sectionId);
                });
            });
        }
    }
}

/**
 * Simulate search functionality
 * In a real application, this would be replaced with actual search logic
 * @param {string} query - The search query
 * @returns {Array} The search results
 */
function simulateSearch(query) {
    // Normalize the query for case-insensitive search
    const normalizedQuery = query.toLowerCase();
    
    // Dummy search data
    const searchableContent = [
        {
            sectionId: 'introduction',
            title: 'Introduction to the Australian Constitution',
            path: 'Introduction',
            content: 'The Australian Constitution is the set of rules by which Australia is governed. It came into effect on January 1, 1901, establishing Australia as a federation of states under a constitutional monarchy with a parliamentary democracy. Unlike many constitutions, Australia\'s is relatively short and straightforward.'
        },
        {
            sectionId: 'part1',
            title: 'Part I - General (Sections 1-6)',
            path: 'Chapter I > Part I',
            content: 'This part outlines the basic structure of Parliament and the role of the Governor-General. The Parliament consists of the Queen (represented by the Governor-General), the Senate, and the House of Representatives. Together they have the power to make laws for Australia.'
        },
        {
            sectionId: 'part2',
            title: 'Part II - The Senate (Sections 7-23)',
            path: 'Chapter I > Part II',
            content: 'The Senate is the upper house of Parliament, with equal representation from each state. Each original state has equal representation in the Senate (currently 12 senators per state). Senators are directly elected by the people of each state.'
        },
        {
            sectionId: 'chapter3',
            title: 'Chapter III - The Judicature',
            path: 'Chapter III',
            content: 'Chapter III establishes the judicial branch of the Australian government, including the High Court and other federal courts. The High Court of Australia is established as the highest court in the country. Parliament can create other federal courts.'
        }
    ];
    
    // Filter content that matches the query
    const results = searchableContent.filter(item => {
        // Check if the query appears in the title or content
        return item.title.toLowerCase().includes(normalizedQuery) || 
               item.content.toLowerCase().includes(normalizedQuery);
    });
    
    // For each result, add an excerpt that highlights the query
    results.forEach(result => {
        // Get the position of the query in the content
        const contentLower = result.content.toLowerCase();
        const queryPosition = contentLower.indexOf(normalizedQuery);
        
        if (queryPosition !== -1) {
            // Get surrounding context (50 characters before and after)
            const startPos = Math.max(0, queryPosition - 50);
            const endPos = Math.min(result.content.length, queryPosition + normalizedQuery.length + 50);
            
            // Create excerpt with ellipses if necessary
            let excerpt = '';
            if (startPos > 0) {
                excerpt += '...';
            }
            excerpt += result.content.substring(startPos, endPos);
            if (endPos < result.content.length) {
                excerpt += '...';
            }
            
            // Highlight the query term in the excerpt
            const highlightedQuery = `<span class="highlight">${result.content.substring(queryPosition, queryPosition + normalizedQuery.length)}</span>`;
            excerpt = excerpt.replace(
                result.content.substring(queryPosition, queryPosition + normalizedQuery.length),
                highlightedQuery
            );
            
            result.excerpt = excerpt;
        } else {
            // If the query is in the title but not in the content
            result.excerpt = result.content.substring(0, 150) + '...';
        }
    });
    
    return results;
}

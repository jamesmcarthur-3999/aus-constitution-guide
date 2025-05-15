/**
 * Navigation JavaScript
 * Australian Constitution Guide
 */

/**
 * Initialize navigation event handlers
 */
function initNavigation() {
    // Add click event listeners to all navigation links
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
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
            
            // Handle expanding/collapsing parent items
            toggleNavParent(this);
            
            // On mobile, scroll back to top of content
            if (window.innerWidth <= 768) {
                document.querySelector('.content').scrollTop = 0;
            }
        });
    });
    
    // Handle window hash change events (browser back/forward buttons)
    window.addEventListener('hashchange', function() {
        const sectionId = window.location.hash.substring(1) || 'introduction';
        loadContent(sectionId);
        setActiveNavLink(sectionId);
    });
}

/**
 * Toggle the expanded state of a parent navigation item
 * @param {HTMLElement} link - The link that was clicked
 */
function toggleNavParent(link) {
    const parentLi = link.closest('li');
    
    // If this is a parent item with children
    if (parentLi && parentLi.querySelector('ul')) {
        // Toggle expanded class
        parentLi.classList.toggle('expanded');
    }
}

/**
 * Initialize tab navigation
 */
function initTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Get the tab to show
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            document.querySelectorAll('.tab-link').forEach(tab => {
                tab.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to current tab and pane
            this.classList.add('active');
            document.getElementById(tabId)?.classList.add('active');
        });
    });
}

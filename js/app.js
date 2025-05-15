/**
 * Main Application JavaScript 
 * Australian Constitution Guide
 */

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Australian Constitution Guide Loaded');
    
    // Show loading indicator
    const loadingElement = document.getElementById('loading');
    const rootElement = document.getElementById('root');
    
    // Hide loading and show content
    setTimeout(() => {
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        
        if (rootElement) {
            initApp(rootElement);
        }
    }, 500);
    
    // Initialize back to top button
    initBackToTop();
});

/**
 * Initialize the application by loading initial content
 * @param {HTMLElement} rootElement - The root element to render content in
 */
function initApp(rootElement) {
    // Get the initial section to load (from URL hash or default to introduction)
    const initialSection = window.location.hash.substring(1) || 'introduction';
    
    // Load content for the initial section
    loadContent(initialSection);
    
    // Set the active nav link
    setActiveNavLink(initialSection);
    
    // Initialize navigation event handlers
    initNavigation();
}

/**
 * Load content for a specific section
 * @param {string} sectionId - The ID of the section to load
 */
function loadContent(sectionId) {
    console.log(`Loading content for section: ${sectionId}`);
    
    // In a real application, this would fetch content from a server or load from a local data store
    // For this demo, we'll simulate loading content
    
    const rootElement = document.getElementById('root');
    
    // Clear any existing content
    if (rootElement) {
        rootElement.innerHTML = '';
        
        // Add a loading indicator
        rootElement.innerHTML = '<div class="loading-section">Loading section content...</div>';
        
        // Simulate loading delay
        setTimeout(() => {
            // Clear loading indicator
            rootElement.innerHTML = '';
            
            // Load content based on sectionId
            if (sectionId === 'introduction') {
                loadIntroductionContent(rootElement);
            } else if (sectionId.startsWith('chapter')) {
                loadChapterContent(rootElement, sectionId);
            } else if (sectionId.startsWith('part')) {
                loadPartContent(rootElement, sectionId);
            } else {
                // Default content for unknown sections
                rootElement.innerHTML = `<h1>Section Not Found</h1><p>The requested section "${sectionId}" could not be found.</p>`;
            }
            
            // Initialize tab navigation if present
            initTabs();
        }, 300);
    }
}

/**
 * Initialize the back to top button
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    const contentElement = document.querySelector('.content');
    
    if (backToTopButton && contentElement) {
        // Show/hide the button based on scroll position
        contentElement.addEventListener('scroll', function() {
            if (this.scrollTop > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll back to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            contentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Set the active navigation link
 * @param {string} sectionId - The ID of the current section
 */
function setActiveNavLink(sectionId) {
    // Remove active class from all links
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to the current section link
    const currentLink = document.querySelector(`.nav-list a[href="#${sectionId}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
        
        // Expand parent if this is a child link
        const parentLi = currentLink.closest('li');
        if (parentLi && parentLi.parentElement.classList.contains('nav-list')) {
            parentLi.classList.add('expanded');
        }
    }
}

/**
 * Dummy function to load introduction content
 * In a real application, this would fetch content from a server or load from a JSON file
 * @param {HTMLElement} container - The container to render content in
 */
function loadIntroductionContent(container) {
    container.innerHTML = `
        <h1>Introduction to the Australian Constitution</h1>
        
        <div class="tab-nav">
            <div class="tab-link active" data-tab="plain">Plain English</div>
            <div class="tab-link" data-tab="history">Historical Context</div>
            <div class="tab-link" data-tab="cases">Key Cases</div>
        </div>
        
        <div class="tab-content">
            <div class="tab-pane active" id="plain">
                <p>The Australian Constitution is the set of rules by which Australia is governed. It came into effect on January 1, 1901, establishing Australia as a federation of states under a constitutional monarchy with a parliamentary democracy.</p>

                <p>Unlike many constitutions, Australia's is relatively short and straightforward. However, its legal language can be difficult for non-experts to understand. This guide aims to explain each section in plain English and highlight important High Court cases that have shaped how the Constitution is interpreted today.</p>
                
                <h2>Structure of the Constitution</h2>
                
                <p>The Constitution is divided into eight chapters:</p>
                
                <ol>
                    <li><strong>Chapter I: The Parliament</strong> - Establishes the legislative branch</li>
                    <li><strong>Chapter II: The Executive Government</strong> - Establishes the executive branch</li>
                    <li><strong>Chapter III: The Judicature</strong> - Establishes the judicial branch</li>
                    <li><strong>Chapter IV: Finance and Trade</strong> - Deals with economic matters</li>
                    <li><strong>Chapter V: The States</strong> - Defines the relationship between states and the Commonwealth</li>
                    <li><strong>Chapter VI: New States</strong> - Provides for admission of new states</li>
                    <li><strong>Chapter VII: Miscellaneous</strong> - Covers other matters</li>
                    <li><strong>Chapter VIII: Alteration of the Constitution</strong> - How to amend the Constitution</li>
                </ol>
                
                <p>Unlike some other countries' constitutions, Australia's does not contain a comprehensive bill of rights. However, it does protect a few specific rights, such as trial by jury for indictable Commonwealth offenses, freedom of religion, and protection against acquisition of property without compensation.</p>
            </div>
            
            <div class="tab-pane" id="history">
                <h2>Background and Creation</h2>
                
                <p>In the late 19th century, the six self-governing British colonies in Australia (New South Wales, Victoria, Queensland, Western Australia, South Australia, and Tasmania) began discussions about federating into a single nation.</p>
                
                <p>This was driven by several factors:</p>
                <ul>
                    <li>Growing Australian national identity</li>
                    <li>Desire for a unified defense policy, particularly with concerns about German and French colonies in the Pacific</li>
                    <li>Need to eliminate trade barriers between colonies</li>
                    <li>Recognition that many issues required a national approach</li>
                </ul>
                
                <p>Key milestones in the creation of the Constitution:</p>
                <ul>
                    <li><strong>1890-1891:</strong> Initial conferences in Melbourne and Sydney</li>
                    <li><strong>1897-1898:</strong> Constitutional conventions where the draft was refined</li>
                    <li><strong>1898-1900:</strong> Referendums in the colonies approving the Constitution</li>
                    <li><strong>July 9, 1900:</strong> The Commonwealth of Australia Constitution Act passed by the British Parliament</li>
                    <li><strong>January 1, 1901:</strong> Constitution came into effect, establishing the Commonwealth of Australia</li>
                </ul>
            </div>
            
            <div class="tab-pane" id="cases">
                <h2>Landmark High Court Cases</h2>
                
                <div class="case-example">
                    <div class="case-title">Amalgamated Society of Engineers v Adelaide Steamship Co Ltd (1920)</div>
                    <div class="case-citation">28 CLR 129; [1920] HCA 54</div>
                    <div class="case-summary">
                        <p>Known as the "Engineers' Case," this was a pivotal decision that fundamentally changed how the Constitution is interpreted. It rejected previous approaches to constitutional interpretation, including the "implied intergovernmental immunities" doctrine and the "reserved state powers" doctrine.</p>
                        <p>The High Court held that the Constitution should be interpreted according to its natural meaning, without presuming limitations on Commonwealth power. This case established the modern basis for understanding federalism in Australia and significantly expanded Commonwealth power relative to the states.</p>
                    </div>
                </div>
                
                <div class="case-example">
                    <div class="case-title">Australian Capital Television Pty Ltd v Commonwealth (1992)</div>
                    <div class="case-citation">177 CLR 106; [1992] HCA 45</div>
                    <div class="case-summary">
                        <p>This case established that although the Constitution does not explicitly protect freedom of political communication, such a freedom is implied by the system of representative government established by the Constitution.</p>
                        <p>The High Court found that sections 7 and 24 of the Constitution (requiring parliamentarians to be "directly chosen by the people") necessitate a freedom of political communication to ensure voters can make an informed choice.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Dummy function to load chapter content
 * @param {HTMLElement} container - The container to render content in
 * @param {string} chapterId - The ID of the chapter to load
 */
function loadChapterContent(container, chapterId) {
    // This is a dummy implementation
    container.innerHTML = `
        <h1>${getChapterTitle(chapterId)}</h1>
        <p>This is placeholder content for ${chapterId}. In a complete implementation, this would contain the full chapter content.</p>
        <p>Navigate to a specific part using the sidebar menu.</p>
    `;
}

/**
 * Dummy function to load part content
 * @param {HTMLElement} container - The container to render content in
 * @param {string} partId - The ID of the part to load
 */
function loadPartContent(container, partId) {
    // This is a dummy implementation
    container.innerHTML = `
        <h1>${getPartTitle(partId)}</h1>
        <p>This is placeholder content for ${partId}. In a complete implementation, this would contain the full part content with plain English explanations and case examples.</p>
        
        <div class="tab-nav">
            <div class="tab-link active" data-tab="plain">Plain English</div>
            <div class="tab-link" data-tab="original">Original Text</div>
            <div class="tab-link" data-tab="cases">Key Cases</div>
        </div>
        
        <div class="tab-content">
            <div class="tab-pane active" id="plain">
                <p>Plain English explanation would go here.</p>
            </div>
            
            <div class="tab-pane" id="original">
                <p>Original constitutional text would go here.</p>
            </div>
            
            <div class="tab-pane" id="cases">
                <p>Case examples would go here.</p>
            </div>
        </div>
    `;
}

/**
 * Get the title for a chapter based on its ID
 * @param {string} chapterId - The ID of the chapter
 * @returns {string} The title of the chapter
 */
function getChapterTitle(chapterId) {
    const chapterTitles = {
        'chapter1': 'Chapter I - The Parliament',
        'chapter2': 'Chapter II - The Executive Government',
        'chapter3': 'Chapter III - The Judicature',
        'chapter4': 'Chapter IV - Finance and Trade',
        'chapter5': 'Chapter V - The States',
        'chapter6': 'Chapter VI - New States',
        'chapter7': 'Chapter VII - Miscellaneous',
        'chapter8': 'Chapter VIII - Alteration of the Constitution'
    };
    
    return chapterTitles[chapterId] || `Unknown Chapter: ${chapterId}`;
}

/**
 * Get the title for a part based on its ID
 * @param {string} partId - The ID of the part
 * @returns {string} The title of the part
 */
function getPartTitle(partId) {
    const partTitles = {
        'part1': 'Part I - General (Sections 1-6)',
        'part2': 'Part II - The Senate (Sections 7-23)',
        'part3': 'Part III - House of Representatives (Sections 24-40)',
        'part4': 'Part IV - Both Houses (Sections 41-50)',
        'part5': 'Part V - Powers of Parliament (Sections 51-60)'
    };
    
    return partTitles[partId] || `Unknown Part: ${partId}`;
}

/**
 * React App
 * Australian Constitution Guide
 */

// Main App Component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'introduction',
      searchTerm: '',
      expandedSections: {},
      showBackToTop: false,
      activeTab: 'plain',
      loading: true,
      content: {}
    };
  }
  
  componentDidMount() {
    // Initialize app based on URL hash or default to introduction
    const initialSection = window.location.hash.substring(1) || 'introduction';
    
    this.setState({
      activeSection: initialSection
    });
    
    // Simulate loading content (in a real app this would fetch from an API or data file)
    setTimeout(() => {
      this.setState({
        loading: false,
        content: this.getDummyContent()
      });
    }, 1000);
    
    // Listen for scroll events to show/hide back to top button
    document.querySelector('.content').addEventListener('scroll', this.handleScroll);
    
    // Listen for hash changes
    window.addEventListener('hashchange', this.handleHashChange);
  }
  
  componentWillUnmount() {
    // Clean up event listeners
    document.querySelector('.content').removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('hashchange', this.handleHashChange);
  }
  
  handleScroll = () => {
    const content = document.querySelector('.content');
    if (content.scrollTop > 300) {
      this.setState({ showBackToTop: true });
    } else {
      this.setState({ showBackToTop: false });
    }
  }
  
  handleHashChange = () => {
    const sectionId = window.location.hash.substring(1) || 'introduction';
    this.setState({ activeSection: sectionId });
  }
  
  handleNavClick = (sectionId, hasChildren) => {
    this.setState({ activeSection: sectionId });
    
    // Toggle expanded state if has children
    if (hasChildren) {
      this.setState(prevState => ({
        expandedSections: {
          ...prevState.expandedSections,
          [sectionId]: !prevState.expandedSections[sectionId]
        }
      }));
    }
    
    // Update URL hash
    window.location.hash = sectionId;
    
    // Scroll to top
    document.querySelector('.content').scrollTop = 0;
  }
  
  handleTabClick = (tabId) => {
    this.setState({ activeTab: tabId });
  }
  
  handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would search the content and update results
    console.log(`Searching for: ${this.state.searchTerm}`);
  }
  
  scrollToTop = () => {
    document.querySelector('.content').scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Dummy content function - in a real app this would come from an API or data file
  getDummyContent() {
    return {
      introduction: {
        title: 'Introduction to the Australian Constitution',
        sections: {
          plain: (
            <div>
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
          ),
          history: (
            <div>
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
          ),
          cases: (
            <div>
              <h2>Landmark High Court Cases</h2>
              
              <div className="case-example">
                <div className="case-title">Amalgamated Society of Engineers v Adelaide Steamship Co Ltd (1920)</div>
                <div className="case-citation">28 CLR 129; [1920] HCA 54</div>
                <div className="case-summary">
                  <p>Known as the "Engineers' Case," this was a pivotal decision that fundamentally changed how the Constitution is interpreted. It rejected previous approaches to constitutional interpretation, including the "implied intergovernmental immunities" doctrine and the "reserved state powers" doctrine.</p>
                  <p>The High Court held that the Constitution should be interpreted according to its natural meaning, without presuming limitations on Commonwealth power. This case established the modern basis for understanding federalism in Australia and significantly expanded Commonwealth power relative to the states.</p>
                </div>
              </div>
              
              <div className="case-example">
                <div className="case-title">Australian Capital Television Pty Ltd v Commonwealth (1992)</div>
                <div className="case-citation">177 CLR 106; [1992] HCA 45</div>
                <div className="case-summary">
                  <p>This case established that although the Constitution does not explicitly protect freedom of political communication, such a freedom is implied by the system of representative government established by the Constitution.</p>
                  <p>The High Court found that sections 7 and 24 of the Constitution (requiring parliamentarians to be "directly chosen by the people") necessitate a freedom of political communication to ensure voters can make an informed choice.</p>
                </div>
              </div>
            </div>
          )
        }
      },
      chapter1: {
        title: 'Chapter I - The Parliament',
        content: (
          <div>
            <p>Chapter I establishes the legislative branch of the Australian government, called the Parliament. It consists of the monarch (represented by the Governor-General), the Senate, and the House of Representatives.</p>
            
            <p>This chapter is divided into five parts, covering the structure and powers of Parliament.</p>
            
            <h2>Navigate to a specific part:</h2>
            <ul className="part-nav">
              <li><a href="#part1" onClick={(e) => { e.preventDefault(); this.handleNavClick('part1', false); }}>Part I - General</a></li>
              <li><a href="#part2" onClick={(e) => { e.preventDefault(); this.handleNavClick('part2', false); }}>Part II - The Senate</a></li>
              <li><a href="#part3" onClick={(e) => { e.preventDefault(); this.handleNavClick('part3', false); }}>Part III - House of Representatives</a></li>
              <li><a href="#part4" onClick={(e) => { e.preventDefault(); this.handleNavClick('part4', false); }}>Part IV - Both Houses</a></li>
              <li><a href="#part5" onClick={(e) => { e.preventDefault(); this.handleNavClick('part5', false); }}>Part V - Powers of Parliament</a></li>
            </ul>
          </div>
        )
      },
      part1: {
        title: 'Part I - General (Sections 1-6)',
        sections: {
          plain: (
            <div>
              <p>This part outlines the basic structure of Parliament and the role of the Governor-General.</p>
              
              <h3>Section 1 - Legislative Power</h3>
              <p>In plain English: The Parliament consists of the Queen (represented by the Governor-General), the Senate, and the House of Representatives. Together they have the power to make laws for Australia.</p>
              
              <h3>Sections 2-4 - The Governor-General</h3>
              <p>In plain English: The Governor-General is the Queen's representative in Australia. They are appointed by the Queen, receive a salary, and have powers defined by the Constitution.</p>
              
              <h3>Sections 5-6 - Sessions of Parliament</h3>
              <p>In plain English: The Governor-General can decide when Parliament meets and can dissolve the House of Representatives. Parliament must meet at least once every year.</p>
            </div>
          ),
          original: (
            <div>
              <h3>Section 1 - Legislative Power</h3>
              <blockquote>
                "The legislative power of the Commonwealth shall be vested in a Federal Parliament, which shall consist of the Queen, a Senate, and a House of Representatives, and which is hereinafter called 'The Parliament,' or 'The Parliament of the Commonwealth.'"
              </blockquote>
              
              <h3>Section 2 - Governor-General</h3>
              <blockquote>
                "A Governor-General appointed by the Queen shall be Her Majesty's representative in the Commonwealth, and shall have and may exercise in the Commonwealth during the Queen's pleasure, but subject to this Constitution, such powers and functions of the Queen as Her Majesty may be pleased to assign to him."
              </blockquote>
              
              {/* Additional sections would go here */}
            </div>
          ),
          cases: (
            <div>
              <div className="case-example">
                <div className="case-title">Sue v Hill (1999)</div>
                <div className="case-citation">199 CLR 462; [1999] HCA 30</div>
                <div className="case-summary">
                  <p>This case addressed the meaning of "the Queen" in the Constitution. The High Court found that "the Queen" referred to in the Constitution is the Queen in her capacity as Queen of Australia, not as Queen of the United Kingdom.</p>
                  <p>The Court held that the United Kingdom is a "foreign power" for the purposes of section 44(i) of the Constitution, which disqualifies people with allegiance to a foreign power from being members of Parliament.</p>
                </div>
              </div>
            </div>
          )
        }
      }
    };
  }
  
  renderContent() {
    const { activeSection, activeTab, content, loading } = this.state;
    
    if (loading) {
      return <div id="loading">Loading section content...</div>;
    }
    
    const sectionData = content[activeSection];
    
    if (!sectionData) {
      return (
        <div>
          <h1>Section Not Found</h1>
          <p>The requested section "{activeSection}" could not be found.</p>
        </div>
      );
    }
    
    if (activeSection === 'introduction') {
      return (
        <div>
          <h1>{sectionData.title}</h1>
          
          <div className="tab-nav">
            <div 
              className={`tab-link ${activeTab === 'plain' ? 'active' : ''}`}
              onClick={() => this.handleTabClick('plain')}
            >
              Plain English
            </div>
            <div 
              className={`tab-link ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => this.handleTabClick('history')}
            >
              Historical Context
            </div>
            <div 
              className={`tab-link ${activeTab === 'cases' ? 'active' : ''}`}
              onClick={() => this.handleTabClick('cases')}
            >
              Key Cases
            </div>
          </div>
          
          <div className="tab-content">
            <div className={activeTab === 'plain' ? 'active' : ''}>
              {sectionData.sections.plain}
            </div>
            <div className={activeTab === 'history' ? 'active' : ''}>
              {sectionData.sections.history}
            </div>
            <div className={activeTab === 'cases' ? 'active' : ''}>
              {sectionData.sections.cases}
            </div>
          </div>
        </div>
      );
    } else if (activeSection.startsWith('chapter')) {
      return (
        <div>
          <h1>{sectionData.title}</h1>
          {sectionData.content}
        </div>
      );
    } else if (activeSection.startsWith('part')) {
      return (
        <div>
          <h1>{sectionData.title}</h1>
          
          <div className="tab-nav">
            <div 
              className={`tab-link ${activeTab === 'plain' ? 'active' : ''}`}
              onClick={() => this.handleTabClick('plain')}
            >
              Plain English
            </div>
            <div 
              className={`tab-link ${activeTab === 'original' ? 'active' : ''}`}
              onClick={() => this.handleTabClick('original')}
            >
              Original Text
            </div>
            <div 
              className={`tab-link ${activeTab === 'cases' ? 'active' : ''}`}
              onClick={() => this.handleTabClick('cases')}
            >
              Key Cases
            </div>
          </div>
          
          <div className="tab-content">
            <div className={activeTab === 'plain' ? 'active' : ''}>
              {sectionData.sections.plain}
            </div>
            <div className={activeTab === 'original' ? 'active' : ''}>
              {sectionData.sections.original}
            </div>
            <div className={activeTab === 'cases' ? 'active' : ''}>
              {sectionData.sections.cases}
            </div>
          </div>
        </div>
      );
    }
  }
  
  renderNavItem(item, level = 0) {
    const { activeSection, expandedSections } = this.state;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.id];
    const isActive = activeSection === item.id;
    
    return (
      <li key={item.id} className={isExpanded ? 'expanded' : ''}>
        <a 
          href={`#${item.id}`}
          className={isActive ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            this.handleNavClick(item.id, hasChildren);
          }}
        >
          {item.label}
          {hasChildren && (
            <span className="chevron">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
        </a>
        
        {hasChildren && (
          <ul className={isExpanded ? 'visible' : ''}>
            {item.children.map(child => this.renderNavItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  }
  
  render() {
    const { searchTerm, showBackToTop } = this.state;
    
    // Navigation structure
    const navItems = [
      { id: 'introduction', label: 'Introduction' },
      { 
        id: 'chapter1', 
        label: 'Chapter I - The Parliament',
        children: [
          { id: 'part1', label: 'Part I - General' },
          { id: 'part2', label: 'Part II - The Senate' },
          { id: 'part3', label: 'Part III - House of Representatives' },
          { id: 'part4', label: 'Part IV - Both Houses' },
          { id: 'part5', label: 'Part V - Powers of Parliament' },
        ]
      },
      { id: 'chapter2', label: 'Chapter II - Executive Government' },
      { id: 'chapter3', label: 'Chapter III - The Judicature' },
      { id: 'chapter4', label: 'Chapter IV - Finance and Trade' },
      { id: 'chapter5', label: 'Chapter V - The States' },
      { id: 'chapter6', label: 'Chapter VI - New States' },
      { id: 'chapter7', label: 'Chapter VII - Miscellaneous' },
      { id: 'chapter8', label: 'Chapter VIII - Altering the Constitution' },
    ];
    
    return (
      <div className="app">
        <header>
          <div className="header-container">
            <h1>Australian Constitution in Plain English</h1>
            <p>An interactive guide with High Court case examples</p>
          </div>
        </header>
        
        <div className="container">
          <aside className="sidebar">
            <form className="search-container" onSubmit={this.handleSearch}>
              <input 
                type="text" 
                className="search-box" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
              />
              <button type="submit" id="search-btn">Search</button>
            </form>
            
            <nav className="main-nav">
              <ul className="nav-list">
                {navItems.map(item => this.renderNavItem(item))}
              </ul>
            </nav>
            
            <div className="external-links">
              <h3>External Resources</h3>
              <ul>
                <li><a href="https://www.aph.gov.au/constitution" target="_blank">Official Constitution Text</a></li>
                <li><a href="https://www.hcourt.gov.au/" target="_blank">High Court of Australia</a></li>
                <li><a href="https://peo.gov.au/" target="_blank">Parliamentary Education Office</a></li>
              </ul>
            </div>
          </aside>
          
          <main className="content">
            {this.renderContent()}
          </main>
        </div>
        
        <footer>
          <p>Australian Constitution in Plain English | Created for educational purposes | &copy; 2025</p>
          <p><a href="https://github.com/jamesmcarthur-3999/aus-constitution-guide" target="_blank">View on GitHub</a></p>
        </footer>
        
        <div 
          className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
          onClick={this.scrollToTop}
        >
          ↑
        </div>
      </div>
    );
  }
}

// Render the app
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

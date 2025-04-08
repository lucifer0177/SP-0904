document.addEventListener('DOMContentLoaded', function() {
    // Set current date and time
    document.getElementById('currentDateTime').textContent = '2025-04-08 06:13:30';

    // Load more news functionality
    document.getElementById('loadMoreNewsBtn').addEventListener('click', function() {
        this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
        
        // Simulate API call delay
        setTimeout(() => {
            const newsContainer = document.getElementById('newsContainer');
            
            // Additional news items with today's date
            const additionalNews = [
                {
                    source: 'MarketWatch',
                    time: 'April 8, 2025 - 00:45 UTC',
                    category: 'Markets',
                    title: 'Global Markets Rally as Trade Tensions Ease',
                    excerpt: 'International equity markets posted gains across the board following reports of progress in trade negotiations between major economies.',
                    tickers: ['EEM', 'VEA', 'ACWI']
                },
                {
                    source: 'The Economist',
                    time: 'April 7, 2025 - 23:15 UTC',
                    category: 'Economy',
                    title: 'Central Banks Coordinate Policy Response to Inflation Concerns',
                    excerpt: 'Major central banks announced a coordinated approach to address persistent inflation pressures while supporting economic growth.',
                    tickers: ['TLT', 'GLD', 'UUP']
                },
                {
                    source: 'Bloomberg',
                    time: 'April 7, 2025 - 22:30 UTC',
                    category: 'Technology',
                    title: 'Quantum Computing Breakthrough Could Accelerate AI Development',
                    excerpt: 'Scientists report significant advancement in quantum computing that could exponentially increase processing power for machine learning algorithms.',
                    tickers: ['IBM', 'MSFT', 'GOOG']
                }
            ];
            
            // Add each news item with animation delay
            additionalNews.forEach((item, index) => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.style.opacity = '0';
                newsItem.style.transform = 'translateY(20px)';
                
                newsItem.innerHTML = `
                    <div class="news-meta">
                        <span class="news-source"><i class="fas fa-newspaper"></i> ${item.source}</span>
                        <span class="news-time"><i class="far fa-clock"></i> ${item.time}</span>
                        <span class="news-category"><i class="fas fa-tag"></i> ${item.category}</span>
                    </div>
                    <h4 class="news-title">${item.title}</h4>
                    <p class="news-excerpt">${item.excerpt}</p>
                    <div class="news-tickers">
                        <span>Related: </span>
                        ${item.tickers.map(ticker => `<a href="#" class="ticker-tag">$${ticker}</a>`).join(' ')}
                    </div>
                    <a href="#" class="news-read-more">Read Full Article <i class="fas fa-external-link-alt"></i></a>
                `;
                
                newsContainer.appendChild(newsItem);
                
                // Staggered animation
                setTimeout(() => {
                    newsItem.style.transition = 'all 0.5s ease';
                    newsItem.style.opacity = '1';
                    newsItem.style.transform = 'translateY(0)';
                }, 100 * (index + 1));
            });
            
            // Reset button
            this.textContent = 'Load More News';
        }, 1500);
    });
    
    // Live market data simulation
    function updateMarketData() {
        const indices = [
            {
                selector: '.index-card:nth-child(1)',
                price: 5432.18,
                change: 26.41,
                percent: 0.49
            },
            {
                selector: '.index-card:nth-child(2)',
                price: 18768.54,
                change: 112.17,
                percent: 0.65
            },
            {
                selector: '.index-card:nth-child(3)',
                price: 42135.76,
                change: -31.08,
                percent: -0.07
            },
            {
                selector: '.index-card:nth-child(4)',
                price: 2486.23,
                change: 17.42,
                percent: 0.71
            }
        ];
        
        indices.forEach(index => {
            const indexCard = document.querySelector(index.selector);
            if (!indexCard) return;  // Skip if element not found
            
            const priceElement = indexCard.querySelector('.price');
            const changeElement = indexCard.querySelector('.change');
            const chartElement = indexCard.querySelector('.mini-chart div');
            
            if (!priceElement || !changeElement || !chartElement) return;
            
            // Random price change
            const changeAmount = (Math.random() * 10 - 5).toFixed(2);
            const newPrice = (index.price + parseFloat(changeAmount)).toFixed(2);
            const newPercent = (parseFloat(changeAmount) / newPrice * 100).toFixed(2);
            const isPositive = parseFloat(changeAmount) >= 0;
            
            // Flash animation
            priceElement.classList.add(isPositive ? 'flash-positive' : 'flash-negative');
            
            // Update values
            priceElement.textContent = Intl.NumberFormat('en-US').format(newPrice);
            changeElement.textContent = `${isPositive ? '+' : ''}${changeAmount} (${isPositive ? '+' : ''}${newPercent}%)`;
            changeElement.className = `change ${isPositive ? 'positive' : 'negative'}`;
            chartElement.className = isPositive ? 'chart-up' : 'chart-down';
            
            // Remove flash after animation
            setTimeout(() => {
                priceElement.classList.remove('flash-positive', 'flash-negative');
            }, 1000);
        });
    }
    
    // Update market data every 15 seconds
    setInterval(updateMarketData, 15000);
    
    // Apply news filters
    document.getElementById('applyNewsFilter').addEventListener('click', function() {
        const category = document.getElementById('newsCategory').value;
        const source = document.getElementById('newsSource').value;
        const timeframe = document.getElementById('newsTimeframe').value;
        
        // Show loading spinner
        document.getElementById('newsContainer').innerHTML = `
            <div class="text-center my-5">
                <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3">Filtering news...</p>
            </div>
        `;
        
        // Simulate API delay
        setTimeout(() => {
            const newsContainer = document.getElementById('newsContainer');
            
            // Clear loading state
            newsContainer.innerHTML = '';
            
            // In a real app, these would be filtered results from an API
            // For demo, we'll just show a subset of the original news with a filter notification
            
            // Create filter tag
            const filterTag = document.createElement('div');
            filterTag.className = 'filter-tag mb-3';
            filterTag.innerHTML = `
                <span>Filtered by: </span>
                ${category !== 'all' ? `<span class="badge bg-primary me-2">${category}</span>` : ''}
                ${source !== 'all' ? `<span class="badge bg-info me-2">${source}</span>` : ''}
                ${timeframe !== 'all' ? `<span class="badge bg-secondary me-2">${timeframe}</span>` : ''}
                <button class="btn btn-sm btn-outline-light ms-2" id="clearFiltersBtn">Clear Filters</button>
            `;
            
            // Add filter tag
            if (category !== 'all' || source !== 'all' || timeframe !== 'today') {
                newsContainer.appendChild(filterTag);
            }
            
            // Add filtered news (in a real app, this would be the actual filtered results)
            const filteredNews = [
                {
                    source: 'Bloomberg',
                    time: 'April 8, 2025 - 05:30 UTC',
                    category: 'Stocks',
                    title: 'Fed Signals Potential Rate Cuts as Inflation Eases',
                    excerpt: 'Federal Reserve officials indicated they could start cutting interest rates in the coming months if inflation continues to cool, minutes from their last meeting showed.',
                    tickers: ['SPY', 'QQQ', 'DIA']
                },
                {
                    source: 'Reuters',
                    time: 'April 8, 2025 - 04:15 UTC',
                    category: 'Technology',
                    title: 'Tech Giants Report Stronger Than Expected Q1 Earnings',
                    excerpt: 'Major technology companies exceeded analyst expectations with their first quarter results, driven by growth in AI and cloud services revenue.',
                    tickers: ['AAPL', 'GOOGL', 'MSFT']
                },
                {
                    source: 'CNBC',
                    time: 'April 8, 2025 - 01:22 UTC',
                    category: 'Cryptocurrency',
                    title: 'Bitcoin ETFs See Record Inflows as Price Stabilizes Above $80,000',
                    excerpt: 'Bitcoin ETFs recorded their highest daily inflows since launching, suggesting increased institutional adoption as the cryptocurrency maintains its position above $80,000.',
                    tickers: ['BTC', 'ETH', 'COIN']
                }
            ].filter(item => {
                if (category !== 'all' && !item.category.toLowerCase().includes(category.toLowerCase())) {
                    return false;
                }
                if (source !== 'all' && !item.source.toLowerCase().includes(source.toLowerCase())) {
                    return false;
                }
                return true;
            });
            
            // Add each news item with animation
            filteredNews.forEach((item, index) => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.style.opacity = '0';
                newsItem.style.transform = 'translateY(20px)';
                
                newsItem.innerHTML = `
                    <div class="news-meta">
                        <span class="news-source"><i class="fas fa-newspaper"></i> ${item.source}</span>
                        <span class="news-time"><i class="far fa-clock"></i> ${item.time}</span>
                        <span class="news-category"><i class="fas fa-tag"></i> ${item.category}</span>
                    </div>
                    <h4 class="news-title">${item.title}</h4>
                    <p class="news-excerpt">${item.excerpt}</p>
                    <div class="news-tickers">
                        <span>Related: </span>
                        ${item.tickers.map(ticker => `<a href="#" class="ticker-tag">$${ticker}</a>`).join(' ')}
                    </div>
                    <a href="#" class="news-read-more">Read Full Article <i class="fas fa-external-link-alt"></i></a>
                `;
                
                newsContainer.appendChild(newsItem);
                
                // Staggered animation
                setTimeout(() => {
                    newsItem.style.transition = 'all 0.5s ease';
                    newsItem.style.opacity = '1';
                    newsItem.style.transform = 'translateY(0)';
                }, 100 * (index + 1));
            });
            
            // If no results
            if (filteredNews.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results text-center my-5';
                noResults.innerHTML = `
                    <i class="fas fa-search fa-3x mb-3"></i>
                    <h5>No news found matching your filters</h5>
                    <p class="text-muted">Try adjusting your filter criteria</p>
                    <button class="btn btn-outline-light mt-3" id="resetFiltersBtn">Reset Filters</button>
                `;
                newsContainer.appendChild(noResults);
                
                // Add reset filters functionality
                document.getElementById('resetFiltersBtn').addEventListener('click', function() {
                    document.getElementById('newsCategory').value = 'all';
                    document.getElementById('newsSource').value = 'all';
                    document.getElementById('newsTimeframe').value = 'today';
                    document.getElementById('applyNewsFilter').click();
                });
            }
            
            // Add clear filters functionality
            const clearFiltersBtn = document.getElementById('clearFiltersBtn');
            if (clearFiltersBtn) {
                clearFiltersBtn.addEventListener('click', function() {
                    document.getElementById('newsCategory').value = 'all';
                    document.getElementById('newsSource').value = 'all';
                    document.getElementById('newsTimeframe').value = 'today';
                    document.getElementById('applyNewsFilter').click();
                });
            }
            
            // Close the dropdown
            const dropdown = document.getElementById('newsFilterDropdown');
            const bsDropdown = bootstrap.Dropdown.getInstance(dropdown);
            if (bsDropdown) {
                bsDropdown.hide();
            }
            
        }, 1000);
    });
    
    // Set the logged in user info if available
    if (typeof currentUser !== 'undefined' && currentUser) {
        document.querySelector('.navbar .d-flex:last-child').innerHTML = `
            <div class="user-info me-3">
                <i class="fas fa-user-circle me-1"></i> ${currentUser}
            </div>
            <button class="btn btn-outline-light">Logout</button>
        `;
    }
});

// Set current user
const currentUser = 'lucifer0177';
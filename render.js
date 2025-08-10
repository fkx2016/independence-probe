/**
 * Independence Probe Renderer JavaScript
 * Handles dynamic loading and display of probe results
 */

class IndependenceProbeRenderer {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.init();
    }

    init() {
        this.displayWelcomeMessage();
        this.loadProbeData();
    }

    displayWelcomeMessage() {
        const welcomeHTML = `
            <div class="result-item">
                <div class="result-title">Welcome to Independence Probe Renderer</div>
                <div class="result-description">
                    This renderer displays results from independence probe analysis.
                    Load your probe data to see detailed results.
                </div>
            </div>
        `;
        this.contentElement.innerHTML = welcomeHTML;
    }

    loadProbeData() {
        // Check for data in URL parameters or local storage
        const urlParams = new URLSearchParams(window.location.search);
        const dataFile = urlParams.get('data');
        
        if (dataFile) {
            this.fetchProbeData(dataFile);
        } else {
            this.displaySampleData();
        }
    }

    async fetchProbeData(dataFile) {
        try {
            const response = await fetch(dataFile);
            const data = await response.json();
            this.renderProbeResults(data);
        } catch (error) {
            this.displayError('Failed to load probe data: ' + error.message);
        }
    }

    displaySampleData() {
        const sampleData = {
            probeVersion: 'v1.0.0',
            results: [
                {
                    title: 'Sample Independence Test',
                    description: 'Example statistical independence analysis',
                    status: 'completed',
                    details: 'No actual data loaded - this is sample content'
                }
            ]
        };
        this.renderProbeResults(sampleData);
    }

    renderProbeResults(data) {
        let html = `
            <div class="result-item">
                <div class="result-title">Independence Probe Results (${data.probeVersion || 'Unknown Version'})</div>
                <div class="result-description">Analysis completed successfully</div>
            </div>
        `;

        if (data.results && data.results.length > 0) {
            data.results.forEach(result => {
                html += `
                    <div class="result-item">
                        <div class="result-title">${result.title || 'Untitled Result'}</div>
                        <div class="result-description">${result.description || result.details || 'No description available'}</div>
                    </div>
                `;
            });
        }

        this.contentElement.innerHTML = html;
    }

    displayError(message) {
        const errorHTML = `
            <div class="result-item" style="border-left-color: #dc3545;">
                <div class="result-title" style="color: #dc3545;">Error</div>
                <div class="result-description">${message}</div>
            </div>
        `;
        this.contentElement.innerHTML = errorHTML;
    }
}

// Initialize the renderer when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IndependenceProbeRenderer();
});

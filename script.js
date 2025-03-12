// script.js

// Wait for the DOM to fully load before running any JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Select the CTA button and hero media area from the HTML
    const ctaButton = document.querySelector('.cta-button');
    const heroMedia = document.querySelector('.hero-media');
    let videoForm = null; // Will hold the form if added later

    // Function to simulate video generation (placeholder for now)
    function generateVideo(websiteUrl) {
        // Simulate an API call or processing (in a real app, this would hit an API like InVideo or Synthesia)
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock response: a sample video URL or message
                const mockVideoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Placeholder (Rickroll for fun, replace with your video)
                resolve({
                    url: mockVideoUrl,
                    message: `Generated a video for ${websiteUrl}!`
                });
            }, 2000); // Simulate 2-second processing time
        });
    }

    // Function to display the generated video or message
    function displayVideo(result) {
        // Clear existing content in hero-media
        heroMedia.innerHTML = '';

        // Create an iframe or message to display the video
        const videoEmbed = document.createElement('iframe');
        videoEmbed.width = '560';
        videoEmbed.height = '315';
        videoEmbed.src = result.url;
        videoEmbed.title = 'Generated Advertising Video';
        videoEmbed.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        videoEmbed.allowFullscreen = true;

        // Add the video or message to the hero media area
        heroMedia.appendChild(videoEmbed);
        alert(result.message); // Notify the user (can be replaced with a modal or toast)
    }

    // Function to handle form submission or button click
    function handleVideoGeneration(event) {
        event.preventDefault(); // Prevent default form submission or button behavior

        // Get the website URL (either from a form or a hardcoded/prompted input)
        let websiteUrl = '';
        
        // If there's a form (you can add <form id="videoForm" ...> in HTML), use it
        if (videoForm) {
            websiteUrl = videoForm.querySelector('input[type="url"]').value.trim();
        } else {
            // For now, use a prompt as a simple input method (you can remove this and add a form)
            websiteUrl = prompt('Please enter your website URL (e.g., https://yourwebsite.com):');
        }

        // Validate the URL (basic check)
        if (!websiteUrl || !websiteUrl.startsWith('http')) {
            alert('Please enter a valid website URL starting with http:// or https://');
            return;
        }

        // Show loading message or spinner (simulated with text for now)
        heroMedia.innerHTML = '<p>Generating your video... Please wait!</p>';

        // Call the video generation function
        generateVideo(websiteUrl)
            .then(displayVideo)
            .catch(error => {
                console.error('Error generating video:', error);
                heroMedia.innerHTML = '<p>Sorry, there was an error generating your video. Please try again.</p>';
                alert('An error occurred. Please check the console for details.');
            });
    }

    // Add event listener to the CTA button
    if (ctaButton) {
        ctaButton.addEventListener('click', handleVideoGeneration);
    }

    // If you add a form in the HTML (e.g., in the hero or CTA section), uncomment and adjust this:
    /*
    videoForm = document.getElementById('videoForm');
    if (videoForm) {
        videoForm.addEventListener('submit', handleVideoGeneration);
    }
    */

    // Example form HTML you can add to your page (place it in the hero or CTA section):
    /*
    <form id="videoForm" aria-label="Generate Video Form">
        <label for="websiteUrl">Enter your website URL:</label>
        <input type="url" id="websiteUrl" name="websiteUrl" required placeholder="https://yourwebsite.com" aria-required="true">
        <button type="submit" aria-label="Generate Video">Generate Video</button>
    </form>
    */
});

// Optional: Add a basic error handler for the window
window.onerror = function(message, source, lineno, colno, error) {
    console.error('JavaScript Error:', {
        message: message,
        source: source,
        line: lineno,
        column: colno,
        error: error
    });
    alert('An unexpected error occurred. Please refresh the page and try again.');
};

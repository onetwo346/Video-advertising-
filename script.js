// script.js

// Wait for the DOM to fully load before running any JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Select the CTA button, hero media area, and form (if added)
    const ctaButton = document.querySelector('.cta-button');
    const heroMedia = document.querySelector('.hero-media');
    let videoForm = document.getElementById('videoForm');

    // Function to simulate video generation (placeholder for now)
    function generateVideo(websiteUrl) {
        // Simulate an API call or processing (in a real app, this would hit an API like InVideo or Synthesia)
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock response: a neutral sample video URL or custom message
                const sampleVideoUrl = 'https://www.youtube.com/embed/ZniVgo8UiuU'; // Placeholder: A generic tech promo video (replace with your own)
                resolve({
                    url: sampleVideoUrl,
                    message: `Generated a promotional video for ${websiteUrl}! Check the preview below.`
                });
            }, 2000); // Simulate 2-second processing time
        });
    }

    // Function to display the generated video or message
    function displayVideo(result) {
        // Clear existing content in hero-media
        heroMedia.innerHTML = '';

        // Create an iframe to display the video
        const videoEmbed = document.createElement('iframe');
        videoEmbed.width = '560';
        videoEmbed.height = '315';
        videoEmbed.src = result.url;
        videoEmbed.title = 'Generated Advertising Video Preview';
        videoEmbed.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        videoEmbed.allowFullscreen = true;

        // Add the video and message to the hero media area
        heroMedia.appendChild(videoEmbed);
        const message = document.createElement('p');
        message.textContent = result.message;
        heroMedia.appendChild(message);
    }

    // Function to handle form submission or button click
    function handleVideoGeneration(event) {
        event.preventDefault(); // Prevent default form submission or button behavior

        // Get the website URL from the form or prompt
        let websiteUrl = '';
        if (videoForm) {
            websiteUrl = videoForm.querySelector('input[type="url"]').value.trim();
        } else {
            // Fallback to prompt (remove this once form is added)
            websiteUrl = prompt('Please enter your website URL (e.g., https://yourwebsite.com):');
        }

        // Validate the URL (basic check)
        if (!websiteUrl || !websiteUrl.startsWith('http')) {
            alert('Please enter a valid website URL starting with http:// or https://');
            return;
        }

        // Show loading message
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

    // Add event listener to the form (if present)
    if (videoForm) {
        videoForm.addEventListener('submit', handleVideoGeneration);
    }
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

// script.js

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }

    try {
        // Send form data to Formspree
        const response = await fetch('https://formspree.io/f/xldgvwgr', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        });

        if (response.ok) {
            // Clear form
            contactForm.reset();
            // Show success message
            alert('Thank you for your message! I’ll get back to you soon.');
        } else {
            throw new Error('Form submission failed. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your message. Please try again later.');
    }
});
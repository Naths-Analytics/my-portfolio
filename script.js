// script.js

// Typing Animation for Hero Section
document.addEventListener('DOMContentLoaded', () => {
    const typedName = document.getElementById('typed-name');
    const text = "Hi, I'm Nathan Bristow";
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typedName.textContent += text.charAt(index);
            index++;
            setTimeout(type, 250); // Adjust speed (100ms per character)
        }
    }

    type();
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    let name = formData.get('name');
    let email = formData.get('email');
    let phone = formData.get('phone');
    let message = formData.get('message');

    // Sanitize inputs using DOMPurify
    name = DOMPurify.sanitize(name);
    email = DOMPurify.sanitize(email);
    phone = DOMPurify.sanitize(phone);
    message = DOMPurify.sanitize(message);

    // Basic validation
    if (!name || !email || !phone || !message) {
        alert('Please fill out all fields.');
        return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Optional: Phone number validation (simple example)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number (e.g., 07 5585 4285 or +61 7 55 854 285).');
        return;
    }

    try {
        // Update FormData with sanitized values
        formData.set('name', name);
        formData.set('email', email);
        formData.set('phone', phone);
        formData.set('message', message);

        // Send form data to Formspree
        const response = await fetch('https://formspree.io/f/xldgvwgr', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        });

        if (response.ok) {
            contactForm.reset();
            alert('Thank you for your message! I’ll get back to you soon.');
        } else {
            throw new Error('Form submission failed. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your message. Please try again later.');
    }
});
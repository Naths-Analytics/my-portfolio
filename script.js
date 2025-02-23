// In script.js, sanitize form inputs before submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    let name = formData.get('name');
    let email = formData.get('email');
    let message = formData.get('message');

    // Sanitize inputs using DOMPurify
    name = DOMPurify.sanitize(name);
    email = DOMPurify.sanitize(email);
    message = DOMPurify.sanitize(message);

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }

    // Email format validation (simple regex example)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    try {
        // Update FormData with sanitized values
        formData.set('name', name);
        formData.set('email', email);
        formData.set('message', message);

        // Send form data to Formspree
        const response = await fetch('https://formspree.io/f/FORMSPREE_FORM_ID_PLACEHOLDER', {
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
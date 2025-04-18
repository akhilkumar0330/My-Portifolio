// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Add scrollspy to <body>
    document.body.setAttribute('data-bs-spy', 'scroll');
    document.body.setAttribute('data-bs-target', '#navbarNav');
    document.body.setAttribute('data-bs-offset', '100');

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Portfolio and Gallery filtering
    const filterButtons = document.querySelectorAll('.btn-filter');
    
    if(filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Get container (portfolio or gallery)
                const container = this.closest('.row').parentElement.querySelector('.portfolio-container, .gallery-container');
                const items = container.querySelectorAll('.portfolio-item, .gallery-item');
                
                // Filter items
                if (filterValue === 'all') {
                    items.forEach(item => {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 50);
                    });
                } else {
                    items.forEach(item => {
                        if (item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                            setTimeout(() => item.style.opacity = '1', 50);
                        } else {
                            item.style.opacity = '0';
                            setTimeout(() => item.style.display = 'none', 500);
                        }
                    });
                }
            });
        });
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!validateForm()) {
                event.preventDefault();
            }
        });
    }
});

// Form validation function
function validateForm() {
    let isValid = true;
    
    // Name validation
    const name = document.getElementById('name');
    if(name) {
        if (name.value.trim().length < 2) {
            document.getElementById('nameError').innerText = "Name must be at least 2 characters";
            isValid = false;
        } else {
            document.getElementById('nameError').innerText = "";
        }
    }

    // Email validation
    const email = document.getElementById('email');
    if(email) {
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email.value)) {
            document.getElementById('emailError').innerText = "Please enter a valid email address";
            isValid = false;
        } else {
            document.getElementById('emailError').innerText = "";
        }
    }

    // Subject validation
    const subject = document.getElementById('subject');
    if(subject) {
        if (subject.value.trim().length < 3) {
            document.getElementById('subjectError').innerText = "Subject must be at least 3 characters";
            isValid = false;
        } else {
            document.getElementById('subjectError').innerText = "";
        }
    }

    // Mobile validation
    const mobile = document.getElementById('mobile');
    if(mobile) {
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(mobile.value)) {
            document.getElementById('mobileError').innerText = "Please enter a valid 10-digit mobile number";
            isValid = false;
        } else {
            document.getElementById('mobileError').innerText = "";
        }
    }

    // Message validation
    const message = document.getElementById('message');
    if(message) {
        if (message.value.trim().length < 10) {
            document.getElementById('messageError').innerText = "Message must be at least 10 characters";
            isValid = false;
        } else {
            document.getElementById('messageError').innerText = "";
        }
    }

    // Password validation (for original contact form)
    const password = document.getElementById('password');
    if(password) {
        if (password.value.length < 6) {
            document.getElementById('passwordError').innerText = "Password must be at least 6 characters";
            isValid = false;
        } else {
            document.getElementById('passwordError').innerText = "";
        }
        
        // Confirm Password validation
        const confirmPassword = document.getElementById('confirm_password');
        if (confirmPassword.value !== password.value) {
            document.getElementById('confirmPasswordError').innerText = "Passwords do not match";
            isValid = false;
        } else {
            document.getElementById('confirmPasswordError').innerText = "";
        }
    }

    // Username validation (for original contact form)
    const username = document.getElementById('username');
    if(username) {
        if (username.value.length < 3) {
            document.getElementById('usernameError').innerText = "Username must be at least 3 characters";
            isValid = false;
        } else {
            document.getElementById('usernameError').innerText = "";
        }
    }

    return isValid;
}

// Animation on scroll
window.addEventListener('scroll', function() {
    const animatedElements = document.querySelectorAll('.animate');
    
    animatedElements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(position < screenPosition) {
            element.classList.add('animated');
        }
    });
});

// Typing effect for hero section
const typingElement = document.querySelector('.typing-text');

if(typingElement) {
    const text = typingElement.getAttribute('data-text');
    const typeSpeed = 100;
    let i = 0;

    function type() {
        if(i < text.length) {
            typingElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, typeSpeed);
        }
    }

    type();
}

// Counter animation for skills section
const counters = document.querySelectorAll('.counter');

if(counters.length > 0) {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 200;
        const inc = target / speed;
        
        function updateCount() {
            const count = +counter.innerText;
            
            if(count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        }
        
        updateCount();
    });
}

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

if(backToTopButton) {
    window.addEventListener('scroll', function() {
        if(window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
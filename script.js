
/*-------PROJECT-------------PROJECT--------------PROJECT--------------PROJECT--------------PROJECT--------------PROJECT--------------PROJECT------*/

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.card-image');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.parentElement.classList.add('loaded');
        });
        

        if (img.complete) {
            img.parentElement.classList.add('loaded');
        }
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            console.log(`Portfolio card ${index + 1} clicked`);

        });
    });
});

document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.portfolio-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
        const speed = (index + 1) * 2;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        

        if (!card.matches(':hover')) {
            card.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });
});

/*-------CERTIFICATE-------------CERTIFICATE--------------CERTIFICATE--------------CERTIFICATE--------------CERTIFICATE--------------CERTIFICATE--------------CERTIFICATE------*/


(function() {
    'use strict';
    

    window.addEventListener('DOMContentLoaded', function() {
        

        const modalHTML = `
            <div id="certificateModal" class="certificate-modal">
                <span class="modal-close">&times;</span>
                <img class="modal-content" id="modalImage">
                <div class="modal-caption" id="modalCaption"></div>
            </div>
        `;
        

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('certificateModal');
        const modalImg = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        const closeBtn = document.querySelector('.modal-close');
        
        const images = document.querySelectorAll('.certificate-item img');
        
        console.log('Found ' + images.length + ' certificate images');
        

        images.forEach(function(img) {
            img.addEventListener('click', function() {
                console.log('Image clicked:', this.src); 
                modal.style.display = 'flex';
                setTimeout(function() {
                    modal.classList.add('active');
                }, 10);
                modalImg.src = img.src;
                document.body.style.overflow = 'hidden';
            });
        });
        

        function closeModal() {
            console.log('Closing modal'); 
            modal.classList.remove('active');
            setTimeout(function() {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 400);
        }
        

        closeBtn.addEventListener('click', function() {
            closeModal();
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('active')) return;
            
            const imagesArray = Array.from(images);
            const currentSrc = modalImg.src;
            const currentIndex = imagesArray.findIndex(function(img) {
                return img.src === currentSrc;
            });
            
            if (e.key === 'ArrowRight') {
                const nextIndex = (currentIndex + 1) % images.length;
                modalImg.src = images[nextIndex].src;
                modalCaption.textContent = images[nextIndex].alt;
            } else if (e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + images.length) % images.length;
                modalImg.src = images[prevIndex].src;
                modalCaption.textContent = images[prevIndex].alt;
            }
        });
        
        console.log('Certificate modal initialized successfully'); 
    });
})();

/*-------EXPERIENCE-------------EXPERIENCE--------------EXPERIENCE--------------EXPERIENCE--------------EXPERIENCE--------------EXPERIENCE--------------EXPERIENCE------*/


document.addEventListener('DOMContentLoaded', function() {

    const certImage = document.querySelector('.certificate-image');
    
    if (certImage) {

        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <span class="close-modal">&times;</span>
            <img class="modal-content" src="${certImage.src}" alt="${certImage.alt}">
        `;
        

        document.body.appendChild(modal);
        

        const modalImg = modal.querySelector('.modal-content');
        const closeBtn = modal.querySelector('.close-modal');
        

        certImage.addEventListener('click', function() {
            modal.classList.add('active');
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden'; 
        });
        

        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; 
        });
        

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

/*-------CONTACT-------------CONTACT--------------CONTACT--------------CONTACT--------------CONTACT--------------CONTACT--------------CONTACT-------*/ 
const CONFIG = {
    emailjs: {
        publicKey: 'rg3BazSPk1pIO2cpl',   
        serviceId: 'service_1uhnkuq',      
        templateId: 'template_scb57sa'     
    }
};

(function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = function() {
        emailjs.init(CONFIG.emailjs.publicKey);
        console.log('✅ EmailJS initialized successfully');
    };
    script.onerror = function() {
        console.error('❌ Failed to load EmailJS');
    };
    document.head.appendChild(script);
})();


document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        if (validateForm(formData)) {
            submitForm(formData);
        }
    });
    

    function validateForm(data) {
        if (!data.from_name || !data.from_email || !data.subject || !data.message) {
            showMessage('Please fill in all required fields', 'error');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.from_email)) {
            showMessage('Please enter a valid email address', 'error');
            return false;
        }
        
        if (data.from_name.trim().length < 2) {
            showMessage('Please enter a valid name (at least 2 characters)', 'error');
            return false;
        }
        
        if (data.message.trim().length < 10) {
            showMessage('Please write a message with at least 10 characters', 'error');
            return false;
        }
        
        return true;
    }
    
 
    function submitForm(data) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        btnText.textContent = 'Sending';
        

        if (typeof emailjs === 'undefined') {
            showMessage('Email service not loaded. Please refresh and try again.', 'error');
            resetButton(submitBtn, btnText, originalText);
            return;
        }
        
    

        emailjs.send(
            CONFIG.emailjs.serviceId,
            CONFIG.emailjs.templateId,
            {
                from_name: data.from_name,
                from_email: data.from_email,
                subject: data.subject,
                message: data.message,
                to_email: 'ladylybiyo07@gmail.com'
            }
        )
        .then(function(response) {
            console.log('✅ SUCCESS!', response.status, response.text);
            showMessage('Message sent successfully! I\'ll get back to you soon. (๑ > ᴗ < ๑)', 'success');
            contactForm.reset();
            

            btnText.textContent = '✓ Sent!';
            setTimeout(function() {
                resetButton(submitBtn, btnText, originalText);
            }, 3000);
        })
        .catch(function(error) {
            console.error('❌ FAILED...', error);
            
            let errorMessage = 'Failed to send message. Please try again. ՞(っ-ᯅ-ς)՞';
            
            if (error.text) {
                if (error.text.includes('Invalid')) {
                    errorMessage = 'Configuration error. Please contact the site administrator.';
                } else if (error.text.includes('rate limit')) {
                    errorMessage = 'Too many requests. Please try again later.';
                }
            }
            
            showMessage(errorMessage, 'error');
            resetButton(submitBtn, btnText, originalText);
        });
    }
    

    function resetButton(submitBtn, btnText, originalText) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        btnText.textContent = originalText;
    }
    

    function showMessage(message, type) {

        const existingMessage = document.querySelector('.message-notification');
        if (existingMessage) {
            existingMessage.remove();
        }


        const messageDiv = document.createElement('div');
        messageDiv.className = `message-notification ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-icon">${type === 'success' ? '✓' : '✕'}</span>
                <span class="message-text">${message}</span>
            </div>
        `;
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 18px 25px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            z-index: 100000;
            animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            background-color: ${type === 'success' ? '#27001f' : '#ef4444'};
            color: white;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(messageDiv);
        

        setTimeout(function() {
            messageDiv.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(function() {
                messageDiv.remove();
            }, 400);
        }, 5000);
    }
    

    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});


const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .message-notification {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }
    
    .message-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .message-icon {
        font-size: 20px;
        font-weight: bold;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
    }
    
    .message-text {
        flex: 1;
        line-height: 1.5;
    }
`;
document.head.appendChild(style);

console.log('✅ Contact form scripts initialized!');


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {

                const navbar = document.querySelector('.navbar');
                const menuIcon = document.getElementById('menu-icon');
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


/*-------MENU--------------MENU--------------MENU--------------MENU--------------MENU--------------MENU--------------MENU-------*/
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

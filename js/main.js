const cursor = document.querySelector('.cursor');

// Terminal code
function handleCommand(command) {
    const cmd = command.trim().toLowerCase();
    let response = '';

    const commands = {
        'barrel roll': () => {
            document.querySelector('#terminal').style.animation = 'rotate 2s forwards linear';
            return `<p>weeeee</p>`;
        },
        'credits': () => `<p>Terminal's design and idea are based on Ashleigh's implementation. You can check her portfolio <a href="https://ashleighsimonelli.co.uk/">here</a>.</p>`,
        'dark': () => {
            if (document.body.classList.contains('dark-mode')) {
                return `<p>Dark mode is already active.</p>`;
            } else {
                document.body.classList.add('dark-mode');
                localStorage.setItem('dark-mode', 'true');
                return `<p>You changed to dark mode.</p>`;
            }
        },
        'light': () => {
            if (document.body.classList.contains('dark-mode')) {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('dark-mode', 'false');
                return `<p>You changed to light mode.</p>`;
            } else {
                return `<p>Light mode is already active.</p>`;
            }
        },
        'codepen': () => {
            window.location.href = 'https://codepen.io/panos-k';
            return `<p>You will be redirected to my CodePen page.</p>`;
        },
        'github': () => {
            window.location.href = 'https://github.com/panoskwst';
            return `<p>You will be redirected to my GitHub page.</p>`;
        },
        'about': () => redirectToSection(cmd),
        'projects': () => redirectToSection(cmd),
        'contact': () => redirectToSection(cmd),
        'help': () => `
            <p>Available commands:</p>
            <ul>
                <li><code>credits</code>: see who gave me the idea for the terminal</li>
                <li><code>barrel roll</code>: Rotate the terminal</li>
                <li><code>dark</code>: Change to dark mode</li>
                <li><code>light</code>: Change to light mode</li>
                <li><code>customize</code>: Change the style of my page!</li>
                <li><code>codepen</code>: Redirect to my CodePen page</li>
                <li><code>github</code>: Redirect to my GitHub page</li>
                <li><code>about</code>: Redirect to the About section</li>
                <li><code>projects</code>: Redirect to the Projects section</li>
                <li><code>contact</code>: Redirect to the Contact section</li>
                <li><code>help</code>: List available commands</li>
            </ul>`,
        'customize': () => {
            customizationStep = 1;
            return `<p>Enter a background color for the first section:</p>`;
        },
    };

    response = commands[cmd] ? commands[cmd]() : handleCustomization(cmd) || `<p>Unknown command: ${command}</p>`;

    cursor.style.left = '20px';
    displayResponse(response);
}

function redirectToSection(sectionID) {
    scrollToSection(sectionID);
    return `<p>You will be redirected to the ${sectionID} section of my portfolio!</p>`;
}

function handleCustomization(cmd) {
    const customizationColors = [null, 'section1Color', 'section2Color', 'section3Color', 'section4Color'];
    if (typeof customizationStep !== 'undefined') {
        window[customizationColors[customizationStep]] = cmd;
        customizationStep++;
        if (customizationStep > 4) {
            customizationStep = 0;
            applyCustomizations(section1Color, section2Color, section3Color, section4Color);
            return `<p>Customizations applied!</p>`;
        }
        return `<p>Now, enter a background color for the ${['First', 'About', 'Projects', 'Contact'][customizationStep - 1]} Section:</p>`;
    }
    return null;
}

function scrollToSection(sectionID) {
    const section = document.getElementById(sectionID);
    const headerHeight = document.getElementById('header').offsetHeight;
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
        top: sectionTop - headerHeight,
        behavior: 'smooth',
    });
}

function applyCustomizations(color1, color2, color3, color4) {
    const sections = ['intro', 'about', 'projects', 'contact'];
    [color1, color2, color3, color4].forEach((color, index) => {
        document.getElementById(sections[index]).style.backgroundColor = color;
    });
}

function displayResponse(response) {
    const terminalBody = document.querySelector('.response');
    const responseDiv = document.createElement('div');
    responseDiv.innerHTML = response;
    terminalBody.appendChild(responseDiv);
}

// Event listeners
document.querySelector('.terminal-input').addEventListener('submit', function (event) {
    event.preventDefault();
    const inputField = event.target.querySelector('input');
    handleCommand(inputField.value);
    inputField.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    const input = document.querySelector('.control input');

    input.addEventListener('input', function () {
        cursor.style.left = `${20 + (this.value.length * 10)}px`;
    });

    input.addEventListener('focus', () => cursor.style.display = 'block');
    input.addEventListener('blur', () => cursor.style.display = 'none');
});

/* GSAP animations */
gsap.registerPlugin(TextPlugin);

const texts = ["Web Developer", "Full Stack Developer", "Backend Specialist"];

// Cursor animation
gsap.to('#cursor', {
    opacity: 0,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
});

const tlMaster = gsap.timeline({ repeat: -1 });

texts.forEach(text => {
    tlMaster.add(gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 })
        .to('#skills', { duration: 1, text }));
});

// contact code
const email = document.getElementById('email');
const message = document.getElementById('message');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');
const name = document.getElementById('first_name');
const sur_name = document.getElementById('sur_name');
const s_name = document.getElementById('S_name');
const s_email = document.getElementById('S_email');
const nameLabelSpan = document.querySelector('label[for="name"] span');
const emailLabelSpan = document.querySelector('label[for="email"] span');
const messageLabelSpan = document.querySelector('label[for="message"] span');

// Contact animation timeline
let tlCont  = gsap.timeline({
    paused:true,
    onComplete: function() {
        form.submit();
    }
});

tlCont.to('#form',{
    opacity: 0,
    duration: 1,
})
.to('.sender',{
    opacity: 1,
    duration:1
}, 1)
.to('.recipient',{
    opacity: 1,
    duration:1
}, 1)
.to('.seal',{
    opacity: 1,
    duration:1
}, 1)
.to('.envelope',{
    scale: 0.3,
    duration: 1
})
.to('.envelope',{
    y: -600,
    opacity: 0,
    duration: 2.5,
    ease: "bounce.in",
}, 2)

form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorElement.innerText = null;
    let messages = [] // Create an array to store error messages
    s_name.textContent = `${name.value} ${sur_name.value}`;
    s_email.textContent = email.value;

    messageLabelSpan.classList.remove("required");
    emailLabelSpan.classList.remove("required");
    nameLabelSpan.classList.remove("required");

    if (name.value === '' || name.value == null) {
        messages.push('Please enter a name so I know how to call you');
        nameLabelSpan.classList.add("required");
    }          
    if (email.value === '' || email.value == null) {
        messages.push('Email is required');
        emailLabelSpan.classList.add("required");
    }           
    if (message.value === '' || message == null) {
        messages.push('Please write me something');
        messageLabelSpan.classList.add("required");
    }
    if (messages.length > 0) {
        errorElement.innerText = messages.join('.\n');
    } else {
        tlCont.play();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();

    mm.add({
        isMobile: "(max-width:767px)",
        isDesktop: "(min-width:768px)",
    }, (context) => {
        
        console.log(context.conditions);

        let { isMobile, isDesktop } = context.conditions;
        
        gsap.from('.bg-gray-50', {
            scrollTrigger: {
                trigger: "#tools",
                toggleActions: "play none none reset", 
                //markers: true,  
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power1.inOut",
            stagger: {
                amount: 1.5, 
                grid: isMobile ? [8,2] : [4,4], 
                axis: "y", 
                ease: "power1.inOut",
                from: "start"
            }
        });

        gsap.from('#projects .card', {
            scrollTrigger: {
                trigger: '#projects',
                toggleActions: "play none none reset", 
                //markers: true,
            },
            opacity: 0,
            duration: 1,
            ease: "power1.inOut",
            stagger: {
                amount: 1.5,
                grid: isMobile ? [4,1] : [2,2],
                axis: "y",
                ease: "power1.inOut",
                from: "start"
            }
        });
    });

    gsap.from('.profile-pic', {
        scrollTrigger: {
            trigger: "#about",
            start: "center bottom",
            end: "bottom bottom",
            toggleActions: "play none none reset", 
        },
        x: -200,
        duration: 1
    });
});

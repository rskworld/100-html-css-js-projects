/**
 * Developer: Molla Samser
 * Organization: RSK World
 * YouTube: @rskworldin
 */

document.addEventListener('DOMContentLoaded', () => {
    const secondHand = document.getElementById('second-hand');
    const minuteHand = document.getElementById('minute-hand');
    const hourHand = document.getElementById('hour-hand');
    const digitalTime = document.getElementById('digital-time');
    const dateDisplay = document.getElementById('date-display');
    const themeToggle = document.getElementById('theme-toggle');

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeToggle.textContent = '🌙';
        } else {
            themeToggle.textContent = '☀️';
        }
    });

    function updateColors() {
        const isLightMode = document.body.classList.contains('light-mode');
        const hue = Math.floor(Math.random() * 360);
        const hue2 = (hue + 60) % 360; // Analogous color for gradient

        // Ensure colors are visible and good looking based on the theme
        const accentLightness = isLightMode ? '45%' : '60%';
        const gradientLightness1 = isLightMode ? '50%' : '55%';
        const gradientLightness2 = isLightMode ? '60%' : '65%';
        const bgLightness1 = isLightMode ? '96%' : '12%';
        const bgLightness2 = isLightMode ? '90%' : '6%';

        document.body.style.setProperty('--accent-color', `hsl(${hue}, 100%, ${accentLightness})`);
        document.body.style.setProperty('--clock-rim', `linear-gradient(135deg, hsl(${hue}, 100%, ${gradientLightness1}), hsl(${hue2}, 100%, ${gradientLightness2}))`);
        document.body.style.setProperty('--bg-color', `radial-gradient(circle at top left, hsl(${hue}, 40%, ${bgLightness1}), hsl(${hue2}, 40%, ${bgLightness2}))`);
    }

    function setClock() {
        const currentDate = new Date();
        
        // Analog Clock Math
        const secondsRatio = currentDate.getSeconds() / 60;
        const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
        const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

        setRotation(secondHand, secondsRatio);
        setRotation(minuteHand, minutesRatio);
        setRotation(hourHand, hoursRatio);

        // Digital Clock Format
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        digitalTime.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

        // Date Display
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = currentDate.toLocaleDateString(undefined, options);

        // Update colors every second
        updateColors();
    }

    function setRotation(element, rotationRatio) {
        element.style.transform = `rotateZ(${rotationRatio * 360}deg)`;
    }

    // Set clock initially
    setClock();
    
    // Update every second
    setInterval(setClock, 1000);
});

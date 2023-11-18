let active = false;
const timeout = 2000; 


document.addEventListener('mousemove', () => {active = true})
document.addEventListener('keydown', () => {active = true})

setTimeout(() => {
    if (!active) {
        window.alert("You have been signed out due to inactivity")
        window.location.href = '/logout';
    }
}, timeout)
//testing some shit first
const test = document.querySelectorAll('.playable_box')

test.forEach((box)=>{
    box.addEventListener('click',(e)=>{
        const img = document.createElement('img');
        img.classList.add('move_svg');
        img.src = 'assets/cross.svg';
        e.target.appendChild(img);
    })
})
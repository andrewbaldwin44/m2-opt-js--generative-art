function generateArt() {
    for (let i = 0; i < 500; i++) {
        const randomWidth = `${Math.random() * 20}%`;
        const randomHeight = `${Math.random() * 6}%`;
        const posX = `${Math.random() * 100}%`;
        const posY = `${Math.random() * 100}%`;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomRotation = `${Math.random() * 360}deg`;
        const randomBlend = blendModes[Math.floor(Math.random() * blendModes.length)];
        const randomSkew = `${Math.random() * 360}rad`;

        const newDiv = document.createElement('div');
        newDiv.style.position = 'absolute';
        newDiv.style.width = randomWidth;
        newDiv.style.height = randomHeight;
        newDiv.style.left = posX;
        newDiv.style.top = posY;
        newDiv.style.backgroundColor = randomColor;
        newDiv.style.transform = `rotate(${randomRotation}) skew(${randomSkew})`;
        newDiv.style.mixBlendMode = randomBlend;
        newDiv.style.zIndex = 500;
        
        canvas.appendChild(newDiv);
    }
}

function updateArt(e) {

    const rangeIndex = rangeSliders.indexOf(e.target);
    const previousRangeValue = previousRangeValues[rangeIndex];
    const currentRangeValue = parseInt(e.target.value);

    const valueChange = currentRangeValue - previousRangeValue;

    previousRangeValues[rangeIndex] = currentRangeValue;

    [...canvas.children].forEach(div => {
        let attribute = e.target.id.split('-')[0];
        let newAttribute = undefined;
        
        if (attribute == 'rotation' || attribute == 'skew') {
            const previousTransform = div.style.transform.split(' ');
            const previousRotate = previousTransform[0];
            const previousSkew = previousTransform[1];

            if (attribute == 'rotation') {
                const previousRotationValue = previousRotate.replace(/[\D]/g, '');
                
                const newValue = Number(previousRotationValue) + valueChange;
                newAttribute = `rotate(${newValue}deg) ${previousSkew}`;
            }
            else {
                const previousSkewValue = previousRotate.replace(/[\D]/g, '');
                const newValue = Number(previousSkewValue) + valueChange;
                newAttribute = `${previousRotate} skew(${newValue}rad)`;
            }
            attribute = 'transform';            
        }  else {
            const currentDivValue = parseInt(div.style[attribute]);
            const newValue = `${currentDivValue + valueChange}`;

            newAttribute = `${newValue}%`;
        }
        
        div.style[attribute] = newAttribute;
    });
}

function regenerateArt() {
    canvas.innerHTML = '';
    generateArt();
}

const canvas = document.querySelector('#canvas');
const regenerateButton = document.querySelector('#regenerate');
const colors = ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'];
const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 
                    'lighten', 'color-dodge', 'color-burn', 'hard-light',
                    'soft-light', 'difference', 'exclusion', 'hue',
                    'saturation', 'color', 'luminosity'];

const controls = document.querySelector('#controls');
const rangeSliders = [...controls.children];
const previousRangeValues = Array.from(Array(rangeSliders.length)).map(() => 0);

generateArt();

regenerateButton.addEventListener('click', regenerateArt);

rangeSliders.forEach(range => {
    
    range.addEventListener('change', updateArt);
});
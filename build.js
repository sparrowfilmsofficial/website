const fs = require('fs');
const path = require('path');

function build() {
    let template = fs.readFileSync(path.join('src', 'template.html'), 'utf8');
    const components = fs.readdirSync('components');
    
    components.forEach(comp => {
        if (comp.endsWith('.html')) {
            const compHtml = fs.readFileSync(path.join('components', comp), 'utf8').trim();
            template = template.replace(`<!-- INCLUDE: components/${comp} -->`, compHtml);
        }
    });
    
    fs.writeFileSync('index.html', template);
    console.log("Successfully built index.html from components!");
}

build();

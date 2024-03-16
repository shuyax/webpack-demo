import _ from 'lodash'; //index.js explicitly requires lodash to be present, and binds it as _ (no global scope pollution). By stating what dependencies a module needs, webpack can use this information to build a dependency graph. It then uses the graph to generate an optimized bundle where scripts will be executed in the correct order.
import myName from './myName';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml'
import Notes from './data.csv'
import toml from './data.toml';
import yaml from './data.yaml';
import json from './data.json5';
import printMe from './print.js';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' '); //It uses _.join() function from the Lodash library to join the strings 'Hello' and 'webpack' with a space.
    element.textContent = myName('Cody')
    element.classList.add('hello')

    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    console.log(Data);
    console.log(Notes);

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);


    return element;
}
document.body.append(component());

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

console.log(toml.title); // output `TOML Example`
console.log(toml.owner.name); // output `Tom Preston-Werner`

console.log(yaml.title); // output `YAML Example`
console.log(yaml.owner.name); // output `Tom Preston-Werner`

console.log(json.title); // output `JSON5 Example`
console.log(json.owner.name); // output `Tom Preston-Werner`



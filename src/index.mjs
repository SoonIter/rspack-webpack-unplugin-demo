import { COOLSON } from './my-file.coolson';

function component() {
  const element = document.createElement('div');

  element.innerHTML = ['Hello,', 'webpack'].join(' ');

  element.dataset.myProp = COOLSON();

  return element;
}

document.body.appendChild(component());

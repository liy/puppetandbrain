import './PuppetEntry.scss'

export default class
{
  constructor(pod) {
    this.element = document.createElement('div');
    this.element.className = 'puppet-entry'
    
    this.title = document.createElement('span');
    this.title.textContent = pod.name;
    this.element.appendChild(this.title);

    this.content = document.createElement('div');
    this.content.className = 'puppet-entry-content'
    this.element.appendChild(this.content);
  }
}
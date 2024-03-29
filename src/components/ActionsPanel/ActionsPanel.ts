import {LitElement, html, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import { DrawingMode } from '../DrawingMode/DrawingMode';

@customElement('actions-panel')
export class ActionsPanel extends LitElement {
	static styles=css`
	:host {
		width: 10rem;
		height: 90vh;
		border: 1px solid silver;
	}
	button {
		width: 100%;
		border: 0;

	}
	`;

	@query('input[type="range"]')
	input!: HTMLInputElement;

	@property({type: Number})
	size=16;

  @property({type: Array})
	modes=[{title: 'Default', handler: (cell:HTMLElement)=>cell.style.backgroundColor='#333'}]

	handleSizeChange(){
		this.dispatchEvent(new CustomEvent('size-change', {
			detail: {size: this.input.value},
			bubbles: true,
			composed: true
		}))
	}

	render(){
		return html`
${this.modes?.map(({title, handler})=>{
	return html`<drawing-mode title="${title}" .handler=${handler}></drawing-mode>`}) }
	<div>
  <label for="grid-size">Grid size: <input @input="${this.handleSizeChange}" type="range" name="grid-size" min="10" max="100" value="${this.size}"/></label>
</div>
		`;
	}
}
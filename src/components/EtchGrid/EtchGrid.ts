
import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('etch-grid')
export class EtchGrid extends LitElement {
	@property({type: Number})
  size=16;
	@property()
	onMouseover = (cell:EventTarget)=>cell;

	static override styles = css`
	:host {
		box-sizing: border-box;
	}
	:host > div {
		width: 100%;
		aspect-ratio:1;
		display: flex;
		flex-wrap: wrap;
	}
	.cell {
		box-sizing: border-box;
		width: calc(100%/var(--per-side, 16));
		aspect-ratio: 1;
		border: 1px solid #333;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight:800;
  	overflow: hidden;
	}
	`;

	private handleMouseover({target}:{target:HTMLElement}){
	  if(target.classList.contains("cell")){
		  this.onMouseover(target);
		}
	}

	override render(){
		return html`
		<div @mouseover="${this.handleMouseover}">
  		<style>:host {--per-side: ${this.size};}</style>
	  	${Array.from({length: this.size**2}, ()=>html`<div class='cell'></div>`)}
	</div>
		`
	}

}
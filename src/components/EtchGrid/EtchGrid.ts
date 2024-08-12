
import {LitElement, html, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

@customElement('etch-grid')
export class EtchGrid extends LitElement {
	@property({
		type: Number
	})
  size=16;

	@property({
		type: Boolean
	})
	borders=true;

	@property()
	onMouseover = (cell:EventTarget)=>cell;

  @query('div')
	container?:HTMLElement

	constructor(){
		super();
		this.addEventListener('reset-grid',(e)=>this.reset())
	}

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
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight:800;
  	overflow: hidden;
	}
	.bordered {
		border: 1px solid #777;
	}
	`;

	private handleMouseover(event: MouseEvent){
		const {target} = event;
	  if(target.classList.contains("cell")){
		  this.onMouseover(target, event);
		}
	}

	reset(){
		this.container?.querySelectorAll('.cell').forEach((cell)=>{
			cell.style.backgroundColor='';
			cell.textContent='';
		})
	}

	override updated(changedProperties: Map<string,any>){
		if(changedProperties.has('size')){
			this.reset();
		}
	}

	override render(){
		return html`
		<div @mouseover="${this.handleMouseover}">
  		<style>:host {--per-side: ${this.size};}</style>
	  	${Array.from({length: this.size**2}, ()=>html`<div class='cell ${this.borders && 'bordered'}'></div>`)}
	</div>
		`
	}

}
export { EtchGrid } from './components/EtchGrid/EtchGrid';
export { DrawingMode } from './components/DrawingMode/DrawingMode';
export {ActionsPanel} from './components/ActionsPanel/ActionsPanel';


const handlers = [
	{title: 'Default', handler: (cell)=>cell.style.backgroundColor="#bbb"},
	{title: 'Black', handler: (cell)=>cell.style.backgroundColor='#333'},
	{title: 'Random', handler: (cell)=>cell.style.backgroundColor=`#${Math.floor(Math.random()*16777215).toString(16)}`}
]
document.querySelector('actions-panel').modes = handlers;

document.querySelector("etch-grid").onMouseover = handlers[0].handler;

document.querySelector('actions-panel').addEventListener("mode-change", (evt)=>
  document.querySelector('etch-grid').onMouseover=evt.detail.handler
)
document.querySelector('actions-panel').addEventListener("size-change", (evt)=>{
	console.log(evt.detail);
  document.querySelector('etch-grid').size=evt.detail.size;
}
)
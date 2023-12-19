import SketchPad from './sketchPad';
import './style.css'


const element = document.getElementById("sketch") as HTMLCanvasElement;

const sketch = new SketchPad(element);

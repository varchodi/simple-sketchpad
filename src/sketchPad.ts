import { draw } from "./draw";

export default class SketchPad{
    ctx: CanvasRenderingContext2D;
    path: [number, number][]
    paths: Array<typeof this.path>
    removedPaths: Array<typeof this.path>
    canvas: HTMLCanvasElement;
    isDrawing: boolean = false;
    private actionArea: HTMLDivElement=document.getElementById("actions")as HTMLDivElement;
    private RedoBtn = document.createElement("button");
    private resetBtn = document.createElement("button");
    private undoBtn = document.createElement("button");

    constructor(element: HTMLCanvasElement) {
        this.canvas = element;
        this.ctx = this.canvas.getContext('2d')!;
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.path = [];
        this.paths = [];
        this.removedPaths = [];

        this.reset();
        this.redraw();

        this.RedoBtn.innerHTML = "↶";
        this.resetBtn.innerHTML = "▢";
        this.undoBtn.innerHTML = "↷";

        this.actionArea.appendChild(this.RedoBtn);
        this.actionArea.appendChild(this.resetBtn);
        this.actionArea.appendChild(this.undoBtn);
        
        this.eventsListeners();


    }

    reset = () => {
        this.path = [];
        this.paths = [];
    }

    private eventsListeners() {
        //when click
        this.canvas.onmousedown = (e: MouseEvent) => {
            this.paths.push([this.getMouse(e)]);
            this.isDrawing = true;
        }

        // when move
        this.canvas.onmousemove = (e: MouseEvent) => {
            if (this.isDrawing) {
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(this.getMouse(e));
            }

            this.redraw();
        }

        // when leave
        this.canvas.onmouseup = () => {
            this.isDrawing = false;

            this.redraw();
        }

        // //touch ???
        // this.canvas.ontouchstart = (e) => {
        //     this.canvas.onmousedown(e.touches);
        // }

        //redo 
        this.RedoBtn.onclick = () => {
            this.redo();
        }

        // reset
        this.resetBtn.onclick = () => {
            this.reset();
            this.redraw();
        }

        //undo
        this.undoBtn.onclick = () => {
            this.endo();
        }
    }

    private getMouse = (e: MouseEvent): [number, number] => {
        const boundary = this.canvas.getBoundingClientRect();
        const x = e.clientX - boundary.left;
        const y = e.clientY - boundary.top;
        return [Math.round(x), Math.round(y)];
    };

    private redraw = () => {
        //clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //draw paths ...
        draw.paths(this.ctx, this.paths);

        //btn stuff 
        if (this.paths.length > 0) {
            this.RedoBtn.disabled = false;
        } else {
            console.log(this.paths.length)
            this.RedoBtn.disabled = true;
        }

        if (this.removedPaths.length > 0) {
            this.undoBtn.disabled = false;
        } else {
            this.undoBtn.disabled = true;
        }
    };

    
    //redo function
    redo = () => {
        //this.paths.pop();
        this.removedPaths.push(this.paths.pop()!)

        this.redraw();
    }

    //endo 
    endo = () => {
        if (this.removedPaths.length > 0) {
            this.paths.push(this.removedPaths.pop()!);
            
            this.redraw();
        }
    }
    

}
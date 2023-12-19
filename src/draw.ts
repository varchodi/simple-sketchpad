export const draw = {
    path: (ctx: CanvasRenderingContext2D, path:[number,number][],color="black") => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();

        //move to ...
        ctx.moveTo(...path[0]);

        for (let i = 0; i < path.length; i++){
            ctx.lineTo(...path[i]);
        }

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    },

    paths: (ctx:CanvasRenderingContext2D,paths:[number,number][][],color="balck") => {
        for (let i = 0; i < paths.length; i++){
            //drw unique paths
            draw.path(ctx,paths[i],color)
        }
    }
}
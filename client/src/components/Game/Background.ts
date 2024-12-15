export class Background {
    private ctx: CanvasRenderingContext2D;
    private image : HTMLImageElement;
    constructor(ctx : CanvasRenderingContext2D, image:string){
        this.image = new Image();
        this.image.src = image;
        this.ctx = ctx;
    }

    draw(){
        if(!this.image) return;
        this.ctx.drawImage(this.image, 0, 0);
    }
}
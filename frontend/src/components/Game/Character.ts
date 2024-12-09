class Character {
    private ctx: CanvasRenderingContext2D;
    private image: HTMLImageElement;
    private spriteWidth: number = 75;
    private spriteHeight: number = 75;
    constructor(ctx: CanvasRenderingContext2D, srcImage : string) {
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = srcImage;
    }
    
    animate( x: number, y: number, frameX: number, frameY: number) {
        let dw = 75;
        this.ctx.drawImage(this.image, frameX * this.spriteWidth, frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, x - 50, y - 50, dw, dw);
    }
}

export default Character;
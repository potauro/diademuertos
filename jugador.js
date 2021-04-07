class Jugador {
    constructor() {
      const img = document.createElement('img');
      img.onload = () => {
        this.img = img;
        const imgRatio = img.naturalWidth/img.naturalHeight;
        this.w=120;
        this.h=this.w/imgRatio;
        this.x=W/2-this.w/2;;
        this.y=H -this.h
        this.speed=75;
      }
      img.src = "Mexico Project/Pictures/Good ingredients/skull3.png";
    }
  
    draw() {
      if (!this.img) return; 
      ctx.drawImage(this.img, this.x,this.y,this.w,this.h);
        }
       
  
    moveLeft() {
      if (this.x>40) {
        this.x-= this.speed;
        }
      }
    
    moveRight() {
      if (this.x<W-this.w-40){
        this.x+= this.speed;
      }
     }
    }
let BadFood=["Mexico Project/Pictures/Good ingredients/candle2.png","Mexico Project/Pictures/Good ingredients/flower2.png","Mexico Project/Pictures/Good ingredients/mole2.png","Mexico Project/Pictures/Good ingredients/pan2.png","Mexico Project/Pictures/Good ingredients/papel2.png","Mexico Project/Pictures/Good ingredients/salt2.png","Mexico Project/Pictures/Good ingredients/skull2.png","Mexico Project/Pictures/Good ingredients/tamal2.png"];
let GoodFood=["Mexico Project/Pictures/Good ingredients/candle1.png","Mexico Project/Pictures/Good ingredients/flower1.png","Mexico Project/Pictures/Good ingredients/mole1.png","Mexico Project/Pictures/Good ingredients/pan1.png","Mexico Project/Pictures/Good ingredients/papel1.png","Mexico Project/Pictures/Good ingredients/salt1.png","Mexico Project/Pictures/Good ingredients/skull1.png","Mexico Project/Pictures/Good ingredients/tamal1.png","Mexico Project/Pictures/Good ingredients/tequila1.png", "Mexico Project/Pictures/Good ingredients/water1.png"];


function random(from, to) {
  return (from + Math.random()*(to-from));
}

class Food {
  constructor(tablo,w) {
    const img = document.createElement('img');
    img.onload = () => {
      this.img = img;
      const imgRatio = img.naturalWidth/img.naturalHeight;
      this.w=w;
      this.h=this.w/imgRatio;
      this.x=random(0,W-this.w);
      this.y=0;
    }
    img.src = tablo[Math.floor(Math.random()*tablo.length)];
  }

  draw() {
    if (!this.img) return; 
    ctx.drawImage(this.img, this.x,this.y,this.w,this.h);
  }

  catch(jugador) {
    if ((jugador.x+jugador.w >= this.x && jugador.x <= this.x+this.w) && (jugador.y <= this.y+this.h && jugador.y+jugador.h >= this.y))
    return true;
  }
}
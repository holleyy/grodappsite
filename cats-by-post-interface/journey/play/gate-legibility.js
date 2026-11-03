/* One conventional direction cue, aligned with the projected exit. Gate materials and routing stay in the engine. */
(() => {
  if(Lab.gateInk?.version===2)return;
  Lab.gateInkReady=(async()=>{
    const image=new Image();
    const loaded=new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(Error('Direction icon could not load'));});
    image.src='../icons/arrow-right-route.svg';await loaded;
    const ink=C.OUT,size=11,cross=.65,scale=PAPER_SCALE;
    const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});

    // Align the licensed arrow with the exit's screen bearing. Preserve the
    // head's silhouette instead of shearing it into the legacy hooked shape.
    function raster(rect,dir,cx,cy,resolution){
      canvas.width=rect.w*resolution;canvas.height=rect.h*resolution;
      const dx=GR_DX[dir],dy=GR_DY[dir],unit=size*resolution/256;
      const angle=Math.atan2((dx+dy)/2,dx-dy),cos=Math.cos(angle),sin=Math.sin(angle);
      const a=cos*unit,b=sin*unit,c=-sin*unit*cross,d=cos*unit*cross;
      ctx.setTransform(a,b,c,d,(cx-cy-rect.dx)*resolution-128*(a+c),(cx+cy)/2*resolution-rect.dy*resolution-128*(b+d));
      ctx.drawImage(image,0,0,256,256);ctx.resetTransform();
      return ctx.getImageData(0,0,canvas.width,canvas.height).data;
    }
    const logicalRect={dx:-14,dy:-8,w:28,h:16};
    const logical=Array.from({length:4},(_,dir)=>{
      const rgba=raster(logicalRect,dir,0,0,1),points=[];
      for(let y=0;y<logicalRect.h;y++)for(let x=0;x<logicalRect.w;x++)if(rgba[(y*logicalRect.w+x)*4+3]>48)points.push({x:x+logicalRect.dx,y:y+logicalRect.dy});
      return points;
    });

    const originalArrow=gateArrow,originalGate=drawGate;
    let drawingGate=false,closedDirection=0;
    drawGate=function(x,y,a,b,pose){
      const wasGate=drawingGate,wasClosed=closedDirection;
      drawingGate=true;closedDirection=pose.state?a:b;
      try{return originalGate(x,y,a,b,pose);}finally{drawingGate=wasGate;closedDirection=wasClosed;}
    };
    gateArrow=function(cx,cy,dir,open){
      if(!drawingGate)return originalArrow(cx,cy,dir,open);
      if(!open)return;
      // Keep the cue inside the plate, clear of the settled blade and rim.
      cx+=-GR_DX[dir]+GR_DX[closedDirection]*.5;cy+=-GR_DY[dir]+GR_DY[closedDirection]*.5;
      const originX=Math.round(cx-cy)+tOX,originY=Math.round((cx+cy)*.5)+tOY;
      for(const point of logical[dir]){
        const px=originX+point.x,py=originY+point.y;
        if(px<0||py<0||px>=tW||py>=tH)continue;
        const b=py-tOY,a=(px-tOX+.5)*.5;shLvl=0;
        emit(px,py,b+a,b-a,0,F_TOP,ink);
      }
    };

    function paint(texture,base,index){
      const q=Math.floor(index/3),state=q&1,pair=q>>1;
      const a=pair>>2,b=pair&3,open=state?b:a,closed=state?a:b;
      const cx=-GR_DX[closed]*1.5,cy=-GR_DY[closed]*1.5;
      const rgba=raster(texture,open,cx,cy,scale),width=texture.w*scale;
      texture.pixels.set(base);
      const masks=texture.gateMasks,mark=new Uint8Array(texture.pixels.length);
      for(let y=0;y<texture.h*scale;y++)for(let x=0;x<width;x++){
        const p=y*width+x,cell=Math.floor(y/scale)*texture.w+Math.floor(x/scale);
        if(rgba[p*4+3]<96||base[p]===EMPTY||masks?.blade[cell]||masks?.post[cell])continue;
        texture.pixels[p]=ink;mark[p]=1;
      }
      texture.directionMark=mark;
    }
    // Future texture installs start from their clean paper surface. Existing
    // textures are restored from the unchanged arrow-free source artwork.
    paperApplyGateDecals=function(texture,index){
      const base=texture.pixels.slice();texture.gateMasks=paperGateSourceMasks(index,texture);texture.arrowFree=true;
      paint(texture,base,index);
    };
    for(const texture of paperPieceRecords){
      const selector=paperPieceSelector(texture.family,texture.frame);if(!selector||selector[0]!==3)continue;
      const source=PAPER_SPRITE_DATA.pieces.find(item=>item.id===texture.id);
      if(!source)throw Error('Missing clean gate surface: '+texture.id);
      const base=paperDecodePixels(source,texture.w,texture.h);
      texture.gateMasks=paperGateSourceMasks(selector[1],texture);
      paint(texture,base,selector[1]);
    }
    paperAtlas=null;paperVersion++;dirty=true;
    Lab.gateInk={active:ink,alternate:null,version:2,glyph:'Phosphor arrow-right-bold',marks:1};
  })();
})();

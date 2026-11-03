/* Live direction ink for the prototype's flip-flap gates. Artwork and rules stay intact. */
(() => {
  if(Lab.gateInk)return;
  const active = C.OUT, alternate = C.WD0;
  function applyInk(texture) {
    const masks=texture.gateMasks;
    if(!masks)return;
    const scale=PAPER_SCALE,width=texture.w*scale;
    for(let y=0;y<texture.h;y++)for(let x=0;x<texture.w;x++){
      const cell=y*texture.w+x;
      if(!masks.open[cell]&&!masks.closed[cell])continue;
      const ink=masks.open[cell]?active:alternate;
      for(let sy=0;sy<scale;sy++)for(let sx=0;sx<scale;sx++)texture.pixels[(y*scale+sy)*width+x*scale+sx]=ink;
    }
  }
  const originalDecals=paperApplyGateDecals;
  paperApplyGateDecals=function(texture,index){originalDecals(texture,index);applyInk(texture);};
  for(const texture of paperPieceRecords)applyInk(texture);

  // The source renderer's existing solid/open and outline/alternate glyphs also
  // use the same inks when paper textures are unavailable. Projection is unchanged.
  const originalArrow=gateArrow,originalGate=drawGate;
  let drawingGate=false;
  drawGate=function(x,y,a,b,pose){const previous=drawingGate;drawingGate=true;try{return originalGate(x,y,a,b,pose);}finally{drawingGate=previous;}};
  gateArrow=function(cx,cy,dir,open){
    if(!drawingGate)return originalArrow(cx,cy,dir,open);
    const rows=open?ARROW_R:GATE_OUTLINE,mirror=dir===1||dir===2,up=dir>=2,w=rows[0].length,h=rows.length;
    const x0=Math.round(cx-cy)+tOX-(w>>1),y0=Math.round((cx+cy)*.5)+tOY-(h>>1);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      if(rows[up?h-1-y:y][mirror?w-1-x:x]!=='#')continue;
      const px=x0+x,py=y0+y;if(px<0||py<0||px>=tW||py>=tH)continue;
      const b=py-tOY,a=(px-tOX+.5)*.5;shLvl=0;
      emit(px,py,b+a,b-a,0,F_TOP,open?active:alternate);
    }
  };
  paperAtlas=null;paperVersion++;dirty=true;
  Lab.gateInk={active,alternate};
})();

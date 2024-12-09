(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("officemapdata",
{ "compressionlevel":-1,
 "height":40,
 "infinite":false,
 "layers":[
        {
         "id":4,
         "image":"..\/..\/..\/..\/..\/map1.png",
         "locked":true,
         "name":"Image Layer 1",
         "opacity":1,
         "type":"imagelayer",
         "visible":true,
         "x":0,
         "y":0
        }, 
        {
         "data":[721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721,
            721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721,
            721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721,
            721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721,
            721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721,
            721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721,
            721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721,
            721, 721, 0, 0, 721, 721, 721, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 721, 721, 721, 721, 721, 0, 0, 0, 721, 721,
            721, 721, 0, 0, 721, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 721, 721, 721, 721, 721, 0, 0, 0, 721, 721,
            721, 721, 0, 0, 721, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 721, 721, 721, 721, 721, 0, 0, 0, 721, 721,
            721, 721, 0, 0, 721, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 721, 721, 721, 721, 721, 0, 0, 0, 721, 721,
            721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721,
            721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721,
            721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721,
            721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 0, 721, 721, 721, 721, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721,
            721, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 0, 721, 721, 721, 721, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721,
            721, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 721, 721, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721,
            721, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 721, 721,
            721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721,
            721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721,
            721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 721, 721,
            721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 721, 721,
            721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721,
            721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721,
            721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721,
            721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 0, 721, 721, 0, 0, 0, 0, 0, 721, 721, 721, 721, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 721, 721, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":40,
         "id":11,
         "name":"collisition",
         "opacity":0.52,
         "type":"tilelayer",
         "visible":true,
         "width":40,
         "x":0,
         "y":0
        }],
 "nextlayerid":12,
 "nextobjectid":17,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.11.0",
 "tileheight":25,
 "tilesets":[
        {
         "columns":30,
         "firstgid":1,
         "image":"..\/..\/..\/..\/..\/ZEP\/Create Desktop Page.png",
         "imageheight":527,
         "imagewidth":971,
         "margin":0,
         "name":"Wall",
         "spacing":0,
         "tilecount":480,
         "tileheight":32,
         "tilewidth":32,
         "transparentcolor":"#ff0000"
        }, 
        {
         "columns":16,
         "firstgid":481,
         "image":"..\/..\/..\/..\/..\/ZEP\/Color Pallete.png",
         "imageheight":400,
         "imagewidth":400,
         "margin":0,
         "name":"Color Pallete",
         "spacing":0,
         "tilecount":256,
         "tileheight":25,
         "tilewidth":25,
         "transparentcolor":"#ff0000"
        }],
 "tilewidth":25,
 "type":"map",
 "version":"1.10",
 "width":40
});
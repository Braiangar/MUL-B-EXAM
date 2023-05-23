//funcion poligono de clase x y y
function poligono(nlados, dim) {
    const vertices = [];
    const ang = 2*Math.PI/nlados;
    radio = dim/2/Math.sin(ang/2);
    for (i=0; i<=nlados; i++) {
        const x = radio*Math.cos(i*ang);
        const y = radio*Math.sin(i*ang);
        vertices.push([x, y]);
    }
    return vertices;
}
//funcion que agrega la altura a las coordenadas
function poliZ(dim, nlados, altura){
    var vertices = [];
    var vertice2D = poligono(nlados, dim);
    var y = altura;
    for(i=0; i<=nlados; i++){
        var x = vertice2D[i][0];
        var z = vertice2D[i][1];
        vertices[i]=[x, y, z];
    }
    return vertices;
}
//funcion que crea las bases, sus lineas
function GeometriaBases(V){
    var x = new THREE.Vector3(1, 0, 0);
    var y = new THREE.Vector3(0, 1, 0);
    var z = new THREE.Vector3(0, 0, 1);
    var Bases = new THREE.Geometry();
    var vertices = V;
    for(var i=0; i<vertices.length; i++){
        x = vertices[i][0];
        y = vertices[i][1];
        z = vertices[i][2];
        var Vectores3D = new THREE.Vector3(x, y, z);
        Bases.vertices.push(Vectores3D);
    }
    return Bases;
}
//crea las caras del poliedro respectivo
function cubo(ladobaseinferior, ladobasesuperior, numerodelados, altura, color){
    var Geo = new THREE.Geometry();
    var verticesbaseinferior = poliZ(ladobaseinferior, numerodelados, 0);
    var baseinferior = GeometriaBases(verticesbaseinferior);
    Geo.merge(baseinferior);

    var verticesbasesuperior = poliZ(ladobasesuperior, numerodelados, altura);
    var basesuperior = GeometriaBases(verticesbasesuperior);
    Geo.merge(basesuperior);
    
    for (var i = 0; i < n; i++) {
        Geo.faces.push(new THREE.Face3(i, i+1, i+n+1));
        Geo.faces.push(new THREE.Face3(i+1, i+n+2, i+n+1));
    }
    for (var i = 1; i <= n - 2; i++) {
        Geo.faces.push(new THREE.Face3(0, i, i+1));
    }
    var lastIndex = 2 * n + 1;
    for (var i = n + 1; i <= lastIndex - 2; i++) {
        Geo.faces.push(new THREE.Face3(lastIndex, i+1, i));
    }
    Geo.computeFaceNormals();
    Geo.computeVertexNormals();
    
//agrega los materiales y el color a las caras del poliedro
    var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    var Cubo = new THREE.Mesh(Geo, material);

    return Cubo;
}
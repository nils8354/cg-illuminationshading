function createPlaneVertexArray(gl, position_attrib, normal_attrib, texcoord_attrib) {
    // create a new Vertex Array Object
    let vertex_array = gl.createVertexArray();
    // set newly created Vertex Array Object as the active one we are modifying
    gl.bindVertexArray(vertex_array);

    
    // create buffer to store vertex positions (3D points)
    let vertex_position_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_position_buffer);
    // create array of 3D vertex values (each set of 3 values specifies a vertex: x, y, z)
    let vertices = [
        -0.5, 0.0,  0.5,
         0.5, 0.0,  0.5,
         0.5, 0.0, -0.5,
        -0.5, 0.0, -0.5
    ];
    // store array of vertex positions in the vertex_position_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // enable position_attrib in our GPU program
    gl.enableVertexAttribArray(position_attrib);
    // attach vertex_position_buffer to the position_attrib
    // (as 3-component floating point values)
    gl.vertexAttribPointer(position_attrib, 3, gl.FLOAT, false, 0, 0);


    // create buffer to store vertex normals (vector pointing perpendicular to surface)
    let vertex_normal_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_normal_buffer);
    // create array of 3D vector values (each set of 3 values specifies a normalized vector: x, y, z)
    let normals = [
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0
    ];
    // store array of vertex normals in the vertex_normal_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    // enable normal_attrib in our GPU program
    gl.enableVertexAttribArray(normal_attrib);
    // attach vertex_normal_buffer to the normal_attrib
    // (as 3-component floating point values)
    gl.vertexAttribPointer(normal_attrib, 3, gl.FLOAT, false, 0, 0);


    // create buffer to store texture coordinate (2D coordinates for mapping images to the surface)
    let vertex_texcoord_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_texcoord_buffer);
    // create array of 2D texture coordinate values (each set of 2 values specifies texture coordinate: u, v)
    let texcoords = [
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0
    ];
    // store array of vertex texture coordinates in the vertex_texcoord_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
    // enable texcoord_attrib in our GPU program
    gl.enableVertexAttribArray(texcoord_attrib);
    // attach vertex_texcoord_buffer to the texcoord_attrib
    // (as 2-component floating point values)
    gl.vertexAttribPointer(texcoord_attrib, 2, gl.FLOAT, false, 0, 0);

    
    // create buffer to store faces of the triangle
    let vertex_index_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertex_index_buffer);
    // create array of vertex indices (each set of 3 represents a triangle)
    let indices = [
         0,  1,  2,      0,  2,  3,
    ];
    // store array of vertex indices in the vertex_index_buffer
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


    // no longer modifying our Vertex Array Object, so deselect
    gl.bindVertexArray(null);


    // store the number of vertices used for entire model (number of faces * 3)
    vertex_array.face_index_count = indices.length;


    // return created Vertex Array Object
    return vertex_array;
}


function createCubeVertexArray(gl, position_attrib, normal_attrib, texcoord_attrib) {
    // create a new Vertex Array Object
    let vertex_array = gl.createVertexArray();
    // set newly created Vertex Array Object as the active one we are modifying
    gl.bindVertexArray(vertex_array);

    
    // create buffer to store vertex positions (3D points)
    let vertex_position_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_position_buffer);
    // create array of 3D vertex values (each set of 3 values specifies a vertex: x, y, z)
    let vertices = [
        // Front face
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5,

        // Back face
         0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,

        // Top face
        -0.5,  0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5,  0.5, -0.5,
        -0.5,  0.5, -0.5,

        // Bottom face
         0.5, -0.5,  0.5,
        -0.5, -0.5,  0.5,
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,

        // Right face
         0.5, -0.5,  0.5,
         0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,

        // Left face
        -0.5, -0.5, -0.5,
        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
        -0.5,  0.5, -0.5
    ];
    // store array of vertex positions in the vertex_position_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // enable position_attrib in our GPU program
    gl.enableVertexAttribArray(position_attrib);
    // attach vertex_position_buffer to the position_attrib
    // (as 3-component floating point values)
    gl.vertexAttribPointer(position_attrib, 3, gl.FLOAT, false, 0, 0);


    // create buffer to store vertex normals (vector pointing perpendicular to surface)
    let vertex_normal_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_normal_buffer);
    // create array of 3D vector values (each set of 3 values specifies a normalized vector: x, y, z)
    let normals = [
        // Front
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,

        // Back
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,

        // Top
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,

        // Bottom
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,

        // Right
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,

        // Left
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0
    ];
    // store array of vertex normals in the vertex_normal_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    // enable normal_attrib in our GPU program
    gl.enableVertexAttribArray(normal_attrib);
    // attach vertex_normal_buffer to the normal_attrib
    // (as 3-component floating point values)
    gl.vertexAttribPointer(normal_attrib, 3, gl.FLOAT, false, 0, 0);


    // create buffer to store texture coordinate (2D coordinates for mapping images to the surface)
    let vertex_texcoord_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_texcoord_buffer);
    // create array of 2D texture coordinate values (each set of 2 values specifies texture coordinate: u, v)
    let texcoords = [
        // Front
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,

        // Back
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,

        // Top
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,

        // Bottom
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,

        // Right
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,

        // Left
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0
    ];
    // store array of vertex texture coordinates in the vertex_texcoord_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
    // enable texcoord_attrib in our GPU program
    gl.enableVertexAttribArray(texcoord_attrib);
    // attach vertex_texcoord_buffer to the texcoord_attrib
    // (as 2-component floating point values)
    gl.vertexAttribPointer(texcoord_attrib, 2, gl.FLOAT, false, 0, 0);

    
    // create buffer to store faces of the triangle
    let vertex_index_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertex_index_buffer);
    // create array of vertex indices (each set of 3 represents a triangle)
    let indices = [
         0,  1,  2,      0,  2,  3,   // Front
         4,  5,  6,      4,  6,  7,   // Back
         8,  9, 10,      8, 10, 11,   // Top
        12, 13, 14,     12, 14, 15,   // Bottom
        16, 17, 18,     16, 18, 19,   // Right
        20, 21, 22,     20, 22, 23    // Left
    ];
    // store array of vertex indices in the vertex_index_buffer
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


    // no longer modifying our Vertex Array Object, so deselect
    gl.bindVertexArray(null);


    // store the number of vertices used for entire model (number of faces * 3)
    vertex_array.face_index_count = indices.length;


    // return created Vertex Array Object
    return vertex_array;
}


function createSphereVertexArray(gl, position_attrib, normal_attrib, texcoord_attrib) {
    // create a new Vertex Array Object
    let vertex_array = gl.createVertexArray();
    // set newly created Vertex Array Object as the active one we are modifying
    gl.bindVertexArray(vertex_array);


    // calculate vertices, normals, texture coordinate, and faces
    let slices = 36;
    let stacks = 18;

    let phi = 0;
    let delta_phi = 2 * Math.PI / slices;
    let theta = Math.PI / 2;
    let delta_theta = -Math.PI / stacks;

    let vertices = [];
    let normals = [];
    let texcoords = [];
    for (let i = 0; i <= slices; i++) {
        let cos_phi = Math.cos(phi);
        let sin_phi = Math.sin(phi);
        theta = Math.PI / 2;
        for (let j = 0; j <= stacks; j++) {
            let cos_theta = Math.cos(theta);
            let sin_theta = Math.sin(theta);
            let x = cos_theta * cos_phi;
            let y = sin_theta;
            let z = cos_theta * -sin_phi;
            vertices.push(x/2, y/2, z/2);
            normals.push(x, y, z);
            texcoords.push(i / slices, 1.0 - j / stacks);

            theta += delta_theta;
        }
        phi += delta_phi;
    }

    let indices = [];
    for (let i = 0; i < slices; i++) {
        let k1 = i * (stacks + 1);
        let k2 = (i + 1) * (stacks + 1);
        for (let j = 0; j < stacks; j++) {
            indices.push(k1, k1 + 1, k2);
            indices.push(k1 + 1, k2 + 1, k2);
            k1++;
            k2++;
        }
    }

    
    // create buffer to store vertex positions (3D points)
    let vertex_position_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_position_buffer);
    // store array of vertex positions in the vertex_position_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // enable position_attrib in our GPU program
    gl.enableVertexAttribArray(position_attrib);
    // attach vertex_position_buffer to the position_attrib
    // (as 3-component floating point values)
    gl.vertexAttribPointer(position_attrib, 3, gl.FLOAT, false, 0, 0);


    // create buffer to store vertex normals (vector pointing perpendicular to surface)
    let vertex_normal_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_normal_buffer);
    // store array of vertex normals in the vertex_normal_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    // enable normal_attrib in our GPU program
    gl.enableVertexAttribArray(normal_attrib);
    // attach vertex_normal_buffer to the normal_attrib
    // (as 3-component floating point values)
    gl.vertexAttribPointer(normal_attrib, 3, gl.FLOAT, false, 0, 0);


    // create buffer to store texture coordinate (2D coordinates for mapping images to the surface)
    let vertex_texcoord_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_texcoord_buffer);
    // store array of vertex texture coordinates in the vertex_texcoord_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
    // enable texcoord_attrib in our GPU program
    gl.enableVertexAttribArray(texcoord_attrib);
    // attach vertex_texcoord_buffer to the texcoord_attrib
    // (as 2-component floating point values)
    gl.vertexAttribPointer(texcoord_attrib, 2, gl.FLOAT, false, 0, 0);

    
    // create buffer to store faces of the triangle
    let vertex_index_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertex_index_buffer);
    // store array of vertex indices in the vertex_index_buffer
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


    // no longer modifying our Vertex Array Object, so deselect
    gl.bindVertexArray(null);


    // store the number of vertices used for entire model (number of faces * 3)
    vertex_array.face_index_count = indices.length;


    // return created Vertex Array Object
    return vertex_array;
}

//
// TODO: create a custom 3D model
//         - minimum of 16 vertices
//
function createCustomVertexArray(gl, position_attrib, normal_attrib, texcoord_attrib) {

   // create a new Vertex Array Object
    let vertex_array = gl.createVertexArray();
    // set newly created Vertex Array Object as the active one we are modifying
    gl.bindVertexArray(vertex_array);

    
    // create buffer to store vertex positions (3D points)
    let vertex_position_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_position_buffer);
    // create array of 3D vertex values (each set of 3 values specifies a vertex: x, y, z)
    let vertices = [
        // Face 1
        0.0, 0.0, 0.0,
        -2.0, -2.0, 0.0,
        -2.0, 0.0, -2.0,

        // 2
        0.0, 0.0, 0.0,
        -2.0, -2.0, 0.0,
        0.0, -2.0, -2.0,

        // 3
        0.0, 0.0, 0.0,
        -2.0, 0.0, -2.0,
        0.0, -2.0, -2.0,

        // Bottom
        -2.0, -2.0, 0.0,
        -2.0, 0.0, -2.0,
        0.0, -2.0, -2.0,

        // 4
        0.0, 0.0, 0.0,
        2.0, 2.0, 0.0,
        2.0, 0.0, 2.0,

        // 5
        0.0, 0.0, 0.0,
        2.0, 2.0, 0.0,
        0.0, 2.0, 2.0,

        // 6
        0.0, 0.0, 0.0,
        2.0, 0.0, 2.0,
        0.0, 2.0, 2.0,

        // Top
        2.0, 2.0, 0.0,
        2.0, 0.0, 2.0,
        0.0, 2.0, 2.0
    ];
    // store array of vertex positions in the vertex_position_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // enable position_attrib in our GPU program
    gl.enableVertexAttribArray(position_attrib);
    // attach vertex_position_buffer to the position_attrib
    // (as 3-component floating point values)
    gl.vertexAttribPointer(position_attrib, 3, gl.FLOAT, false, 0, 0);


    // create buffer to store vertex normals (vector pointing perpendicular to surface)
    let vertex_normal_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_normal_buffer);
    // create array of 3D vector values (each set of 3 values specifies a normalized vector: x, y, z)
    let normals = [
        //
        0.57735,-0.57735,-0.57735,
        0.57735,-0.57735,-0.57735,
        0.57735,-0.57735,-0.57735,

        //
        0.57735,-0.57735,0.57735,
        0.57735,-0.57735,0.57735,
        0.57735,-0.57735,0.57735,

        //
        -0.57735,-0.57735,0.57735,
        -0.57735,-0.57735,0.57735,
        -0.57735,-0.57735,0.57735,

        // Bottom
        -0.57735,-0.57735,-0.57735,
        -0.57735,-0.57735,-0.57735,
        -0.57735,-0.57735,-0.57735,
        
        //
        0.57735,-0.57735,-0.57735,
        0.57735,-0.57735,-0.57735,
        0.57735,-0.57735,-0.57735,

        //
        0.57735,-0.57735,0.57735,
        0.57735,-0.57735,0.57735,
        0.57735,-0.57735,0.57735,

        //
        -0.57735,-0.57735,0.57735,
        -0.57735,-0.57735,0.57735,
        -0.57735,-0.57735,0.57735,

        // Top
        -0.57735,-0.57735,-0.57735,
        -0.57735,-0.57735,-0.57735,
        -0.57735,-0.57735,-0.57735
    ];

    // store array of vertex normals in the vertex_normal_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    // enable normal_attrib in our GPU program
    gl.enableVertexAttribArray(normal_attrib);
    // attach vertex_normal_buffer to the normal_attrib
    // (as 3-component floating point values)
    gl.vertexAttribPointer(normal_attrib, 3, gl.FLOAT, false, 0, 0);


    // create buffer to store texture coordinate (2D coordinates for mapping images to the surface)
    let vertex_texcoord_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_texcoord_buffer);
    // create array of 2D texture coordinate values (each set of 2 values specifies texture coordinate: u, v)
    let texcoords = [
        // Front
        0.0,  0.0,
        0.5,  1.0,
        1.0,  0.0,

        // Back
        0.0,  0.0,
        0.5,  1.0,
        1.0,  0.0,

        // Top
        0.0,  0.0,
        0.5,  1.0,
        1.0,  0.0,

        0.0,  0.0,
        0.5,  1.0,
        1.0,  0.0,

        0.0,  0.0,
        0.5,  1.0,
        1.0,  0.0,

        0.0,  0.0,
        0.5,  1.0,
        1.0,  0.0,

        0.0,  0.0,
        0.5,  1.0,
        1.0,  0.0,

        // Bottom
        0.0,  0.0,
        0.5,  1.0,
        1.0,  0.0
    ];
    // store array of vertex texture coordinates in the vertex_texcoord_buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
    // enable texcoord_attrib in our GPU program
    gl.enableVertexAttribArray(texcoord_attrib);
    // attach vertex_texcoord_buffer to the texcoord_attrib
    // (as 2-component floating point values)
    gl.vertexAttribPointer(texcoord_attrib, 2, gl.FLOAT, false, 0, 0);

    
    // create buffer to store faces of the triangle
    let vertex_index_buffer = gl.createBuffer();
    // set newly created buffer as the active one we are modifying
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertex_index_buffer);
    // create array of vertex indices (each set of 3 represents a triangle)
    let indices = [
         0,  1,  2,
         3,  4,  5,
         6,  7, 8,
        9, 10, 11,
        12, 13, 14,
        15, 16, 17,
        18, 19, 20,
        21, 22, 23
    ];
    // store array of vertex indices in the vertex_index_buffer
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


    // no longer modifying our Vertex Array Object, so deselect
    gl.bindVertexArray(null);


    // store the number of vertices used for entire model (number of faces * 3)
    vertex_array.face_index_count = indices.length;


    // return created Vertex Array Object
    return vertex_array;
}



let lista = [
  { id: 1, titulo: 'Nota 1', cat: "compra", cont: "Pan huevos leche"},
  { id: 2, titulo: 'Tareas semana', cat: "trabajo", cont: "14:50 responder mails"},
  { id: 3, titulo: 'Renovar DNI', cat: "urgente", cont: "" }
];
let categorias=[
{nom:"compra",col:"#c5b8f5"},{nom:"trabajo",col:"#d7f7d9"},{nom:"urgente",col:"#f7d7d8"},
{nom:"nota",col:"#fff"}
]


//$("#pe").text($(this).attr('data-id'));


$(document).ready(function(){
  function update(){
    //const contenedor = document.getElementById('contenedor');
    const $contenedor = $('#contenedor');
    $contenedor.empty();
    lista.forEach(nota => {
     var color=  categorias.find(obj => obj.nom == nota.cat).col;
      $contenedor.append(`
        <div class="nota ${nota.cat} card">
        <div class="cuerponota">
        <h4 class="card-title bold">${nota.titulo}</h4>
        <h7 class="categoria">${nota.cat}</h7>
        </div>
        <a class="editar" data-id=${nota.id}><i class="bi bi-pencil h3"></i></a>
        </div>
        `)

    });}
    function updatecats(){
      //const contenedor = document.getElementById('contenedor');
      const $cats = $('#cats');
      $cats.empty();
      categorias.forEach(cat => {
        $cats.append(`
            <option value="${cat.nom}">${cat.nom}</option>
          `)
        
      });}


  update();
  updatecats();

  $(document).on('click', '.crear', function() {
    let idd= 0;

    lista.forEach(nota => {
    if (nota.id>idd){
       idd=nota.id
                    }
    idd=idd+1
                          })
    console.log(idd)
    lista.push({ id: idd, titulo: "", cat: "nota", cont: ""})
    let tit=lista.find(obj => obj.id == idd).titulo;
    let con =lista.find(obj => obj.id == idd).cont;  
    $("#editor").css("background-color", "white"); // Cambiar el color de fondo

     $("#editortitulo").empty();
     $("#editorcont").empty();
     $("#cats").val("");
     $("#cats").val("nota");

     $("#salir").attr("data-id",`${idd}`);
     $("#guardar").attr("data-id",`${idd}`);
     $("#borrar").attr("data-id",`${idd}`);
     $("#editor").removeClass("closed").addClass("open");
     $("#snotes").removeClass("open").addClass("closed");

     $("#editor").animate({
      left: "0%" },250);
      $("#editor").promise().done(function(){
        // will be called when all the animations o
        // n the queue finish

    });

  
  
     
  
  });
    $(document).on('click', '.editar', function() {
    let idd= $(this).attr('data-id');
    console.log(idd)
    let tit=lista.find(obj => obj.id == idd).titulo;
    let con =lista.find(obj => obj.id == idd).cont;
    let cat =lista.find(obj => obj.id == idd).cat;  

  

    const catselec = cat; // Obtener el valor seleccionado
    let color =categorias.find(obj => obj.nom == catselec).col; 
    console.log("color") 

    $("#editor").css("background-color", color); // Cambiar el color de fondo
   
    $("#editortitulo").html(`${tit}`);
     $("#editortitulo").html(`${tit}`);
     $("#editorcont").html(`${con}`);
     $("#cats").val(`${cat}`);

     $("#salir").attr("data-id",`${idd}`);
     $("#guardar").attr("data-id",`${idd}`);
     $("#borrar").attr("data-id",`${idd}`);

  
     $("#editor").removeClass("closed").addClass("open");
     $("#snotes").removeClass("open").addClass("closed");

     $("#editor").animate({
      left: "0%" },250);
      $("#editor").promise().done(function(){
        // will be called when all the animations o
        // n the queue finish
    });

     
  
  });
  
    $(document).on('click', '.salir', function() {
     // $("#editor").css("left", "100%");
    console.log("cerrar")
    $("#editor").animate({
      left: "-100%" },250);

      $("#editor").promise().done(function(){
        // will be called when all the animations o
        // n the queue finish
        $("#editor").removeClass("open").addClass("closed");
        $("#snotes").removeClass("closed").addClass("open");

    });

    update();

    
        
  });
  
  $(document).on('click', '.guardar', function() {
    console.log("3")
    let idd= $(this).attr('data-id');
    lista.forEach(nota => {
      console.log("id:"+idd)
  if (nota.id==idd){

            nota.titulo = $("#editortitulo").html();
            nota.cont=$("#editorcont").html()
            nota.cat=$("#cats").val()
                  
  }
                         });
     update();

     $("#editor").animate({
      left: "-100%" },250);

      $("#editor").promise().done(function(){
        // will be called when all the animations o
        // n the queue finish
        $("#editor").removeClass("open").addClass("closed");
        $("#snotes").removeClass("closed").addClass("open");

    });
    $("#pe").html("Nota guardada");
    $("#pe").css({opacity:100});
    $("#pe").animate({
      opacity:0 },3000);
  });
  
  $(document).on('click', '.borrar', function() {
    console.log("4")
    let idd= $(this).attr('data-id');
    let index=0;
    lista.forEach(nota => {
      console.log("id:"+idd)
  if (nota.id==idd){index = lista.indexOf(nota)}
                         });
        lista.splice(index,1)
        $("#editor").animate({
          left: "-100%" },250);
    
          $("#editor").promise().done(function(){
            // will be called when all the animations o
            // n the queue finish
            $("#editor").removeClass("open").addClass("closed");
            $("#snotes").removeClass("closed").addClass("open");
    
        });
    $("#pe").html("Nota borrada");
    $("#pe").css({opacity:100});

    $("#pe").animate({
      opacity:0 },3000);
    update();

  });

  $(document).ready(function() {
    $('#miModal').css({"display":"none"}); // Efecto de aparecer

    // Mostrar el modal al hacer clic en el botón
    $('#abrirModal').click(function() {
      
      $('#miModal').fadeIn(); // Efecto de aparecer

    });
  
    // Cerrar el modal al hacer clic en la "X"
    $('#cerrarModal').click(function() {
      $('#miModal').fadeOut(); // Efecto de desaparecer
    });
  
    // Cerrar el modal al hacer clic fuera del contenido
    $(window).click(function(event) {
      if ($(event.target).is('#miModal')) {
        $('#miModal').fadeOut();
      }
    });
  });



  $("#cats").on("change", function() {
    const catselec = $(this).val(); // Obtener el valor seleccionado
    let color =categorias.find(obj => obj.nom == catselec).col; 
    console.log("color") 

    $("#editor").css("background-color", color); // Cambiar el color de fondo
});


});











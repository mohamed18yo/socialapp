socket.on("postclient", function (data) {
  $(".col-sm-7").append(`<div class="row">
                        <div class="col-sm-3">
                            <div class="well">
                                <a href="/profile/${data.id}"><p>${data.name}</p></a>
                                <img src="${data.picture}" class="img-circle" height="55" width="55" alt="Avatar">
                            </div>
                        </div>
                        <div class="col-sm-9">
                            <div class="well">
                            <p>${data.body}</p>
                        </div>
                    </div>
                </div>`);
});

$("#send").click(function () {
    var id = $('#idMy').val();
    var name = $('#name').val();
    var picture = $('#picture').val();
    var post = $("#body").val();
  $("#body").val("");
  socket.emit("postserver",{
      id: id,
      name:name,
      picture:picture,
      body:post,

  });
});

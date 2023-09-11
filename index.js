// index.js
document.addEventListener("DOMContentLoaded", function () {
  interact(".box")
    .draggable({
      onmove: function (event) {
        doMove(event);
      },
    })
    .resizable({
      edges: { left: true, right: true, top: true, bottom: true },
    })
    .on("doubletap", function (event) {
      console.log(
        event.type,
        event.target,
        event.target.getAttribute("isGreen")
      );

      // get id of this box
      var thisId = event.target.id;

      // get all draggable boxes
      var draggableBoxes = document.querySelectorAll(".box");

      // Iterate through the elements and toggle their color.
      // The element that was double clicked is ignored
      draggableBoxes.forEach(function (element) {
        if (element.id !== thisId) switchColor(element.id);
      });
    });

  function switchColor(boxId) {
    // Toggle the color of the box and change its 'isGreen' flag
    const box = document.getElementById(boxId);
    const isGreen = box.getAttribute("isGreen");

    if (isGreen === "true") {
      box.style.backgroundColor = "red";
      box.setAttribute("isGreen", "false");
    } else {
      box.style.backgroundColor = "green";
      box.setAttribute("isGreen", "true");
    }
  }

  function doMove(event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // Translate the element's position
    target.style.transform = "translate(" + x + "px, " + y + "px)";

    // Update the element's data-x and data-y attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }
});

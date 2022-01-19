const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const collector = document.getElementById("collector");
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
  container.addEventListener("drop", () => {
    const collectedItems = [...collector.children].slice(1);
    const showIt = document.querySelector("#datashow");
    const showArr = [...showIt.children];
    showArr.forEach((node) => showIt.removeChild(node));
    collectedItems.forEach((item, index) => {
      const pelem = document.createElement("p");
      pelem.append(
        document.createTextNode(`Onderdeel ${index + 1} : ${item.title} \n`)
      );
      showIt.append(pelem);
    });
  });
});

const getDragAfterElement = (container, y) => {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

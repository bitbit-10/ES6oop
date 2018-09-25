class Defect {
  constructor (defectDesc, location, imagefile){
    this.defect = defectDesc;
    this.location = location;
    this.image = imagefile;
  }
}

class UI {
  addDefectToList(defect){

    const list = document.getElementById('defect-list');
    const row = document.createElement('tr');

    row.innerHTML = `

      <th scope="row">1</th>
      <td>${defect.defect}</td>
      <td>${defect.location}</td>
      <td><img src="img/${defect.image}" class="img-thumbnail"></td>
      <td><a href="" class="delete">X</a></td>

    `;
    list.appendChild(row);
  }

  showAlert(message, className){
    const div = document.createElement("div");
    // Add className
    div.className = `alert ${className}`;
    div.innerHTML = `${message}`;

    // Attach div
    const container = document.getElementById("container");
    const form = document.getElementById("form");
    container.insertBefore(div, form);

    // Timeout after 1 Sec

    setTimeout(function(){
      document.querySelector(".alert").remove();
    }, 3000);

  }
}

// Event Listeners
document.getElementById("form").addEventListener('submit', function(e){
  // Get form values

  const defectDesc = document.getElementById('defectDesc').value;
  const location = document.getElementById('location').value;
  let image = 0;

  if (document.getElementById('imagefile').files.length = 0){
    image = 0;
  } else {
    image = document.getElementById('imagefile').files[0].name;
  }


  var defect = new Defect(defectDesc, location, image);

  var ui = new UI();
  console.log("defectDesc:" + document.getElementById('defectDesc').value);
  console.log("location:" + document.getElementById('location').value);
  console.log("image:" + document.getElementById('imagefile').files[0].name);
  if (defectDesc === "" || location === "" || image === 0){
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addDefectToList(defect);
    ui.showAlert("Defect added!", "success");
  }
  e.preventDefault();


})

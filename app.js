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
    row.className = "defectRow";

    row.innerHTML = `

      <td>${defect.defect}</td>
      <td>${defect.location}</td>
      <td><img src="${defect.image}" class="img-thumbnail"></td>
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

    // Timeout after 3 Sec

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);

  }

  clearFields(){
    document.getElementById("defectDesc").value = "";
    document.getElementById("location").value = "";
    document.getElementById('imagefile').value = "";
    document.getElementById("file-chosen").innerHTML = "No file chosen";
  }

  deleteDefect(target){
    if (target.className === "delete"){
        target.parentElement.parentElement.remove();
    }
  }
  print(){
    window.print();
  }
}

// ===== Event Listeners =====

  // For form validation - Photo Upload input onchange

  function fileChosen(){

    const fileChosen = document.getElementById("file-chosen");
    const storeFileDataURL= document.getElementById("store-file-dataURL");

    if (document.getElementById('imagefile').files.length !== 0){
          // display file name to user
          const image = document.getElementById('imagefile').files[0].name;
          fileChosen.innerHTML = image;
          // to store image file dataURL in the html in case the user triggers onchange by opening upload ohoto
          // browse file window but does not select anything, we can still use the previously selected image
          const fileDataURL = document.getElementById('imagefile').files[0];
          const fileReader = new FileReader();

            fileReader.onload = function(event){

                storeFileDataURL.src = event.target.result;

              }
            fileReader.readAsDataURL(fileDataURL);
    }
    else if (document.getElementById('imagefile').files.length == 0 && fileChosen.innerHTML !== "No file chosen"){

          return;

    } else if (document.getElementById('imagefile').files.length == 0 && fileChosen.innerHTML === "No file chosen"){

          const image = document.getElementById('imagefile').files[0].name;
          fileChosen.innerHTML = image;
          // to store image file dataURL in the html in case the user triggers onchange by opening upload ohoto
          // browse file window but does not select anything, we can still use the previously selected image
          const fileDataURL = document.getElementById('imagefile').files[0];
          const fileReader = new FileReader();

            fileReader.onload = function(event){

                storeFileDataURL.src = event.target.result;

              }
            fileReader.readAsDataURL(fileDataURL);

    }

  }
  // Submit Form with form validation for fields

  document.getElementById("form").addEventListener('submit', (e) => {
  // Get form values
    const defectDesc = document.getElementById('defectDesc').value;
    const location = document.getElementById('location').value;
    const ui = new UI();
  // Validate if form has a photo attached and all fields are filled before submitting
    if (document.getElementById("file-chosen").innerHTML === "No file chosen" ){

          if (defectDesc === "" || location === ""){
            ui.showAlert("Please fill in all fields and attach a photo of the defect", "error");
          }else{
            ui.showAlert("Please attach a photo of the defect", "error");
          }
      e.preventDefault();
      return;

    } else {
          if (defectDesc === "" || location === ""){
            ui.showAlert("Please fill in all fields", "error");
            e.preventDefault();
          }else{
            return submitForm(e);
          }
    }

  // Submit validated form
  function submitForm(e){

    const image = document.getElementById("store-file-dataURL").src;
    const defect = new Defect(defectDesc, location, image);

        ui.addDefectToList(defect);
        ui.clearFields();
        ui.showAlert("Defect added!", "success");
        e.preventDefault();

      }
  });

  // Delete defect
  document.getElementById("defect-list").addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteDefect(e.target);
    ui.showAlert("Defect deleted!", "success");
    e.preventDefault();
});
  // Print Page
  document.getElementById("print-btn").addEventListener('click', (e) => {
    const ui = new UI();
    ui.print();
    e.preventDefault();
  });

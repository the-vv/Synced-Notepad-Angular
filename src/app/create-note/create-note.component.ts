import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  fileName = "Choose an image"
  fileData: any
  imagePreview: any

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(file: FileList) {
    this.fileName = file.item(0).name
    console.log(file.item(0));
    this.fileData = file[0]
    this.preview()
  }

  preview() {
    // Show preview    
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      console.log('Select a valid image');      
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.imagePreview = reader.result; 
      // console.log(reader.result);
      console.log('imagepreview');
      

    }
  }

}

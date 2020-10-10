import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';
import Note from '../Interfaces/Note';


@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {


  fileInfo: string='Choose an image'
  imagePreview: any
  URL: string
  percentage: any

  //form  
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    public noteService: NotesService,
    private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
          title: ['', Validators.required,],
          description: '',
      }, {
      });
      // this.noteService.downloadURL.subscribe((url) =>{
      //   console.log(url);        
      // })
    }
    get f() { return this.registerForm.controls; }
  
    onSubmit(){
      if(!this.f.title.errors){
        let note: Note;
        note = this.registerForm.value
        note.id =String(Math.floor(Math.random() * 100) + 1)
        if(this.tags.length>0){
          note.hashTags = this.tags;
        }else{
          note.hashTags = [];
        }
        if(this.imagePreview){
          note.images = this.imagePreview
        }
        console.log(note); 
        this.noteService.addNote(note)
        .then(() =>{        
        })
        console.log(this.noteService.downloadURL)
      }      
      return
    }

  handleFileInput(file: FileList) {
    console.log(file[0]);
    this.preview(file[0])
    this.noteService.upload(file[0])
    this.noteService.percentage.subscribe((p) =>{
      console.log(p); 
      console.log(this.noteService.downloadURL);           
    })
  }

  preview(fileData) {
    // Show preview    
    var mimeType = fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      this.fileInfo = 'Select a valid image'   
      return;
    }
    this.fileInfo ='Choose an image'
    var reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (_event) => {
      this.imagePreview = reader.result; 
      // console.log(reader.result);
      // console.log('imagepreview');
      
    }
  }

  //#tags input chip

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tags = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      let tag = value.trim()
      if(tag[0] != '#'){
        tag = '#' + tag
      }
      this.tags.push(tag);
      this.tags = [...new Set(this.tags)]
      console.log(this.tags);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}

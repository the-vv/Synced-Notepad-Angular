import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import {AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router';
import Note from '../Interfaces/Note';


@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  userInfo: any
  fileInfo: string = 'Choose an image'
  imagePreview: any
  percentage: any
  deletable: boolean = false
  hasFile: boolean = false

  //form  
  registerForm: FormGroup;
  submitted = false;

  constructor(
    public auth: AuthenticationService,
    private router: Router,
    public noteService: NotesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe((user) =>{
      this.userInfo = user.uid;    
    })
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required,],
      description: '',
    }, {
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    if (!this.f.title.errors && this.userInfo) {
      let note: Note;
      note = this.registerForm.value
      note.uid = this.userInfo;
      note.id = String(Math.floor(Math.random() * 100) + 1)
      if (this.tags.length > 0) {
        note.hashTags = this.tags;
      } else {
        note.hashTags = [];
      }
      if (this.hasFile) {
        if (this.deletable) {
          console.log(this.imagePreview);
          note.images = this.imagePreview
        }else{
          console.log('wait for file upload');          
        }
      }
      console.log(note);
      this.noteService.addNote(note)
        .then(() => {
          this.router.navigate(['/']);
        })
    }else{
      alert('Notes must have a Title')
    }
    return
  }

  removeImage() {
    this.hasFile = false
    this.noteService.delete(this.imagePreview)
      .then(() => {
        console.log('Deleted');
        this.deletable = false
        this.imagePreview = ''
        this.percentage = null
      })
      .catch((e) => {
        console.log(e);
      })
  }

  handleFileInput(file: FileList) {
    // console.log(file[0]);
    this.hasFile = true
    this.preview(file[0])
    this.noteService.upload(file[0])
      .then((url: string) => {
        this.imagePreview = url
        this.deletable = true
        console.log(this.imagePreview)
      })
    this.noteService.percentage.subscribe((p) => {
      this.percentage = Math.ceil(p)
    })
  }

  preview(fileData) {
    // Show preview    
    var mimeType = fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      this.fileInfo = 'Select a valid image'
      return;
    }
    this.fileInfo = 'Choose an image'
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
      if (tag[0] != '#') {
        tag = '#' + tag
      }
      this.tags.push(tag);
      this.tags = [...new Set(this.tags)]
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

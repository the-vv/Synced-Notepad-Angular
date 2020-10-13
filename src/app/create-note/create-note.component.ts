import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { AuthenticationService } from '../services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
import Note from '../Interfaces/Note';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit, OnDestroy {

  userInfo: any
  fileInfo: string = 'Choose an image'
  imagePreview: any
  percentage: any
  deletable: boolean = false
  hasFile: boolean = false
  fstate: string
  editMode = false
  NoteId: string
  //form  
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private spinner: NgxSpinnerService,
    public auth: AuthenticationService,
    private router: Router,
    public noteService: NotesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnDestroy() {
    console.log('destroyed');
    if (this.deletable && !this.submitted && !this.editMode) {
      this.removeImage();
    }
    if (this.fstate && this.fstate != 'success') {
      this.noteService.cancelUpload()
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.NoteId = params['id'];
      let Note = this.noteService.getNote(this.NoteId)
      console.log(Note)
      if (this.NoteId && !Note) {
        console.log('redirect');
        this.router.navigate(['404'])
      }
      else if (this.NoteId && Note) {
        this.editMode = true;
        this.registerForm = this.formBuilder.group({
          title: [Note.title, Validators.required,],
          description: Note.description,
        }, {
        });
        if(Note.hashTags.length){
          this.tags = this.tags.concat(Note.hashTags)
        }
        console.log(this.tags);        
        if (Note.images) {
          this.hasFile = true
          this.imagePreview = Note.images
          this.deletable = true
          this.fstate = 'success'
        }
      }
    });
    if (!this.editMode) {
      this.registerForm = this.formBuilder.group({
        title: ['', Validators.required,],
        description: '',
      }, {
      });
    }
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userInfo = user.uid;
      }
    })
    this.spinner.hide()
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    if (!this.f.title.errors && this.userInfo) {
      this.spinner.show()
      let note: Note;
      note = this.registerForm.value
      note.uid = this.userInfo;
      if (this.tags.length > 0) {
        note.hashTags = this.tags;
      } else {
        note.hashTags = [];
      }
      if (this.hasFile) {
        if (this.deletable) {
          console.log(this.imagePreview);
          note.images = this.imagePreview
        } else {
          this.spinner.hide()
          console.log('wait for file upload');
          return
        }
      }
      console.log(note);
      if(this.editMode){
        if(!this.hasFile){
          note.images = ''
        }
        this.noteService.updateNote(note, this.NoteId)
        .then(() => {
          this.spinner.hide()
          this.submitted = true;
          this.router.navigate(['/notes']);
        })
      }
      else{
        this.noteService.addNote(note)
          .then(() => {
            this.spinner.hide()
            this.submitted = true;
            this.router.navigate(['/notes']);
          })
      }
    } else {
      alert('Notes must have a Title')
    }
    return
  }

  cancelImageUpload() {
    this.noteService.cancelUpload()
    console.log('Upload Cancelled');
    this.deletable = false
    this.imagePreview = ''
    this.percentage = undefined
    this.hasFile = false
    this.fstate = undefined
  }

  removeImage() {
    this.hasFile = false
    this.spinner.show()
    this.noteService.delete(this.imagePreview)
      .then(() => {
        this.spinner.hide()
        console.log('Deleted');
        this.deletable = false
        this.imagePreview = ''
        this.percentage = undefined
      })
      .catch((e) => {
        this.deletable = false
        this.imagePreview = ''
        this.spinner.hide()
        console.log(e);
      })
  }

  handleFileInput(file: FileList) {
    // console.log(file[0]);
    this.spinner.show()
    this.hasFile = true
    this.preview(file[0])
    this.noteService.upload(file[0])
      .then((url: string) => {
        this.imagePreview = url
        this.deletable = true
        console.log(this.imagePreview)
      })
    this.noteService.status.subscribe((s) => {
      this.fstate = s
      console.log(s);
    })
    this.noteService.percentage.subscribe((p) => {
      if (p >= 0) {
        this.spinner.hide()
      }
      console.log(p);
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

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

interface GalleryImage {
  itemImageSrc: string,
  thumbnailImageSrc: string,
  alt: string,
  title: string
}

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [FileUploadModule, ToastModule, CommonModule, GalleriaModule, FormsModule, ImageModule, ConfirmDialogModule],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
  providers: [ConfirmationService, MessageService]
})

export class ImagesComponent implements OnInit {
  @ViewChild(FileUpload) fileUpload!: FileUpload;
  @Input() set gallery(value: any) {
    this.gallerySubject.next(value);
  }

  gallerySubject = new BehaviorSubject<any>({
    ID: null,
    name: "Nincs kiválasztott galéria"
  });

  gallery$ = this.gallerySubject.asObservable();

  images: GalleryImage[] = [];

  max: number = 100000;

  displayCustom: boolean = false;

  activeIndex: number = 0;

  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  onUpload(event: any) {
    const formData = new FormData();
    formData.append('file', event.files[0]);

    this.api.upload(formData, this.gallerySubject.value.ID).subscribe({
      next: (res: any) => {
        const data = {
          galeryID: this.gallerySubject.value.ID,
          filename: res.file.filename,
          path: res.file.path
        };
        this.api.insert('images/' + this.gallerySubject.value.ID, data).subscribe({
          next: () => {
            event.files = [];
            formData.delete('file');

            this.fileUpload.clear();

            this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Kép feltöltve a galériába!' });
            this.getImages(this.gallerySubject.value.ID);
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'HIBA', detail: err.error.message });
          }
        });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'HIBA', detail: err.error.message });
      }
    });
  }


  ngOnInit(): void {
    this.getGaleryImages();
  }

  getGaleryImages(){
    this.gallery$.subscribe({
      next: (res) => {
        this.getImages(res.ID);
      }
    })
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  deleteImage(image:any){
    this.api.delete("images", image.ID).subscribe({
      next: ()=>{
        this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Kép törölve!' });
        this.getGaleryImages(); 
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'HIBA', detail: err.error.message });
      }
    })
  }

  getImages(id: number) {
    this.api.select("images", id).subscribe({
      next: (res: any) => {
        this.images = [];
        res.forEach((item: any) => {
          let img = {
            itemImageSrc: 'http://localhost:3000/' + item.path,
            thumbnailImageSrc: 'http://localhost:3000/' + item.path,
            alt: '',
            title: '',
            ID: item.ID
          }
          this.images.push(img);
        });
      }
    });
  }

  confirm(event: Event, image:any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Biztosan törlöd a kijelölt képet?',
        header: 'Megerősítés',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            this.deleteImage(image);
        },
        reject: () => {
            
        }
    });
  }
}

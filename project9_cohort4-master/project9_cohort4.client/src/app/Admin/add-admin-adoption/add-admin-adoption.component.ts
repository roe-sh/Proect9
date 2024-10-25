import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlServiceService } from '../../batool/services/url-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-admin-adoption',
  templateUrl: './add-admin-adoption.component.html',
  styleUrls: ['./add-admin-adoption.component.css']
})
export class AddAdminAdoptionComponent implements OnInit {

  shelters: any[] = [];
  categories: any[] = [];
  imageFiles: File[] = []; // Array to hold multiple image files
  addAnimalForm: FormGroup;

  constructor(private _ser: UrlServiceService, private _router: Router, private fb: FormBuilder) {
    this.addAnimalForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      breed: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      size: ['', Validators.required],
      temperament: ['', Validators.required],
      specialNeeds: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      shelterId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._ser.getAllShelters().subscribe(
      (sheltersResponse) => {
        this.shelters = sheltersResponse;
      },
      (error) => {
        console.error('Error fetching shelters', error);
      }
    );
    this._ser.getAllCategories().subscribe(
      (categoriesResponse) => {
        this.categories = categoriesResponse;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  changeImages(event: any) {
    this.imageFiles = Array.from(event.target.files); // Convert FileList to Array
  }

  addAnimal(data: any) {
    const form = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        form.append(key, data[key]);
      }
    }

    // Append images
    this.imageFiles.forEach((file, index) => {
      form.append(`Image${index + 1}`, file); // Append files as Image1, Image2, Image3
    });

    this._ser.addAnimal(form).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The animal has been added successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['AdminDashBoard/AllAnimal']);
        });
      },
      (error) => {
        console.error('Error adding animal', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error adding the animal. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}

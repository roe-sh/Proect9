import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdoptionService } from '../../Adoptioh/adoption.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {

  // Define the properties to match your backend DTO structure
  adoptionDetails = {
    userId: null as number | null,  // or you can initialize with a logged-in user's ID
    animalId: null as number | null,
    userMedicalStatus: '',           // Change here
    housingType: 'Apartment',
    userFinancialStatus: '',         // Change here
    userFlatType: '',                // Change here
    userLivingStatus: '',            // Change here
    userMoreDetails: ''              // Change here
  };

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    // Any necessary initialization can go here
  }

  submitAdoptionForm(form: NgForm): void {
    if (form.valid) {
      this.adoptionService.submitAdoptionRequest(this.adoptionDetails).subscribe(
        response => {
          console.log('Adoption request submitted successfully:', response);
          Swal.fire({
            title: 'Thank You for Choosing Me!',
            text: 'Your adoption request has been submitted successfully!',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          form.reset();
          this.adoptionDetails.animalId = null;
        },
        error => {
          console.error('Error submitting adoption request:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error submitting your request. Please try again.',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      );
    }
  }
}

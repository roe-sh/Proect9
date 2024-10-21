import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdoptionService } from '../../Adoptioh/adoption.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {

  adoptionDetails = {
    fullName: '',
    email: '',
    medicalStatus: '',
    housingType: '',
    financialStatus: '',
    additionalDetails: '',
    animalId: null as string | null
  };

  constructor(private route: ActivatedRoute, private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    const animalId = this.route.snapshot.paramMap.get('id');
    this.adoptionDetails.animalId = animalId; 
  }

  submitAdoptionForm(form: any): void {
    if (form.valid) {
      this.adoptionService.submitAdoptionRequest(this.adoptionDetails).subscribe(
        response => {
          console.log('Adoption request submitted successfully:', response);
        },
        error => {
          console.error('Error submitting adoption request:', error);
        }
      );
    }

  }
}

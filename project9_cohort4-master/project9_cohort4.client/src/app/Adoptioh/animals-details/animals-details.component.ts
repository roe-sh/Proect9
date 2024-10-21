import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../Adoptioh/animals.service';

@Component({
  selector: 'app-animals-details',
  templateUrl: './animals-details.component.html',
  styleUrls: ['./animals-details.component.css']
})
export class AnimalsDetailsComponent implements OnInit {

  animal: any;
  relatedAnimals: any[] = [];

  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchAnimalDetails();
  }

  fetchAnimalDetails(): void {
    const animalId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(animalId)) {
      this.animalService.getAnimalById(animalId).subscribe((data: any) => {
        this.animal = data;
        this.fetchRelatedAnimals(this.animal.shelterId, this.animal.species);
      });
    }
  }

  fetchRelatedAnimals(shelterId: number, species: string): void {
    this.animalService.getRelatedAnimals(shelterId, species).subscribe((data: any[]) => {
      this.relatedAnimals = data;
    });
  }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Animals1Controller : ControllerBase
    {
        private readonly MyDbContext _context;

        public Animals1Controller(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAnimals()
        {
            var animals = _context.Animals.ToList();
            return Ok(animals);
        }

        [HttpGet("{id}")]
        public IActionResult GetAnimal(int id)
        {
            var animal = _context.Animals.Find(id);
            if (animal == null)
                return NotFound();

            return Ok(animal);
        }

        [HttpPut("{id}")]
        public IActionResult PutAnimal(int id, [FromForm] updateAnimalDTO animal)
        {
            var existAnimal = _context.Animals.Find(id);
            if (existAnimal == null)
                return BadRequest();

            existAnimal.Name = animal.Name;
            existAnimal.Age = animal.Age;
            existAnimal.Species = animal.Species;
            existAnimal.Breed = animal.Breed;
            existAnimal.Size = animal.Size;
            existAnimal.Temperament = animal.Temperament;
            existAnimal.SpecialNeeds = animal.SpecialNeeds;
            existAnimal.Description = animal.Description;
            existAnimal.AdoptionStatus = animal.AdoptionStatus;
            existAnimal.Image1 = animal.PhotoUrl;

            _context.Animals.Update(existAnimal);
            _context.SaveChanges();

            return Ok(existAnimal);
        }



        [HttpPost]
        public IActionResult PostAnimal([FromForm] AddAnimalDTO animalDto)
        {
            // Check if the shelter exists
            var shelterExists = _context.Shelters.Any(s => s.ShelterId == animalDto.ShelterId);
            if (!shelterExists)
            {
                return BadRequest($"Shelter with ID {animalDto.ShelterId} does not exist.");
            }

            // Check if the category exists
            var categoryExists = _context.Categories.Any(c => c.CategoryId == animalDto.CategoryId);
            if (!categoryExists)
            {
                return BadRequest($"Category with ID {animalDto.CategoryId} does not exist.");
            }

            var newAnimal = new Animal
            {
                Name = animalDto.Name,
                Species = animalDto.Species,
                Breed = animalDto.Breed,
                Age = animalDto.Age,
                Size = animalDto.Size,
                Temperament = animalDto.Temperament,
                SpecialNeeds = animalDto.SpecialNeeds,
                Description = animalDto.Description,
                AdoptionStatus = animalDto.AdoptionStatus,
                ShelterId = animalDto.ShelterId, // Link the animal to the specified shelter
                CategoryId = animalDto.CategoryId,
                AddedAt = DateTime.UtcNow
            };

            _context.Animals.Add(newAnimal);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetAnimal), new { id = newAnimal.AnimalId }, newAnimal);
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteAnimal(int id)
        {
            var animal = _context.Animals.Find(id);
            if (animal == null)
                return NotFound();

            _context.Animals.Remove(animal);
            _context.SaveChanges();

            return NoContent();
        }

        private bool AnimalExists(int id)
        {
            return _context.Animals.Any(e => e.AnimalId == id);
        }






        [HttpGet("getImages/{imageName}")]
        public IActionResult getImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Animal", imageName);
            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/jpeg");
            }
            return NotFound();
        }

    }
}

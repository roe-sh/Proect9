using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public PostsController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllPosts")]
        public IActionResult GetAllPosts()
        {
            var posts = _db.Posts
                .OrderByDescending(w => w.StoryDate)
                .Select(s => new
                {
                    s.PostId,

                    s.StoryTitle,
                    s.StoryContent,
                    s.StoryDate,
                    s.StoryPhoto,
                    User = new
                    {
                        s.User.UserId,
                        s.User.FullName,
                    }
                }).ToList();

            return Ok(posts);
        }

        [HttpPost("AddPosts/{userID}")]
        public async Task<IActionResult> AddPosts(int userID, [FromForm] AddPostsDTO addpost)
        {
            if (addpost.StoryPhoto != null && addpost.StoryPhoto.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + addpost.StoryPhoto.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await addpost.StoryPhoto.CopyToAsync(fileStream);
                    }


                    var newPost = new Post
                    {
                        UserId = userID,
                        StoryPhoto = $"/images/{uniqueFileName}",
                        StoryContent = addpost.StoryContent,
                        StoryDate = System.DateTime.Now,
                        StoryTitle = addpost.StoryTitle,
                    };


                    _db.Posts.Add(newPost);
                    await _db.SaveChangesAsync();

                    return Ok(newPost);
                }
                catch (Exception ex)
                {

                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }


            return BadRequest("Invalid data or missing image.");
        }
        [HttpPut("UpdatePostById/{id}")]
        public async Task<IActionResult> UpdatePostById(int id, [FromForm] AddPostsDTO addpost)
        {
            if (id <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }

            var postupdate = await _db.Posts.FirstOrDefaultAsync(x => x.PostId == id);
            if (postupdate == null)
            {
                return NotFound("No Post found with the specified ID.");
            }

            try
            {
                if (addpost.StoryPhoto != null && addpost.StoryPhoto.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");


                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + addpost.StoryPhoto.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await addpost.StoryPhoto.CopyToAsync(fileStream);
                    }


                    postupdate.StoryPhoto = $"/images/{uniqueFileName}";
                }


                postupdate.StoryContent = addpost.StoryContent ?? postupdate.StoryContent;
                postupdate.StoryTitle = addpost.StoryTitle ?? postupdate.StoryTitle;



                await _db.SaveChangesAsync();

                return Ok(postupdate);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
        [HttpDelete("DeletePostId/{id}")]
        public async Task<IActionResult> DeletePostId(int id)
        {
            if (id <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var postToDelete = await _db.Posts.FirstOrDefaultAsync(x => x.PostId == id);
            if (postToDelete == null)
            {
                return BadRequest("the post is not exist");
            }
            _db.Posts.Remove(postToDelete);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("PostDetailsById/{postid}")]
        public async Task<IActionResult> GetPostDetailsById(int postid)
        {
            if (postid <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var postdetails = await _db.Posts
                .Where(x => x.PostId == postid)
                .Select(s => new
                {
                    s.PostId,
                    s.StoryTitle,
                    s.StoryContent,
                    s.StoryDate,
                    s.StoryPhoto,
                    User = new
                    {
                        s.User.UserId,
                        s.User.FullName,
                    }
                }).ToListAsync();
            if (postdetails == null)
            {
                return NotFound("No Post found with the specified ID.");
            }
            return Ok(postdetails);
        }

        /////////////////////////// Admin Accept Post ///////////////////////////////

        [HttpPut("AcceptPostById/{postid}")]
        public async Task<IActionResult> AcceptPostById(int postid)
        {
            if (postid <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var post = await _db.Posts.FirstOrDefaultAsync(x => x.PostId == postid);
            if (post == null)
            {
                return NotFound("No Post found with the specified ID.");
            }
            post.IsAccept = true;

            _db.Posts.Update(post);
            await _db.SaveChangesAsync();
            return Ok(post);
        }
        [HttpGet("GetAllAcceptedPost")]
        public async Task<IActionResult> GetAllAcceptedPost()
        {
            var posts = await _db.Posts
                            .Where(x => x.IsAccept == true)
                            .OrderByDescending(w => w.StoryDate)
                            .Select(s => new
                            {
                                s.PostId,
                                s.StoryTitle,
                                s.StoryContent,
                                s.StoryDate,
                                s.StoryPhoto,
                                User = new
                                {
                                    s.User.FullName,
                                }
                            }).ToListAsync();
            return Ok(posts);

        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CommentsController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllComment/{postid}")]
        public IActionResult GetAllComment(int postid)
        {
            var comments = _db.Comments
                .Where(w => w.PostId == postid)
                .OrderByDescending(g => g.CreateDate)
                .Select(s => new 
                {
                    s.CommentId,
                    s.UserId,
                    s.Content,
                    s.CreateDate,
                    User = new
                    {
                        s.User.FullName,
                        s.User.Image
                    }
                }
                ).ToList();
            return Ok(comments);
        }
        [HttpPost("AddComment/{postid}")]
        public IActionResult GetComment(int postid, [FromForm] AddCommentDTO addCommentDTO)
        {
            if (postid <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }

            if (addCommentDTO == null)
            {
                return BadRequest("Invalid data or null data");
            }
            var comments = new Comment
            {
                PostId = postid,
                UserId = addCommentDTO.UserId,
                CreateDate = System.DateTime.Now,
                Content = addCommentDTO.Content
            };
            _db.Comments.Add(comments);
            _db.SaveChanges();
            return Ok(comments);
        }
        [HttpGet("GetAllReplyByCommentId/{commentId}")]
        public IActionResult GetAllReplyByCommentId(int commentId)
        {
            if (commentId <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var allreplay = _db.Replies
                .Where(x => x.CommentId == commentId)
                .Select(x => new 
                {
                    x.User.FullName,
                    x.User.Image,
                    x.CreateDate,
                    x.Content,
                }
                ).ToList();

            if (allreplay == null)
            { 
                return NotFound("there is no replay");
            }

            return Ok(allreplay);
        }

        [HttpPost("ReplayOnComment")]
        public IActionResult ReplayOnComment([FromForm] ReplayOnCommentDTO replayOnCommentDTO)
        {
            if (replayOnCommentDTO == null)
            {
                return BadRequest("Invalid data or null data");
            }
            var replay = new Reply
            {
                CommentId = replayOnCommentDTO.CommentId,
                UserId = replayOnCommentDTO.UserId,
                CreateDate = System.DateTime.Now,
                Content = replayOnCommentDTO.Content,

            };

            _db.Replies.Add(replay);
            _db.SaveChanges();
            return Ok(replay);
        }
        [HttpGet("CountOfLikesAndComments/{postid}")]
        public IActionResult CountOfLikesAndComments(int postid)
        {
            if (postid <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var likesCount = _db.Likes.Count(x => x.PostId == postid);
            var commentsCount = _db.Comments.Count(x => x.PostId == postid);
            var commentandlikesCount = new
            {
                oplikesCounts = likesCount,
                opcommentsCounts = commentsCount
            };
            return Ok(commentandlikesCount);
        }

        [HttpPost("likePost")]
        public async Task<IActionResult> LikePost(int postId, int userId)
        {
            var existingLike = await _db.Likes.FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId);
            if (existingLike != null)
            {
                _db.Likes.Remove(existingLike);
                await _db.SaveChangesAsync();
                return Ok(new { message = "Like removed" });
            }

            var like = new Like
            {
                PostId = postId,
                UserId = userId
            };

            _db.Likes.Add(like);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Post liked" });
        }
    }
}

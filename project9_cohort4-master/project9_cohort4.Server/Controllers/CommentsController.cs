using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
                .ToList();
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

            return Ok(comments);
        }
        [HttpGet("GetAllReplyByCommentId/{commentId}")]
        public IActionResult GetAllReplyByCommentId(int commentId)
        {
            if (commentId <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var allreplay = _db.Replies.Where(x => x.CommentId == commentId).ToList();

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
    }
}

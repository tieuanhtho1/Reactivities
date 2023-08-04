using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext dataContext, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _dataContext = dataContext;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.Include(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo 
                {
                    Id = photoUploadResult.PublicId,
                    Url = photoUploadResult.Url
                };

                if(!user.Photos.Any(x => x.IsMain)) 
                    photo.IsMain = true;

                user.Photos.Add(photo);

                var result = await _dataContext.SaveChangesAsync() > 0;

                if (result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Problem adding photo");

            }
        }
    }
}
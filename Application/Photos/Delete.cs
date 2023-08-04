using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IPhotoAccessor _photoAccessor;
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;
            public Handler(IPhotoAccessor photoAccessor, DataContext dataContext, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _dataContext = dataContext;
                _photoAccessor = photoAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.Include(x => x.Photos).
                    FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null) return null;

                if (photo.IsMain) return Result<Unit>.Failure("You cannot delete your main photo");

                var result = _photoAccessor.DeletePhoto(request.Id);

                if (result == null) return Result<Unit>.Failure("Problem delete photo from Cloudinary"); ;

                user.Photos.Remove(photo);

                var saveChangeResult = await _dataContext.SaveChangesAsync() > 0;

                if (saveChangeResult) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting photo from database");
            }
        }
    }
}
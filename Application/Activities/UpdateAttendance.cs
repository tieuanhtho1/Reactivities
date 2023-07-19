
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(aa => aa.Attendees)
                    .ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(activity => activity.Id == request.Id);
                
                if (activity == null) return null;

                var CurrentUser = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                
                if (CurrentUser == null) return null;

                var hostUserName = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                //check whether current user are in the attendees list or not
                var attendee = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == CurrentUser.UserName); 

                if (attendee != null && hostUserName == CurrentUser.UserName)
                    activity.IsCancelled = !activity.IsCancelled;
                
                if (attendee != null && hostUserName != CurrentUser.UserName)
                {
                    activity.Attendees.Remove(attendee);
                }

                if (attendee == null)
                {
                    activity.Attendees.Add(new ActivityAttendee 
                    {
                        AppUser = CurrentUser,
                        Activity = activity,
                        IsHost = false
                    });
                }
                
                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating event");
            }
        }
    }
}
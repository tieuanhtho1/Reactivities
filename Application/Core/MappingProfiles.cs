using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity,Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(dto => dto.HostUsername, 
                b => b.MapFrom(act => act.Attendees.FirstOrDefault(attendee => attendee.IsHost).AppUser.UserName));
                
            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(dto => dto.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(dto => dto.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(dto => dto.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}
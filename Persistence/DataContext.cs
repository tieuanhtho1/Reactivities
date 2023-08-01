using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x => x.HasKey(activityAttendee => new {activityAttendee.ActivityId, activityAttendee.AppUserId}));
            builder.Entity<ActivityAttendee>()
                .HasOne(appUser => appUser.AppUser)
                .WithMany(activity => activity.Activities)
                .HasForeignKey(appUser => appUser.AppUserId);
            
            builder.Entity<ActivityAttendee>()
                .HasOne(activity => activity.Activity)
                .WithMany(attendee => attendee.Attendees)
                .HasForeignKey(activity => activity.ActivityId);
        }

        
    }
}
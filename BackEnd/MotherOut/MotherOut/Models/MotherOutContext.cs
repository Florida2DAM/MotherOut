using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class MotherOutContext : DbContext
    {
        //tablas
        public DbSet<Team> Teams { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserTask> UserTasks { get; set; }
        public DbSet<Icon> Icons { get; set; }
        public DbSet<PreDefinedTask> PreDefinedTasks { get; set; }

        public MotherOutContext()
        {

        }


        public MotherOutContext(DbContextOptions options) : base(options)
        {
        }

        //Mètode de configuració
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("Server=localhost;Database=mydb_MotherOut;Uid=root;Pwd=''; SslMode = none");

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(a => a.Team)
                .WithOne(b => b.User)
                .HasForeignKey<User>(b => b.TeamId);
        }
    }
}
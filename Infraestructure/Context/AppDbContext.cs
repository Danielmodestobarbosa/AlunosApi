using AlunosApi.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Infraestructure.Context
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Aluno> Aluno { get; set; }

        /*protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Aluno>().HasData(

                new Aluno
                {
                    Id = 1,
                    Nome = "Daniel Modesto",
                    Email = "daniel.modesto@hotmail.com",
                    Idade = 25
                },
                new Aluno
                {
                    Id = 2,
                    Nome = "Joao Silva",
                    Email = "joaosilva@hotmail.com",
                    Idade = 30
                }
            );
        }*/
    }
}

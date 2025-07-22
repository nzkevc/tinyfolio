using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TinyFolioDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("MyDbConnection")
    ?? throw new InvalidOperationException("Connection string 'MyDbConnection' not found.")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<FolioService>();
builder.Services.AddScoped<ProjectService>();

builder.Services.AddControllers();
builder.Services.AddOpenApi(); // https://aka.ms/aspnet/openapi

var app = builder.Build();

app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(); // http://localhost:5017/scalar/v1
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

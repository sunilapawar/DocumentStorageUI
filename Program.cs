var builder = WebApplication.CreateBuilder(args);

// Serve static files from wwwroot
builder.Services.AddDirectoryBrowser();

var app = builder.Build();

app.UseHttpsRedirection();

// Serve static files
app.UseStaticFiles();

// Redirect root to login page
app.MapGet("/", context =>
{
    context.Response.Redirect("/pages/login.html");
    return Task.CompletedTask;
});

app.Run();


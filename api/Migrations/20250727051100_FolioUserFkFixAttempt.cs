using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FolioUserFkFixAttempt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Folios_OwnerId",
                table: "Folios");

            migrationBuilder.CreateIndex(
                name: "IX_Folios_OwnerId",
                table: "Folios",
                column: "OwnerId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Folios_OwnerId",
                table: "Folios");

            migrationBuilder.CreateIndex(
                name: "IX_Folios_OwnerId",
                table: "Folios",
                column: "OwnerId");
        }
    }
}

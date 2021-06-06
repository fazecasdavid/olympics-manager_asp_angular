using Microsoft.EntityFrameworkCore.Migrations;

namespace olympics.Migrations
{
    public partial class UpdatedSponsorship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "moneyContribution",
                table: "Sponsorships",
                newName: "MoneyContribution");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MoneyContribution",
                table: "Sponsorships",
                newName: "moneyContribution");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MotherOut.Migrations
{
    public partial class m2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaskIcon",
                table: "PreDefinedTasks");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "TaskIcon",
                table: "PreDefinedTasks",
                type: "longblob",
                nullable: true);
        }
    }
}

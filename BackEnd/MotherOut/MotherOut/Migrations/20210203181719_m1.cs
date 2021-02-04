using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MotherOut.Migrations
{
    public partial class m1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    IdTeam = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TeamName = table.Column<string>(nullable: true),
                    TeamMembers = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.IdTeam);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Avatar = table.Column<byte[]>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true),
                    NTaks = table.Column<int>(nullable: false),
                    UserMaster = table.Column<bool>(nullable: false),
                    UserScore = table.Column<int>(nullable: false),
                    TeamId = table.Column<int>(nullable: true),
                    Help = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "IdTeam",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTasks",
                columns: table => new
                {
                    UserTaskId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdTeam = table.Column<int>(nullable: false),
                    SelectMember = table.Column<string>(nullable: true),
                    SelectDay = table.Column<DateTime>(nullable: false),
                    TaskScore = table.Column<int>(nullable: false),
                    TaskIcon = table.Column<byte[]>(nullable: true),
                    Done = table.Column<bool>(nullable: false),
                    TaskName = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTasks", x => x.UserTaskId);
                    table.ForeignKey(
                        name: "FK_UserTasks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Icons",
                columns: table => new
                {
                    IconId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IconImage = table.Column<byte[]>(nullable: true),
                    UserTaskId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Icons", x => x.IconId);
                    table.ForeignKey(
                        name: "FK_Icons_UserTasks_UserTaskId",
                        column: x => x.UserTaskId,
                        principalTable: "UserTasks",
                        principalColumn: "UserTaskId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PreDefinedTasks",
                columns: table => new
                {
                    PredifId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TaskScore = table.Column<int>(nullable: false),
                    TaskIcon = table.Column<byte[]>(nullable: true),
                    TaskName = table.Column<string>(nullable: true),
                    UserTaskId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreDefinedTasks", x => x.PredifId);
                    table.ForeignKey(
                        name: "FK_PreDefinedTasks_UserTasks_UserTaskId",
                        column: x => x.UserTaskId,
                        principalTable: "UserTasks",
                        principalColumn: "UserTaskId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Icons_UserTaskId",
                table: "Icons",
                column: "UserTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_PreDefinedTasks_UserTaskId",
                table: "PreDefinedTasks",
                column: "UserTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_TeamId",
                table: "Users",
                column: "TeamId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserTasks_UserId",
                table: "UserTasks",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Icons");

            migrationBuilder.DropTable(
                name: "PreDefinedTasks");

            migrationBuilder.DropTable(
                name: "UserTasks");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Teams");
        }
    }
}

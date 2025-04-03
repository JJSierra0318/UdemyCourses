provider "aws" {
    region = "us-west-2"
    //Credentials should be in .aws/config/credentials after configuring the CLI
}

//Create IAM user Lucy
resource "aws_iam_user" "admin-user" {
    name = "Lucy"
    tags = {
      Description = "Technical Team Leader"
    }
}

//Create admin policy
resource "aws_iam_policy" "adminUser" {
    name = "AdminUsers"
    policy = file("admin-policy.json")
}

//Assign the policy to user Lucy
resource "aws_iam_user_policy_attachment" "lucy-admin-access" {
    user = aws_iam_user.admin-user.name
    policy_arn = aws_iam_policy.adminUser.arn
}
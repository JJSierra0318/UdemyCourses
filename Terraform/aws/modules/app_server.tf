resource "aws_instance" "app_server" {
    ami = "xxxx"
    instance_type = "t2.medium"
    tags = {
      Name = "app-server"
    }
}
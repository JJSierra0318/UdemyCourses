module "us_payroll" {
    source = "./modules/app_server.tf"
    app_region = "us-east-1"
    ami = "asdasdaxc"
}

module "uk_payroll" {
    source = "./modules/app_server.tf"
    app_region = "eu-west-2"
    ami = "xxxxx"
}
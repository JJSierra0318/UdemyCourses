//resource "from_to" "resourceName" {
//  parameters = "values"
//}

//Specify a version for provider
terraform {
  required_providers {
    local = {
        source = "hashicorp/local"
        version = "> 1.4.0"
    }
  }
}

//Terraform destroy deletes the file
resource "local_file" "pet" {
    content = "My favorite pet is ${random_pet.my-pet.id}\nAlso ${data.local_file.dog.content}"
    filename = each.value
    file_permission = "0700"
    //Dependency if the reference expression isn't used
    //depends_on = [ random_pet.my-pet ]

    //Cycle with filename.length iterations
    //count = length(var.filename)
    //Can only be used with maps or set, solves having to recreate every item when only one is updated
    for_each = toset(var.filename)

    lifecycle {
    //Create resource before destroying when updating
      create_before_destroy = true
    //prevent_destroy = true
    //ignore_changes = [ tags, file_permission ]
    //ignore_changes = all
    }
}

//Outputs a random pet name
resource "random_pet" "my-pet" {
    prefix = "Mr"
    separator = var.separator
    length = var.length
}

data "local_file" "dog" {
    filename = "./dog.txt"
}

//Can use terraform output
output "pet-name" {
    value = random_pet.my-pet.id
}
variable "filename" {
    type = list(string)
    default = [
        "./pets.txt",
        "./dogs.txt",
        "./cats.txt"
    ]
}
variable "separator" {
    type = string
    default = "."
}
variable "length" {
    type = number
    default = 1
}
//type list is also available
variable "prefix" {
    type = set(string)
    default = ["Mr", "Mrs", "Sir"]
}
variable "file-content" {
    type = map
    default = {
        "statement1" = "We love pets!"
        "statement2" = "We love animals!"
    }
}
variable "bella" {
    type = object({
      name = string
      color = string
      age = number
      food = list(string)
      favorite_pet = bool
    })

    default = {
      name = "Bella"
      color = "brown"
      age = 7
      food = [ "fish", "chicken" ]
      favorite_pet = true
    }
}
variable "kitty" {
    type = tuple([ string, number, bool ])
    default = [ "cat", 7, false ]
}
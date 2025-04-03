//Create dynamo table cars with Primary key VIN (Vehicle id)
resource "aws_dynamodb_table" "cars" {
    name = "cars"
    hash_key = "VIN"
    billing_mode = "PAY_PER_REQUEST"
    attribute {
        name = "VIN"
        type = "S"
    }
}

//Add item to table
resource "aws_dynamodb_table_item" "car-items" {
    table_name = aws_dynamodb_table.cars.name
    hash_key = aws_dynamodb_table.cars.hash_key
    item = <<EOF
    {
        "Manufacturer": {"S": "Toyota"},
        "Make": {"S": "Corolla"},
        "Year": {"N": "2004},
        "VIN": {"S": 4y1SL65848Z411439"},
    }
    EOF
}
//Create s3 bucket
resource "aws_s3_bucket" "finance" {
    bucket = "finance-xxxxx"
    tags = {
        Description = "Finance and Payroll"
    }
}

//Add objects to the bucket (deprecated)
resource "aws_s3_bucket_object" "finance-2020" {
    content = "/root/finance/finance.doc"
    key = "finance-2020.doc"
    bucket = aws_s3_bucket.finance.id
}

data "aws_iam_group" "finance-data" {
    group_name = "Finance-analysts"
}

//Add policy to bucket
resource "aws_s3_bucket_policy" "finance-policy" {
    bucket = aws_s3_bucket.finance.id
    policy = <<EOF
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": "*",
                "Effect": "Allow",
                "Resource": "arn:aws:s3:::${aws_s3_bucket.finance.id}/*",
                "Principal: {
                    "AWS: [
                        "${data.aws_iam_group.finance-data.arn}"
                    ]
                }
            }
        ]
    }
    EOF
}
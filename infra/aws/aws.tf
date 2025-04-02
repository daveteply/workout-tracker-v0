terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_vpc" "default" {
  default = true
}

data "aws_internet_gateway" "default" {
  filter {
    name   = "attachment.vpc-id"
    values = [data.aws_vpc.default.id]
  }
  filter {
    name   = "owner-id"
    values = [data.aws_vpc.default.owner_id]
  }
}

# Create a public subnet (within default VPC)
resource "aws_subnet" "public" {
  vpc_id = data.aws_vpc.default.id
  # CIDR IP Range 172.31.96.0 - 172.31.96.31
  cidr_block              = "172.31.96.0/27" # 32 IPs https://mxtoolbox.com/subnetcalculator.aspx
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true
  tags = {
    Name        = "Public Subnet"
    Description = "Workout Tracker"
  }
}

# Create a private subnet (within default VPC)
resource "aws_subnet" "private" {
  vpc_id            = data.aws_vpc.default.id
  cidr_block        = "172.31.97.0/27" # 32 IPs
  availability_zone = data.aws_availability_zones.available.names[1]
  tags = {
    Name        = "Private Subnet"
    Description = "Workout Tacker"
  }
}

########################## only use when private EC2 needs internet access ################################
# Elastic IP for NAT Gateway
resource "aws_eip" "nat_eip" {
  domain = "vpc"
  tags = {
    Name = "NAT EIP"
  }
}

# NAT Gateway in the public subnet
resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public.id

  tags = {
    Name = "NAT Gateway"
  }

  # Add depends_on to ensure the internet gateway is created first.
  depends_on = [data.aws_internet_gateway.default]
}
########################## only use when private EC2 needs internet access ################################

# Create a route table for the public subnet
resource "aws_route_table" "public" {
  vpc_id = data.aws_vpc.default.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = data.aws_internet_gateway.default.id
  }

  tags = {
    Name        = "Public Route Table"
    Description = "Workout Tracker"
  }
}

# Associate the public subnet with the public route table
resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# Create a route table for the private subnet
resource "aws_route_table" "private" {
  vpc_id = data.aws_vpc.default.id

  ########################## only use when private EC2 needs internet access ################################
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }
  ########################## only use when private EC2 needs internet access ################################

  tags = {
    Name        = "Private Route Table"
    Description = "Workout Tracker"
  }
}

# Associate the private subnet with the private route table
resource "aws_route_table_association" "private" {
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.private.id
}

# Security group for the web instance
resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Allow HTTP and SSH traffic"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "HTTP access"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] #Restrict this in production
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Web Security Group"
  }
}

# Security group for the API instance
resource "aws_security_group" "api" {
  name        = "api-sg"
  description = "Allow traffic from web instance"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description     = "Allow traffic from web instance"
    from_port       = 8080
    to_port         = 8081
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }
  ingress {
    description     = "SSH access from specific IP"
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "API Security Group"
  }
}

# EC2 instance for the web server
resource "aws_instance" "web" {
  ami                    = "ami-08b5b3a93ed654d19" # Amazon Linux 2 AMI (Free Tier)
  instance_type          = "t2.micro"              # Free Tier eligible
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.web.id]
  key_name               = "terraform-key"
  tags = {
    Name        = "Web Server"
    Description = "Workout Tracker"
  }
}

# EC2 instance for the API server
resource "aws_instance" "api" {
  ami                    = "ami-08b5b3a93ed654d19" # Amazon Linux 2 AMI (Free Tier)
  instance_type          = "t2.micro"              # Free Tier eligible
  subnet_id              = aws_subnet.private.id
  vpc_security_group_ids = [aws_security_group.api.id]
  key_name               = "terraform-key"
  tags = {
    Name        = "API Server"
    Description = "Workout Tracker"
  }
}

output "web_public_ip" {
  value = aws_instance.web.public_ip
}

output "api_private_ip" {
  value = aws_instance.api.private_ip
}

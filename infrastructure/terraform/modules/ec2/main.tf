data "aws_ami" "ubuntu" {
  most_recent = true

  owners = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "anantbuy_node" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [var.app_sg_id]
  associate_public_ip_address = true
  key_name                    = var.key_name

  root_block_device {
  volume_size = 30
  volume_type = "gp3"
  }

  tags = {
    Name = "anantbuy-node"
  }
}

resource "aws_instance" "devsecops_node" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [var.devsecops_sg_id]
  associate_public_ip_address = true
  key_name                    = var.key_name

  root_block_device {
  volume_size = 30
  volume_type = "gp3"
  }

  tags = {
    Name = "devsecops-node"
  }
}

resource "aws_instance" "anantx_node" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [var.anantx_sg_id]
  associate_public_ip_address = true
  key_name                    = var.key_name
  
  root_block_device {
  volume_size = 30
  volume_type = "gp3"
  }

  tags = {
    Name = "anantx-node"
  }
}

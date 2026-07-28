output "anantbuy_public_ip" {
  value = aws_instance.anantbuy_node.public_ip
}

output "anantbuy_private_ip" {
  value = aws_instance.anantbuy_node.private_ip
}

output "devsecops_public_ip" {
  value = aws_instance.devsecops_node.public_ip
}

output "devsecops_private_ip" {
  value = aws_instance.devsecops_node.private_ip
}

output "anantx_public_ip" {
  value = aws_instance.anantx_node.public_ip
}

output "anantx_private_ip" {
  value = aws_instance.anantx_node.private_ip
}
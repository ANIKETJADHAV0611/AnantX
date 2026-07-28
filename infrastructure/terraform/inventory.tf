resource "local_file" "ansible_inventory" {

  content = templatefile(
    "${path.module}/templates/inventory.tpl",
    {
      anantbuy_ip         = module.ec2.anantbuy_public_ip
      anantbuy_private_ip = module.ec2.anantbuy_private_ip

      devsecops_ip         = module.ec2.devsecops_public_ip
      devsecops_private_ip = module.ec2.devsecops_private_ip

      anantx_ip         = module.ec2.anantx_public_ip
      anantx_private_ip = module.ec2.anantx_private_ip

      ssh_private_key = var.ssh_private_key
    }
  )

  filename = "../ansible/inventory.ini"
}
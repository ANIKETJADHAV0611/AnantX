module "vpc" {
  source = "./modules/vpc"

  project_name       = var.project_name
  vpc_cidr           = var.vpc_cidr
  public_subnet_cidr = var.public_subnet_cidr
}
module "security_groups" {
  source = "./modules/security-groups"

  vpc_id = module.vpc.vpc_id
}

module "ec2" {
  source = "./modules/ec2"

  subnet_id       = module.vpc.subnet_id
  app_sg_id       = module.security_groups.app_sg_id
  devsecops_sg_id = module.security_groups.devsecops_sg_id
  anantx_sg_id    = module.security_groups.anantx_sg_id

  key_name      = var.key_name
  instance_type = var.instance_type

}
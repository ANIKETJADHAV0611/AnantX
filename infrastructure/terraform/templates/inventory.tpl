[anantbuy]
anantbuy ansible_host=${anantbuy_ip} prometheus_target_ip=${anantbuy_private_ip}

[devsecops]
devsecops ansible_host=${devsecops_ip} prometheus_target_ip=${devsecops_private_ip}

[anantx]
anantx ansible_host=${anantx_ip} prometheus_target_ip=${anantx_private_ip}

[all:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=${ssh_private_key} 
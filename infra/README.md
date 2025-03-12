# Terraform/AWS Notes

## Install CLIs (WSL/ubuntu)
- terraform https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli
- aws https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

## Create AIM user
1. AWS Console
2. AIM
3. Create user -> give it a name, like terrform-user or something
4. Next -> Permissions
5. Select: Attach existing policies directly
6. For initial Terraform setup, you might start with the AdministratorAccess policy (for simplicity during learning). However, for production use, create a custom policy with least privilege.
7. Create access key -> download (and keep safe) the .csv file

## Configure AWS
1. `aws configure`
2. Give it the AWS Access Key ID from the above .csv file (careful copy pasting from Excel, don't capture carriage returns or spaces)
3. Give it the AWS Secret Access Key from the above .csv
4. Supply the Default region name
5. Test: `aws sts get-caller-identity` <- this should return info about the user


# New Release Script

The new release script, located in the root directory of the theme folder, will automate a few manual tasks for updating Help Center at the time of a new Liferay product release.

## Automated Tasks

- Running the script will automatically generate a new landing page template for the product. A content creator can then go into the template to update its content.

## Running Script

On unix systems, run `./new_release.sh ${name_of_product}`. For example, if the release is for _Liferay DXP 7.3_, run the script as `./new_release.sh dxp_7_3`.

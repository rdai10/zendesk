# New request page

This page allows the user to create a ticket with Zendesk. It will display either a create ticket form or an error message based on the user's permission.

## Permissions
- Only a user with the **Customer** or **Partner** roles are allowed to see the create ticket form.
- The permitted roles must belong to at least **one** organization to see the create ticket form.
- The user's role will be reflected as a tag on the user's organization. It will follow the format of `osb_customer` or `osb_partner`.

### Watcher role
- A user can be a **Watcher** for an organization. In this role, the user belongs to a particular organization but cannot create tickets for that organization.
- This role is also reflected as a tag on the user's organization. It will follow the format of `osb_${orgID}_watcher`.

## Create ticket form
### Organization drop-down
- For a user belonging to a single organization, there will not be an **Organization** drop-down.
- For a user belonging to multiple organizations, there will be an **Organization** drop-down. All organizations which this user belongs to, will show up in the drop-down minus the organization that the user is a **Watcher** for.
- The user selection for **Organization** will determine what values are populated in the **Product** drop-down.

### Product drop-down
- The **Product** drop-down values are determined by the provisioned products that the selected **Organization** have.
- The provisioned product options appear on each of the user's organization tags. The values of these tags are cross referenced with the **Organization** selected and the total available **Products** to determine what should be displayed for the user.
- To help reduce the length of the drop-down options, _Nested Fields_ are used to group different versions of a product in a single option.
- User selection for the **Product** drop-down will determine whether a **Component** drop-down will appear via the _Conditional Fields App_ code inserted in *document_head.hbs*.

### Component drop-down
- When a chosen **Product** is associated with different components, the **Component** drop-down will appear.
- The values of the **Components** drop-down are determined by the **Product** selected and a mapping supplied via JavaScript.
- Not all **Products** have **Components**, but the following do:
	-  Liferay Commerce
	-  Liferay DXP
	-  Liferay DXP Cloud
	-  Liferay Portal
# New Request Page

This page allows the user to create a ticket with Zendesk. It will display either a create ticket form or an error message based on the user's permission.

## Permissions
- Only a user with the **Customer** or **Partner** roles are allowed to see the create ticket form.
- The permitted roles must belong to at least **one** organization to see the create ticket form.
- The user's role will be reflected as a tag on the user's organization. It will follow the format of `osb_360081104051_customer` or `osb_${orgID}_${roleType}`

### Watcher role
- A user can be a **Watcher** for an organization. In this role the user belongs to a particular organization but cannot create tickets for that organization. 
- This role is also reflected as a tag on the user's organization, following the format of `osb_${orgID}_watcher`.

## Create Ticket Form
### Organization Dropdown
- For a user belonging to a single organization, there will not be an **Organization** dropdown.
- For a user belonging to multiple organizations, there will be an **Organization** dropdown field. All organizations which this user belongs to will show up in the dropdown minus the organization that the user is a **Watcher** for.
- The user selection for **Organization** will determine what gets populated in the **Product** dropdown. 

### Product Dropdown
- The **Product** dropdown options are determined by the provisioned products that the selected **Organization** have.
- The provisioned options appear on each of the user's organization tags. The values of these tags are cross referenced with the Organization selected and the total available Products to determine what to display for the user.
- To help reduce the length of the dropdown options, _Nested Fields_ are used to group different versions of a product in a single option.
- User selection for the **Product** dropdown will determine whether a **Component** dropdown will appear via the _Conditional Fields App_ code inserted in *document_head.hbs*

### Component Dropdown
- When a chosen **Product** is associated with different components, the **Component** dropdown field will appear.
- The values of the **Components** dropdown are determined by the **Product** selected and a mapping supplied in the javascript.
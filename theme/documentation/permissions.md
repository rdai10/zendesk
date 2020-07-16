# Permissions

All users on Help Center have one or more user tags. These tags determine the level of access a user has. This could mean that some users are able to see additional content than others, have access to create tickets, or view the Knowledge Base articles freely in its entirety.

Here is a breakdown of the user tags:

## KB Tag

- A limited support user, an employee, a customer, a partner, or a watcher, will have the **KB** tag.
- Trial users will not have the **KB** tag.
- The **KB** tag will allow the user to view the full content of Knowledge Base Articles, Official Documentation, product landing pages, the mega menu, announcements, quick links on the homepage, and CTAs (calls to actions).
- Users with the **KB** tag are not allowed to create or view support tickets.
- The **KB** tag is reflected as a tag on the user's organization on the `HelpCenter` javascript object; it follows the format of `osb_kb`.

## Customer/Partner Tag

- Users with either the **Customer** or **Partner** role will have this tag.
- The **Customer** or **Partner** tag will give the user permission to view and create support tickets. (For more details, see the _[new request page documentation](./new_request_page.md)_)
- Having either one of the two tags will also give the user access to Official Documentation and Developer Services.
  - Note, Developer Services is a product that is only available if it is enabled for the user's Organization. To enable Developer Services, an administrator needs to add the `developer_services` tag on the Organization and add the Organization to the user segment.
- The **Customer** or **Partner** role will be reflected as a tag on the user's organization; it follows the format of `osb_customer` or `osb_partner`.

## Watcher Tag

- A user can be a **Watcher** for an organization without being a **Customer** or a **Partner**. Normally only **Customer** and **Partners** can open and view support tickets, this special role allows the user to view tickets associated with the organization that they belong to. However users with this role do not have the ability to create new tickets.
- The **Watcher** role is reflected as a tag on the user's organization; it follows the format of `osb_${orgID}_watcher`.